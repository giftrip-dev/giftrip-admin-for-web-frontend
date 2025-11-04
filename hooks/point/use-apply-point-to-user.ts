import { toast } from "../use-toast";
import { useState } from "react";
import { mutate } from "swr";
import { PointApplyReq } from "@/app/api/dto/point";
import { applyPoint } from "@/app/api/point";
import { useForm } from "react-hook-form";

// 회원 대상 포인트 지급 훅
export const useApplyPointToUser = (userId: string, onClose: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PointApplyReq>({
    defaultValues: {
      userId,
    },
  });

  const handleApplyPointToUser = async (req: PointApplyReq) => {
    await applyPoint(req);
    mutate(["/members", req.userId]);
    onClose();
    toast({ title: "포인트가 지급되었어요" });
  };

  const onSubmit = form.handleSubmit(async (data: PointApplyReq) => {
    try {
      setIsLoading(true);
      await handleApplyPointToUser(data);
      form.reset();
    } catch (error) {
      console.error("포인트 지급 실패:", error);
      toast({ title: "잠시 후 다시 시도해주세요" });
    } finally {
      setIsLoading(false);
    }
  });

  return { onSubmit, isLoading, form };
};
