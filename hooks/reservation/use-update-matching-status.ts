import { useState } from "react";
import { AccommodationMatchingStatus } from "@/app/api/dto/reservation";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { updateAccommodationMatchingStatus } from "@/app/api/reservation";

// 숙소 매칭 상태 변경 훅
export const useUpdateMatchingStatus = (
  id: string,
  matchingStatus: AccommodationMatchingStatus,
) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<{ matchingStatus: AccommodationMatchingStatus }>({
    defaultValues: {
      matchingStatus,
    },
  });

  const onSubmit = async (data: {
    matchingStatus: AccommodationMatchingStatus;
  }) => {
    setLoading(true);
    try {
      await updateAccommodationMatchingStatus(id, data.matchingStatus);
      toast({
        title: "숙소 매칭 상태가 변경되었어요",
      });
      mutate((key) => {
        return Array.isArray(key) && key[0] === "/reservations/accommodation";
      });
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
