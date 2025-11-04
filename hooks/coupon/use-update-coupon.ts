import useSWR from "swr";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { COUPON_DETAIL_PAGE } from "@/constants/path";
import { useEffect, useState } from "react";
import { couponCreateSchema } from "@/schema/coupon";
import { CouponCreateReq, CouponItem } from "@/app/api/dto/coupon";
import { getCouponDetail, updateCoupon } from "@/app/api/coupon";
import { ProductType } from "@/constants/product";

export const useUpdateCoupon = (couponId?: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof couponCreateSchema>>({
    resolver: zodResolver(couponCreateSchema),
    defaultValues: {
      isActive: "true",
    },
  });

  // 배너 상세 정보 조회
  const key = couponId ? ["coupon", couponId] : null;
  const { data: couponDetail, error } = useSWR<CouponItem, Error>(
    key,
    () => getCouponDetail(couponId!),
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
    if (couponDetail && !isFormInitialized) {
      // 약간의 지연을 두고 폼 리셋 (렌더링 완료 후)
      setTimeout(() => {
        form.reset({
          ...couponDetail,
          hasPeriod:
            couponDetail.startDate && couponDetail.endDate ? "true" : "false",
          isActive: couponDetail.isActive ? "true" : "false",
          discountRate: String(couponDetail.discountRate),
          itemType: couponDetail.itemType as ProductType,
        });
        setIsFormInitialized(true);
      }, 100);
    }
  }, [couponDetail, form, isFormInitialized]);

  // 컴포넌트가 언마운트될 때 초기화 상태 리셋
  useEffect(() => {
    return () => {
      setIsFormInitialized(false);
    };
  }, []);

  const mutate = async (data: z.infer<typeof couponCreateSchema>) => {
    setIsLoading(true);
    try {
      const reqData: CouponCreateReq = {
        ...data,
        isActive: data.isActive === "true",
        discountRate: Number(data.discountRate),
      };

      await updateCoupon(couponId!, reqData);
      toast({
        title: "쿠폰이 수정되었어요",
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      router.replace(COUPON_DETAIL_PAGE.replace("[id]", couponId!));
    } catch (error) {
      console.error("쿠폰 수정 실패:", error);
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
    isLoading: isLoading || (!couponDetail && !error),
  };
};
