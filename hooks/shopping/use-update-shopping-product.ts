import useSWR, { mutate } from "swr";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { SHOPPING_PRODUCT_DETAIL_PAGE } from "@/constants/path";
import { useEffect, useState } from "react";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { getShoppingDetail, updateShoppingProduct } from "@/app/api/shopping";
import { convertEditorImages } from "@/util/quill";
import { ExposureTag } from "@/constants/product";
import { shoppingProductSchema } from "@/schema/shopping";
import { ShoppingCreateReq, ShoppingItem } from "@/app/api/dto/shopping";
import { AppliedCoupon } from "@/app/api/dto/coupon";

export const useUpdateShoppingProduct = (shoppingProductId?: string) => {
  const router = useRouter();
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.PRODUCT);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof shoppingProductSchema>>({
    resolver: zodResolver(shoppingProductSchema),
  });

  // 쇼핑 상품 상세 정보 조회
  const key = shoppingProductId ? ["products", shoppingProductId] : null;
  const {
    data: shoppingProductDetail,
    error,
    mutate: mutateSWR,
  } = useSWR<ShoppingItem, Error>(
    key,
    () => getShoppingDetail(shoppingProductId!),
    {
      suspense: isClient,
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 0, // 중복 제거 비활성화
    },
  );

  // 폼에 기존 데이터 설정
  useEffect(() => {
    if (shoppingProductDetail && !isFormInitialized) {
      // 약간의 지연을 두고 폼 리셋 (렌더링 완료 후)
      setTimeout(() => {
        form.reset({
          ...shoppingProductDetail,
          isActive: String(shoppingProductDetail.isActive),
          appliedCoupon: shoppingProductDetail.appliedCoupon ?? null,
          exposureTags: shoppingProductDetail.exposureTags
            ? shoppingProductDetail.exposureTags[0]
            : ExposureTag.NONE,
          isOptionUsed:
            shoppingProductDetail.isOptionUsed === true ? "true" : "false",
          manufacturer: shoppingProductDetail.manufacturer ?? "",
          hasStockManagement:
            shoppingProductDetail.stockCount !== 0 &&
            !shoppingProductDetail.stockCount
              ? "false"
              : "true",
          stockCount: shoppingProductDetail.stockCount ?? 0,
        });

        // 기존 쿠폰 정보가 있으면 쿠폰 상태 초기화
        if (shoppingProductDetail.appliedCoupon) {
          setCoupon({
            ...shoppingProductDetail.appliedCoupon,
          });
        } else {
          setCoupon(null);
        }
        setIsFormInitialized(true);
      }, 100);
    }
  }, [shoppingProductDetail, form, isFormInitialized]);

  // 컴포넌트가 언마운트될 때 초기화 상태 리셋
  useEffect(() => {
    return () => {
      setIsFormInitialized(false);
      setCoupon(null);
    };
  }, []);

  // 캐시 무효화 함수
  const invalidateCache = async () => {
    if (shoppingProductId) {
      // 현재 키와 관련된 모든 캐시 무효화
      await mutate(["products", shoppingProductId]);
      // SWR 인스턴스도 무효화
      await mutateSWR();
    }
  };

  const mutateData = async (data: z.infer<typeof shoppingProductSchema>) => {
    // 옵션 사용 여부가 true일 때 옵션 배열이 비어있으면 에러
    if (
      data.isOptionUsed === "true" &&
      (!data.options || data.options.length === 0)
    ) {
      toast({ title: "옵션 사용시 옵션을 추가해주세요." });
      return;
    }

    // 옵션의 재고 수량이 하나라도 0일 때 에러
    if (
      data.hasStockManagement === "true" &&
      data.options?.some((option) => option.stockCount === 0)
    ) {
      toast({ title: "옵션의 재고 수량을 입력해주세요." });
      return;
    }

    setIsLoading(true);
    try {
      // 쿠폰 정보 제거 (수정에 불 필요한 필드)
      delete data.appliedCoupon;

      // 퀼 에디터의 내용 추출
      const contentHtml = data.content || "";

      // 퀼 에디터의 이미지 src 교체
      const updatedContent = await convertEditorImages(
        contentHtml,
        onPostS3PresignedUrl,
      );

      let reqData: ShoppingCreateReq;
      let thumbnailUrl: string;

      // 이미지가 File 객체인 경우 S3에 업로드
      if (data.thumbnailUrl instanceof File) {
        const fileArray = await onPostS3PresignedUrl([data.thumbnailUrl]);
        thumbnailUrl = fileArray[0];

        reqData = {
          ...data,
          thumbnailUrl,
          content: updatedContent,
          exposureTags:
            data.exposureTags && data.exposureTags !== "null"
              ? [data.exposureTags]
              : [],
          isActive: data.isActive === "true",
          isOptionUsed: data.isOptionUsed === "true",
          relatedLink: data.relatedLink || null,
        };
      } else {
        reqData = {
          ...data,
          thumbnailUrl: data.thumbnailUrl as string,
          content: updatedContent,
          exposureTags:
            data.exposureTags && data.exposureTags !== "null"
              ? [data.exposureTags]
              : [],
          isActive: data.isActive === "true",
          isOptionUsed: data.isOptionUsed === "true",
        };
      }
      await updateShoppingProduct(shoppingProductId!, reqData);

      // 성공 후 캐시 무효화
      await invalidateCache();

      toast({
        title: "상품이 수정되었어요",
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.replace(
        SHOPPING_PRODUCT_DETAIL_PAGE.replace("[id]", shoppingProductId!),
      );
    } catch (error) {
      console.error("상품 수정 실패:", error);
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = form.handleSubmit(mutateData);

  return {
    form,
    onSubmit,
    isLoading: isLoading || (!shoppingProductDetail && !error),
    coupon,
    setCoupon,
  };
};
