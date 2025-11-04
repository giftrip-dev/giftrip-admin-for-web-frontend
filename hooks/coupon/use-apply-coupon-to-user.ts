import { toast } from "../use-toast";
import { useState } from "react";
import { applyCouponToMember } from "@/app/api/coupon";
import { mutate } from "swr";

// 회원 대상 쿠폰 지급 훅
export const useApplyCouponToUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyCouponToUser = async (userId: string, couponId: string) => {
    await applyCouponToMember({ userId, couponId });
    mutate(["/members", userId]);
    toast({ title: "쿠폰이 지급되었어요" });
  };

  const onSubmit = async ({
    userId,
    couponId,
  }: {
    userId: string;
    couponId: string;
  }) => {
    try {
      setIsLoading(true);
      await handleApplyCouponToUser(userId, couponId);
    } catch (error) {
      console.error("쿠폰 지급 실패:", error);
      toast({ title: "잠시 후 다시 시도해주세요" });
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
