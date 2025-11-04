import { useState } from "react";
import { toast } from "../use-toast";
import { deleteShoppingProduct } from "@/app/api/shopping";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { SHOPPING_PRODUCT_PAGE } from "@/constants/path";

export const useDeleteShoppingProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (id: string) => {
    setLoading(true);
    try {
      await deleteShoppingProduct(id);
      // 쇼핑 목록 데이터 갱신
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/products";
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      toast({
        title: "쇼핑 상품이 삭제되었어요.",
      });
      router.replace(SHOPPING_PRODUCT_PAGE);
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
