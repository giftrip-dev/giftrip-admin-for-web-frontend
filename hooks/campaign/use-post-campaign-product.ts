import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { useRouter } from "next/navigation";
import { CAMPAIGN_PRODUCT_PAGE } from "@/constants/path";
import { useState } from "react";
import { convertEditorImages } from "@/util/quill";
import { createCampaignProduct } from "@/app/api/campaign";
import { campaignProductSchema } from "@/schema/campaing";
import { CAMPAIGN_INQUIRY_INFO_ARRAY } from "@/constants/campaign";
import { EXPERIENCE_CHANGE_INFO_ARRAY } from "@/constants/experience";

// 체험 상품 생성 요청 훅
export const usePostCampaignProduct = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.CAMPAIGN);
  const form = useForm<z.infer<typeof campaignProductSchema>>({
    resolver: zodResolver(campaignProductSchema),
    defaultValues: {
      isActive: "true",
      inquiryInfo: CAMPAIGN_INQUIRY_INFO_ARRAY,
      changeInfo: EXPERIENCE_CHANGE_INFO_ARRAY,
      originalPrice: 0,
      finalPrice: 0,
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof campaignProductSchema>) => {
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

        await createCampaignProduct(payload);
        router.replace(CAMPAIGN_PRODUCT_PAGE);
        await new Promise((resolve) => setTimeout(resolve, 150));
        toast({ title: "체험 상품이 생성되었어요" });
        form.reset();
      } catch (error) {
        console.error("체험 상품 생성 실패:", error);
        toast({ title: "잠시 후 다시 시도해주세요" });
      } finally {
        setIsLoading(false);
      }
    },
  );

  return { form, onSubmit, isLoading };
};
