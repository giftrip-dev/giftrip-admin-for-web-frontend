import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { useRouter } from "next/navigation";
import { EXPERIENCE_PRODUCT_PAGE } from "@/constants/path";
import { useState } from "react";
import { experienceProductSchema } from "@/schema/experience";
import { convertEditorImages } from "@/util/quill";
import { createExperienceProduct } from "@/app/api/experience";
import {
  EXPERIENCE_CHANGE_INFO_ARRAY,
  EXPERIENCE_INQUIRY_INFO_ARRAY,
} from "@/constants/experience";
import { AppliedCoupon } from "@/app/api/dto/coupon";

// 여행 상품 생성 요청 훅
export const usePostExperienceProduct = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.EXPERIENCE);
  const form = useForm<z.infer<typeof experienceProductSchema>>({
    resolver: zodResolver(experienceProductSchema),
    defaultValues: {
      isActive: "true",
      inquiryInfo: EXPERIENCE_INQUIRY_INFO_ARRAY,
      changeInfo: EXPERIENCE_CHANGE_INFO_ARRAY,
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof experienceProductSchema>) => {
      try {
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

        // 체험 상품 생성
        const payload = {
          ...data,
          thumbnailUrl: newImage,
          content: updatedContent,
          isActive: data.isActive === "true" ? true : false,
          exposureTags:
            data.exposureTags && data.exposureTags !== "null"
              ? [data.exposureTags]
              : [],
          relatedLink: data.relatedLink || null,
        };

        await createExperienceProduct(payload);
        router.replace(EXPERIENCE_PRODUCT_PAGE);
        await new Promise((resolve) => setTimeout(resolve, 150));
        toast({ title: "여행 상품이 생성되었어요" });
        form.reset();
        setCoupon(null); // 폼 리셋 시 쿠폰도 초기화
      } catch (error) {
        console.error("여행 상품 생성 실패:", error);
        toast({ title: "잠시 후 다시 시도해주세요" });
      } finally {
        setIsLoading(false);
      }
    },
  );

  return { form, onSubmit, isLoading, coupon, setCoupon };
};
