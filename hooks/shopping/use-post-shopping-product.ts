import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { useRouter } from "next/navigation";
import { SHOPPING_PRODUCT_PAGE } from "@/constants/path";
import { useState } from "react";
import { convertEditorImages } from "@/util/quill";
import { createShoppingProduct } from "@/app/api/shopping";
import { shoppingProductSchema } from "@/schema/shopping";
import { SHOPPING_INQUIRY_INFO } from "@/constants/shopping";
import { ExposureTag } from "@/constants/product";
import { AppliedCoupon } from "@/app/api/dto/coupon";

// 쇼핑 상품 생성 요청 훅
export const usePostShoppingProduct = () => {
  const router = useRouter();
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.PRODUCT);
  const form = useForm<z.infer<typeof shoppingProductSchema>>({
    resolver: zodResolver(shoppingProductSchema),
    defaultValues: {
      isActive: "true",
      inquiryInfo: SHOPPING_INQUIRY_INFO,
      originalPrice: 0,
      finalPrice: 0,
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof shoppingProductSchema>) => {
      try {
        // 옵션 사용 여부가 true일 때 옵션 배열이 비어있으면 에러
        if (
          data.isOptionUsed === "true" &&
          (!data.options || data.options.length === 0)
        ) {
          toast({ title: "옵션 사용시 옵션을 추가해주세요." });
          return;
        }

        // 옵션 사용 여부가 true이면서 옵션의 재고 수량이 하나라도 0일 때 에러
        if (
          data.isOptionUsed === "true" &&
          data.options?.some((option) => option.stockCount === 0)
        ) {
          toast({ title: "옵션의 재고 수량을 입력해주세요." });
          return;
        }

        setIsLoading(true);
        const fileArray = await onPostS3PresignedUrl([
          data.thumbnailUrl as File,
        ]);
        const newImage = fileArray[0];

        // 퀼 에디터의 내용 추출
        const contentHtml = data.content || "";

        // 퀼 에디터의 이미지 src 교체
        const updatedContent = await convertEditorImages(
          contentHtml,
          onPostS3PresignedUrl,
        );

        // 쇼핑 상품 생성
        const payload = {
          ...data,
          thumbnailUrl: newImage,
          content: updatedContent,
          isActive: data.isActive === "true" ? true : false,
          exposureTags:
            data.exposureTags && data.exposureTags !== ExposureTag.NONE
              ? [data.exposureTags]
              : [],
          isOptionUsed: data.isOptionUsed === "true" ? true : false,
          relatedLink: data.relatedLink || null,
        };

        await createShoppingProduct(payload);
        router.replace(SHOPPING_PRODUCT_PAGE);
        await new Promise((resolve) => setTimeout(resolve, 150));
        toast({ title: "쇼핑 상품이 생성되었어요" });
        form.reset();
        setCoupon(null); // 폼 리셋 시 쿠폰 초기화
      } catch (error) {
        console.error("쇼핑 상품 생성 실패:", error);
        toast({ title: "잠시 후 다시 시도해주세요" });
      } finally {
        setIsLoading(false);
      }
    },
  );

  return { form, onSubmit, isLoading, coupon, setCoupon };
};
