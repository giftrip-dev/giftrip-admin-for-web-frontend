import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { useRouter } from "next/navigation";
import { ACCOMMODATION_PRODUCT_PAGE } from "@/constants/path";
import { useState } from "react";
import { accommodationCompanySchema } from "@/schema/accommodation";
import { createAccommodationCompany } from "@/app/api/accommodation";
import { convertEditorImages } from "@/util/quill";

// 업체 생성 요청 훅
export const usePostAccommodationCompany = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.ACCOMMODATION);
  const form = useForm<z.infer<typeof accommodationCompanySchema>>({
    resolver: zodResolver(accommodationCompanySchema),
    defaultValues: {},
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof accommodationCompanySchema>) => {
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

        const reqData = {
          ...data,
          thumbnailUrl: newImage,
          content: updatedContent,
        };

        await createAccommodationCompany(reqData);
        toast({ title: "업체가 생성되었어요" });
        await new Promise((resolve) => setTimeout(resolve, 300));
        router.replace(ACCOMMODATION_PRODUCT_PAGE);
        form.reset();
      } catch (error) {
        console.error("업체 생성 실패:", error);
        toast({ title: "잠시 후 다시 시도해주세요" });
      } finally {
        setIsLoading(false);
      }
    },
  );

  return { form, onSubmit, isLoading };
};
