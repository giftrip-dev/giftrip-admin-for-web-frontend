import { useState } from "react";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { updateReviewStatus } from "@/app/api/review";

// 리뷰 상태 변경 훅
export const useUpdateReviewStatus = (
  id: string,
  isActive: string,
  onClose: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<{ isActive: string }>({
    defaultValues: {
      isActive,
    },
  });

  const onSubmit = async (data: { isActive: string }) => {
    setLoading(true);
    try {
      await updateReviewStatus(id, data.isActive === "true");
      toast({
        title: "리뷰 상태가 변경되었어요",
      });
      mutate((key) => {
        return Array.isArray(key) && key[0] === "/reviews";
      });
      onClose();
    } catch (err) {
      console.error(err);
      if (!err) return;
      toast({
        title: "잠시 후 다시 시도해주세요",
      });
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading, form };
};
