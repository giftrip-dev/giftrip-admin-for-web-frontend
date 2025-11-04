import { BannerCreateReq, BannerItem } from "@/app/api/dto/banner";
import useSWR from "swr";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { mainBannerSchema } from "@/schema/banner";
import { useRouter } from "next/navigation";
import { MAIN_BANNER_DETAIL_PAGE } from "@/constants/path";
import { useEffect, useState } from "react";
import { getBannerDetail, updateBanner } from "@/app/api/banner";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";

export const usePutMainBanner = (bannerId?: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.BANNER);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof mainBannerSchema>>({
    resolver: zodResolver(mainBannerSchema),
    defaultValues: {
      isActive: "true",
    },
  });

  // 배너 상세 정보 조회
  const key = bannerId ? ["banner", bannerId] : null;
  const { data: bannerDetail, error } = useSWR<BannerItem, Error>(
    key,
    () => getBannerDetail(bannerId!),
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
    if (bannerDetail && !isFormInitialized) {
      // 약간의 지연을 두고 폼 리셋 (렌더링 완료 후)
      setTimeout(() => {
        form.reset({
          title: bannerDetail.title,
          itemType: bannerDetail.itemType,
          type: bannerDetail.type,
          displayOrder: String(bannerDetail.displayOrder),
          isActive: String(bannerDetail.isActive),
          imageUrl: bannerDetail.imageUrl,
        });
        setIsFormInitialized(true);
      }, 100);
    }
  }, [bannerDetail, form, isFormInitialized]);

  // 컴포넌트가 언마운트될 때 초기화 상태 리셋
  useEffect(() => {
    return () => {
      setIsFormInitialized(false);
    };
  }, []);

  const mutate = async (data: z.infer<typeof mainBannerSchema>) => {
    setIsLoading(true);
    try {
      let imageUrl = data.imageUrl;

      // 이미지가 File 객체인 경우 S3에 업로드
      if (data.imageUrl instanceof File) {
        const fileArray = await onPostS3PresignedUrl([data.imageUrl]);
        imageUrl = fileArray[0];
      }

      const reqData: BannerCreateReq = {
        title: data.title,
        itemType: data.itemType,
        type: data.type,
        displayOrder: Number(data.displayOrder),
        isActive: data.isActive === "true",
        imageUrl: imageUrl as string,
      };

      await updateBanner(bannerId!, reqData);
      toast({
        title: "배너가 수정되었어요",
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.replace(MAIN_BANNER_DETAIL_PAGE.replace("[id]", bannerId!));
    } catch (error) {
      console.error("배너 수정 실패:", error);
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
    isLoading: isLoading || (!bannerDetail && !error),
    bannerDetail, // 디버깅용
  };
};
