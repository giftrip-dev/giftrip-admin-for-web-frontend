import useSWR from "swr";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { CAMPAIGN_PRODUCT_DETAIL_PAGE } from "@/constants/path";
import { useEffect, useState } from "react";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { getCampaignDetail, updateCampaignProduct } from "@/app/api/campaign";
import { convertEditorImages } from "@/util/quill";
import { ExposureTag } from "@/constants/product";
import { campaignProductSchema } from "@/schema/campaing";
import { CampaignCreateReq, CampaignItem } from "@/app/api/dto/campaign";

export const useUpdateCampaignProduct = (campaignId?: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.CAMPAIGN);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof campaignProductSchema>>({
    resolver: zodResolver(campaignProductSchema),
  });

  // 배너 상세 정보 조회
  const key = campaignId ? ["campaign", campaignId] : null;
  const { data: campaignDetail, error } = useSWR<CampaignItem, Error>(
    key,
    () => getCampaignDetail(campaignId!),
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
    if (campaignDetail && !isFormInitialized) {
      // 약간의 지연을 두고 폼 리셋 (렌더링 완료 후)
      setTimeout(() => {
        form.reset({
          ...campaignDetail,
          isActive: String(campaignDetail.isActive),
          exposureTags: campaignDetail.exposureTags
            ? campaignDetail.exposureTags[0]
            : ExposureTag.NONE,
        });
        setIsFormInitialized(true);
      }, 100);
    }
  }, [campaignDetail, form, isFormInitialized]);

  // 컴포넌트가 언마운트될 때 초기화 상태 리셋
  useEffect(() => {
    return () => {
      setIsFormInitialized(false);
    };
  }, []);

  const mutate = async (data: z.infer<typeof campaignProductSchema>) => {
    setIsLoading(true);
    try {
      // 퀼 에디터의 내용 추출
      const contentHtml = data.content || "";

      // 퀼 에디터의 이미지 src 교체
      const updatedContent = await convertEditorImages(
        contentHtml,
        onPostS3PresignedUrl,
      );

      let reqData: CampaignCreateReq;
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

      await updateCampaignProduct(campaignId!, reqData);
      toast({
        title: "게시글이 수정되었어요",
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.replace(CAMPAIGN_PRODUCT_DETAIL_PAGE.replace("[id]", campaignId!));
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = form.handleSubmit(mutate);

  return {
    form,
    onSubmit,
    isLoading: isLoading || (!campaignDetail && !error),
  };
};
