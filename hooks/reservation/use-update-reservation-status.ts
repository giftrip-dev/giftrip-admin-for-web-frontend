import { useState } from "react";
import { ReservationStatus } from "@/app/api/dto/reservation";
import {
  updateAccommodationReservationStatus,
  updateCampaignReservationStatus,
  updateExperienceReservationStatus,
} from "@/app/api/reservation";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { PRODUCT_TYPES, ProductType } from "@/constants/product";

// 예약 상태 변경 훅
export const useUpdateReservationStatus = (
  id: string,
  status: ReservationStatus,
  type: ProductType,
  onSuccess: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<{ status: ReservationStatus }>({
    defaultValues: {
      status,
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: { status: ReservationStatus }) => {
      setLoading(true);
      try {
        if (type === PRODUCT_TYPES.EXPERIENCE) {
          await updateExperienceReservationStatus(id, data.status);
        } else if (type === PRODUCT_TYPES.CAMPAIGN) {
          await updateCampaignReservationStatus(id, data.status);
        } else {
          await updateAccommodationReservationStatus(id, data.status);
        }
        toast({
          title: "예약 상태가 변경되었어요",
        });

        if (type === PRODUCT_TYPES.EXPERIENCE) {
          mutate((key) => {
            return Array.isArray(key) && key[0] === "/reservations/experience";
          });
        } else if (type === PRODUCT_TYPES.CAMPAIGN) {
          mutate((key) => {
            return Array.isArray(key) && key[0] === "/reservations/campaign";
          });
        } else {
          mutate((key) => {
            return (
              Array.isArray(key) && key[0] === "/reservations/accommodation"
            );
          });
        }

        onSuccess();
      } catch (err) {
        console.error(err);
        if (!err) return;
        toast({
          title: "잠시 후 다시 시도해주세요",
        });
      } finally {
        setLoading(false);
      }
    },
  );

  return { onSubmit, loading, form };
};
