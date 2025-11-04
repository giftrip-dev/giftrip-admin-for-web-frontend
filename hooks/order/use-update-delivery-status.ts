import { useState } from "react";
import { DeliveryStatus } from "@/app/api/dto/order";
import { updateOrderStatus } from "@/app/api/order";
import { toast } from "../use-toast";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

// 배송 상태 변경 훅
export const useUpdateDeliveryStatus = (
  id: string,
  deliveryStatus: DeliveryStatus,
  onSuccess: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<{ deliveryStatus: DeliveryStatus }>({
    defaultValues: {
      deliveryStatus,
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: { deliveryStatus: DeliveryStatus }) => {
      setLoading(true);
      try {
        await updateOrderStatus(id, data.deliveryStatus);
        toast({
          title: "배송 상태가 변경되었어요",
        });
        mutate((key) => {
          return Array.isArray(key) && key[0] === "/orders";
        });
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
