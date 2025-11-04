import useSWR from "swr";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { ACCOMMODATION_PRODUCT_DETAIL_PAGE } from "@/constants/path";
import { useEffect, useState } from "react";
import { usePostS3PresignedUrl } from "../s3/use-post-s3-presigned-url";
import { Domain } from "@/app/api/dto/s3";
import { accommodationProductSchema } from "@/schema/accommodation";
import {
  AccommodationCreateReq,
  AccommodationItem,
} from "@/app/api/dto/accommodation";
import {
  getAccommodationDetail,
  updateAccommodationProduct,
} from "@/app/api/accommodation";
import { useGetAccommodationCompanyDetail } from "./use-get-company-detail";

export const useUpdateAccommodationProduct = (accommodationId?: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { onPostS3PresignedUrl } = usePostS3PresignedUrl(Domain.CAMPAIGN);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof accommodationProductSchema>>({
    resolver: zodResolver(accommodationProductSchema),
  });

  // 숙소 상세 정보 조회
  const key = accommodationId ? ["accommodation", accommodationId] : null;
  const { data: accommodationDetail, error } = useSWR<AccommodationItem, Error>(
    key,
    () => getAccommodationDetail(accommodationId!),
    {
      suspense: isClient,
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 0, // 중복 제거 비활성화
    },
  );

  // 업체 정보 조회 (accommodationDetail에서 accommodationId 가져온 후)
  const { data: companyDetail } = useGetAccommodationCompanyDetail(
    accommodationDetail?.accommodationId || "",
  );

  // 시간 문자열을 AM/PM과 시간으로 파싱하는 함수
  const parseTime = (timeString: string) => {
    if (!timeString) return { amPm: "", hour: "" };

    // "15:00" 형태의 시간을 파싱
    const [hourStr] = timeString.split(":");
    const hour24 = parseInt(hourStr);

    if (hour24 === 0) return { amPm: "AM", hour: "12" };
    if (hour24 < 12) return { amPm: "AM", hour: String(hour24) };
    if (hour24 === 12) return { amPm: "PM", hour: "12" };
    return { amPm: "PM", hour: String(hour24 - 12) };
  };

  // 폼에 기존 데이터 설정
  useEffect(() => {
    if (accommodationDetail && !isFormInitialized) {
      // 체크인/체크아웃 시간 파싱
      const checkInParsed = parseTime(accommodationDetail.checkInTime);
      const checkOutParsed = parseTime(accommodationDetail.checkOutTime);

      // 약간의 지연을 두고 폼 리셋 (렌더링 완료 후)
      setTimeout(() => {
        form.reset({
          ...accommodationDetail,
          isActive: String(accommodationDetail.isActive),
          checkInAmPm: checkInParsed.amPm,
          checkInHour: checkInParsed.hour,
          checkOutAmPm: checkOutParsed.amPm,
          checkOutHour: checkOutParsed.hour,
          availableFrom: accommodationDetail.availableFrom,
          availableTo: accommodationDetail.availableTo,
        });
        setIsFormInitialized(true);
      }, 100);
    }
  }, [accommodationDetail, form, isFormInitialized]);

  // 컴포넌트가 언마운트될 때 초기화 상태 리셋
  useEffect(() => {
    return () => {
      setIsFormInitialized(false);
    };
  }, []);

  const mutate = async (data: z.infer<typeof accommodationProductSchema>) => {
    setIsLoading(true);
    try {
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

      let reqData: AccommodationCreateReq;
      let imageUrls: string[];

      // 이미지가 File 객체인 경우 S3에 업로드
      if (data.imageUrls.some((url) => url instanceof File)) {
        const fileArray = await onPostS3PresignedUrl(
          data.imageUrls.filter((url) => url instanceof File),
        );
        imageUrls = fileArray;

        reqData = {
          ...data,
          imageUrls,
          checkInTime,
          checkOutTime,
          isActive: data.isActive === "true",
        };
      } else {
        reqData = {
          ...data,
          imageUrls: data.imageUrls as string[],
          checkInTime,
          checkOutTime,
          isActive: data.isActive === "true",
        };
      }

      await updateAccommodationProduct(accommodationId!, reqData);
      toast({
        title: "숙소 상품이 수정되었어요",
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.replace(
        ACCOMMODATION_PRODUCT_DETAIL_PAGE.replace("[id]", accommodationId!),
      );
    } catch (error) {
      console.error("숙소 상품 수정 실패:", error);
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
    isLoading: isLoading || (!accommodationDetail && !error),
    accommodationDetail,
    companyDetail,
  };
};
