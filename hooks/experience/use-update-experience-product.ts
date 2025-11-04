import useSWR, { mutate } from "swr";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { EXPERIENCE_PRODUCT_DETAIL_PAGE } from "@/constants/path";
import { useEffect, useState } from "react";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import {
  ExperienceItem,
  ExperienceProductCreateReq,
} from "@/app/api/dto/experience";
import {
  getExperienceDetail,
  updateExperienceProduct,
} from "@/app/api/experience";
import { experienceProductSchema } from "@/schema/experience";
import { convertEditorImages } from "@/util/quill";
import { ExposureTag } from "@/constants/product";
import { AppliedCoupon } from "@/app/api/dto/coupon";

export const useUpdateExperienceProduct = (experienceId?: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.EXPERIENCE);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof experienceProductSchema>>({
    resolver: zodResolver(experienceProductSchema),
  });

  // 체험 상품 상세 정보 조회
  const key = experienceId ? ["experience", experienceId] : null;
  const {
    data: experienceDetail,
    error,
    mutate: mutateSWR,
  } = useSWR<ExperienceItem, Error>(
    key,
    () => getExperienceDetail(experienceId!),
    {
      suspense: isClient,
      revalidateOnMount: true,
      revalidateOnFocus: true, // 포커스 시에도 재검증
      revalidateOnReconnect: true,
      dedupingInterval: 0, // 중복 제거 비활성화
      refreshInterval: 0, // 자동 갱신 비활성화
      revalidateIfStale: true, // 오래된 데이터라면 재검증
    },
  );

  // 폼에 기존 데이터 설정
  useEffect(() => {
    if (experienceDetail && !isFormInitialized) {
      // 약간의 지연을 두고 폼 리셋 (렌더링 완료 후)
      setTimeout(() => {
        form.reset({
          ...experienceDetail,
          isActive: String(experienceDetail.isActive),
          appliedCoupon: experienceDetail.appliedCoupon ?? null,
          exposureTags: experienceDetail.exposureTags
            ? experienceDetail.exposureTags[0]
            : ExposureTag.NONE,
        });

        // 기존 쿠폰 정보가 있으면 쿠폰 상태 초기화
        if (experienceDetail.appliedCoupon) {
          setCoupon({
            ...experienceDetail.appliedCoupon,
          });
        } else {
          setCoupon(null);
        }

        setIsFormInitialized(true);
      }, 100);
    }
  }, [experienceDetail, form, isFormInitialized]);

  // 컴포넌트가 언마운트될 때 초기화 상태 리셋
  useEffect(() => {
    return () => {
      setIsFormInitialized(false);
      setCoupon(null);
    };
  }, []);

  // 캐시 무효화 함수
  const invalidateCache = async () => {
    if (experienceId) {
      // 현재 키와 관련된 모든 캐시 무효화
      await mutate(["experience", experienceId]);
      // SWR 인스턴스도 무효화
      await mutateSWR();
    }
  };

  const mutateData = async (data: z.infer<typeof experienceProductSchema>) => {
    setIsLoading(true);
    try {
      // 퀼 에디터의 내용 추출
      const contentHtml = data.content || "";

      // 퀼 에디터의 이미지 src 교체
      const updatedContent = await convertEditorImages(
        contentHtml,
        onPostS3PresignedUrl,
      );

      let reqData: ExperienceProductCreateReq;
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
        };
      }

      await updateExperienceProduct(experienceId!, reqData);

      // 성공 후 캐시 무효화
      await invalidateCache();

      toast({
        title: "여행 상품이 수정되었어요",
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.replace(
        EXPERIENCE_PRODUCT_DETAIL_PAGE.replace("[id]", experienceId!),
      );
    } catch (error) {
      console.error("여행 상품 수정 실패:", error);
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
    isLoading: isLoading || (!experienceDetail && !error),
    coupon,
    setCoupon,
    invalidateCache, // 외부에서 캐시 무효화 가능하도록 노출
  };
};
