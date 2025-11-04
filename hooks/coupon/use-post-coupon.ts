/* eslint-disable @typescript-eslint/no-unused-vars */

import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { COUPON_PAGE } from "@/constants/path";
import { useState } from "react";
import { couponCreateSchema } from "@/schema/coupon";
import { createCoupon } from "@/app/api/coupon";
import { CouponScope } from "@/app/api/dto/coupon";

// 쿠폰 생성 요청 훅
export const usePostCoupon = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof couponCreateSchema>>({
    resolver: zodResolver(couponCreateSchema),
    defaultValues: {
      isActive: "true",
    },
  });

  const handleCouponCreation = async (
    data: z.infer<typeof couponCreateSchema>,
  ) => {
    const { hasPeriod, ...rest } = data;

    // 쿠폰 생성 요청 데이터 (hasPeriod 제외)
    const reqData = {
      ...rest,
      isActive: data.isActive === "true" ? true : false,
      discountRate: Number(data.discountRate),
    };

    await createCoupon(reqData);
    toast({ title: "쿠폰이 생성되었어요" });
    await new Promise((resolve) => setTimeout(resolve, 300));
    router.replace(COUPON_PAGE);
    form.reset();
  };

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof couponCreateSchema>) => {
      try {
        setIsLoading(true);
        const isScopeForAll = data.scope === CouponScope.ALL_CUSTOMERS;

        if (isScopeForAll) {
          if (
            confirm(
              "전체 고객 대상 발행 시 회수가 불가능합니다. 쿠폰을 발행 하시겠습니까?",
            )
          ) {
            await handleCouponCreation(data);
          }
        } else {
          await handleCouponCreation(data);
        }
      } catch (error) {
        console.error("쿠폰 생성 실패:", error);
        toast({ title: "잠시 후 다시 시도해주세요" });
      } finally {
        setIsLoading(false);
      }
    },
  );

  return { form, onSubmit, isLoading };
};
