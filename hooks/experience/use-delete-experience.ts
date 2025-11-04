// 배너 삭제 훅

import { useState } from "react";
import { toast } from "../use-toast";
import { deleteExperienceProduct } from "@/app/api/experience";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { EXPERIENCE_PRODUCT_PAGE } from "@/constants/path";

export const useDeleteExperienceProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (id: string) => {
    setLoading(true);
    try {
      await deleteExperienceProduct(id);
      // 여행 상품 목록 데이터 갱신
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/experiences";
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      toast({
        title: "여행 상품이 삭제되었어요.",
      });
      router.replace(EXPERIENCE_PRODUCT_PAGE);
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
