import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { mainBannerSchema, subBannerSchema } from "@/schema/banner";
import { createBanner } from "@/app/api/banner";
import { BannerType } from "@/app/api/dto/banner";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { useRouter } from "next/navigation";
import { MAIN_BANNER_PAGE, SUB_BANNER_PAGE } from "@/constants/path";
import { useState } from "react";

// 배너 생성 요청 훅
export const usePostBanner = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.BANNER);
  const form = useForm<z.infer<typeof mainBannerSchema>>({
    resolver: zodResolver(mainBannerSchema),
    defaultValues: {
      type: BannerType.MAIN,
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof mainBannerSchema>) => {
      try {
        setIsLoading(true);
        const fileArray = await onPostS3PresignedUrl([data.imageUrl as File]);
        const newImage = fileArray[0];
        const reqData = {
          ...data,
          imageUrl: newImage,
          displayOrder: Number(data.displayOrder),
          isActive: data.isActive === "true" ? true : false,
        };

        await createBanner(reqData);
        toast({ title: "배너가 생성되었어요" });
        await new Promise((resolve) => setTimeout(resolve, 300));
        router.replace(MAIN_BANNER_PAGE);
        form.reset();
      } catch (error) {
        console.error("배너 생성 실패:", error);
        toast({ title: "잠시 후 다시 시도해주세요" });
      } finally {
        setIsLoading(false);
      }
    },
  );

  return { form, onSubmit, isLoading };
};

// 서브 배너 생성 요청 훅
export const usePostSubBanner = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.BANNER);
  const form = useForm<z.infer<typeof subBannerSchema>>({
    resolver: zodResolver(subBannerSchema),
    defaultValues: {
      type: BannerType.SUB,
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof subBannerSchema>) => {
      try {
        setIsLoading(true);
        const fileArray = await onPostS3PresignedUrl([data.imageUrl as File]);
        const newImage = fileArray[0];
        const reqData = {
          ...data,
          imageUrl: newImage,
          displayOrder: Number(data.displayOrder),
          isActive: data.isActive === "true" ? true : false,
        };

        await createBanner(reqData);
        toast({ title: "배너가 생성되었어요" });
        await new Promise((resolve) => setTimeout(resolve, 300));
        router.replace(SUB_BANNER_PAGE);
        form.reset();
      } catch (error) {
        console.error("배너 생성 실패:", error);
        toast({ title: "잠시 후 다시 시도해주세요" });
      } finally {
        setIsLoading(false);
      }
    },
  );

  return { form, onSubmit, isLoading };
};
