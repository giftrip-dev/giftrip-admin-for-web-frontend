import { useState } from "react";
import { toast } from "../use-toast";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { REVIEW_PAGE } from "@/constants/path";
import { deleteReview } from "@/app/api/review";

// 리뷰 삭제 훅
export const useDeleteReview = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (id: string) => {
    setLoading(true);
    try {
      await deleteReview(id);
      // 게시판 목록 데이터 갱신
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/reviews";
      });
      router.replace(REVIEW_PAGE);
      await new Promise((resolve) => setTimeout(resolve, 300));
      toast({
        title: "리뷰가 삭제되었어요.",
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
