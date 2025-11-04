import { useState } from "react";
import { toast } from "../use-toast";
import { cancelAccommodationReservation } from "@/app/api/accommodation";
import { mutate } from "swr";
import { CustomError } from "@/util/fetch";

// 숙소 예약 취소 훅
export const useCancelAccommodationReservation = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (id: string) => {
    setLoading(true);
    try {
      await cancelAccommodationReservation(id);
      // 숙소 예약 목록 데이터 갱신
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/reservations/accommodation";
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      toast({
        title: "숙소 예약이 취소되었어요.",
      });
    } catch (err) {
      if (err instanceof CustomError) {
        if (err.statusCode === 400) {
          toast({
            title: "확정된 예약은 취소할 수 없습니다. 예약 상태를 변경해주세요",
          });
        }
      } else {
        toast({
          title: "잠시 후 다시 시도해주세요.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
};
