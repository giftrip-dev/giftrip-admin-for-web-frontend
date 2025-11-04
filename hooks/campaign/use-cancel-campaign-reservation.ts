import { useState } from "react";
import { toast } from "../use-toast";
import { cancelCampaignReservation } from "@/app/api/campaign";
import { mutate } from "swr";

// 체험단 예약 취소 훅
export const useCancelCampaignReservation = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (id: string) => {
    setLoading(true);
    try {
      await cancelCampaignReservation(id);
      // 체험단 예약 목록 데이터 갱신
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/reservations/campaign";
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      toast({
        title: "체험단 예약이 취소되었어요.",
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
