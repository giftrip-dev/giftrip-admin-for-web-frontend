import { useState } from "react";
import { toast } from "../use-toast";
import { cancelOrder } from "@/app/api/order";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { ORDER_PRODUCT_PAGE } from "@/constants/path";

// 주문 취소 훅
export const useCancelOrder = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (id: string) => {
    setLoading(true);
    try {
      await cancelOrder(id);
      // 주문 목록 데이터 갱신
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/orders";
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      toast({
        title: "주문이 취소되었어요.",
      });
      router.replace(ORDER_PRODUCT_PAGE);
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
