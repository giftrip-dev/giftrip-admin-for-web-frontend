import { toast } from "../use-toast";
import { useState } from "react";
import { applyCouponToProduct } from "@/app/api/coupon";
import { CouponApplyToProductReq } from "@/app/api/dto/coupon";
import { mutate } from "swr";

// 상품 대상 쿠폰 적용 훅
export const useApplyCouponToProduct = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleApplyCouponToProduct = async (data: CouponApplyToProductReq) => {
    const res = await applyCouponToProduct(data);
    mutate(["/products", data.itemId]);
    toast({ title: "쿠폰이 적용되었어요" });
    return res;
  };

  const onSubmit = async (data: CouponApplyToProductReq) => {
    try {
      setIsLoading(true);
      await handleApplyCouponToProduct(data);
    } catch (error) {
      console.error("쿠폰 적용 실패:", error);
      toast({ title: "잠시 후 다시 시도해주세요" });
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
