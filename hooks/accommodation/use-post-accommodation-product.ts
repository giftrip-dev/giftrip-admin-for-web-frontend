import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { useRouter } from "next/navigation";
import { ACCOMMODATION_PRODUCT_PAGE } from "@/constants/path";
import { useState } from "react";
import { createAccommodationProduct } from "@/app/api/accommodation";
import { accommodationProductSchema } from "@/schema/accommodation";

// 숙소 상품 생성 요청 훅
export const usePostAccommodationProduct = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.ACCOMMODATION);
  const form = useForm<z.infer<typeof accommodationProductSchema>>({
    resolver: zodResolver(accommodationProductSchema),
    defaultValues: {
      isActive: "true",
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof accommodationProductSchema>) => {
      try {
        setIsLoading(true);
        const fileArray = await onPostS3PresignedUrl(
          data.imageUrls.filter((url) => url instanceof File),
        );
        const newImageList = fileArray;

        // 시간을 24시간 형식으로 변환하는 함수
        const convertTo24Hour = (time: string, amPm: string): string => {
          const hour = parseInt(time);
          let hour24: number;

          if (amPm === "AM") {
            // 오전: 12시는 00시로, 나머지는 그대로
            hour24 = hour === 12 ? 0 : hour;
          } else {
            // 오후: 12시는 그대로, 나머지는 +12
            hour24 = hour === 12 ? 12 : hour + 12;
          }

          // 2자리로 패딩하여 HH:MM 형식으로 반환
          return `${hour24.toString().padStart(2, "0")}:00`;
        };

        const checkInTime = convertTo24Hour(
          data.checkInHour || "12",
          data.checkInAmPm || "AM",
        );
        const checkOutTime = convertTo24Hour(
          data.checkOutHour || "12",
          data.checkOutAmPm || "AM",
        );

        // 숙소 상품 생성
        const payload = {
          ...data,
          imageUrls: newImageList,
          checkInTime,
          checkOutTime,
          isActive: data.isActive === "true" ? true : false,
        };

        await createAccommodationProduct(payload);
        router.replace(ACCOMMODATION_PRODUCT_PAGE);
        await new Promise((resolve) => setTimeout(resolve, 150));
        toast({ title: "숙소 상품이 생성되었어요" });
        form.reset();
      } catch (error) {
        console.error("숙소 상품 생성 실패:", error);
        toast({ title: "잠시 후 다시 시도해주세요" });
      } finally {
        setIsLoading(false);
      }
    },
  );

  return { form, onSubmit, isLoading };
};
