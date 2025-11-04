import { useState } from "react";
import { toast } from "../use-toast";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { COUPON_PAGE } from "@/constants/path";
import { deleteCoupon } from "@/app/api/coupon";

// 쿠폰 삭제 훅
export const useDeleteCoupon = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (id: string) => {
    setLoading(true);
    try {
      await deleteCoupon(id);
      // 쿠폰 목록 데이터 갱신
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/coupons";
      });
      router.replace(COUPON_PAGE);
      toast({
        title: "쿠폰이 삭제되었어요.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "잠시 후 다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
};
