import TwoButtonModal from "@/app/_components/modal/two-button-modal";
import DeliveryStatusChangeForm from "./delivery-status-change-form";
import { useUpdateDeliveryStatus } from "@/hooks/order/use-update-delivery-status";
import { DeliveryStatus } from "@/app/api/dto/order";
interface StatusChangeModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  status: DeliveryStatus;
}

const DeliveryStatusChangeModal = ({
  open,
  onClose,
  id,
  status,
}: StatusChangeModalProps) => {
  const { onSubmit, loading, form } = useUpdateDeliveryStatus(
    id,
    status,
    onClose,
  );

  return (
    <TwoButtonModal
      title="배송 상태 변경"
      desc="배송 상태를 변경하시겠습니까?"
      buttonText="변경"
      onClickFirstBtn={onClose}
      onClickSecondBtn={onSubmit}
      open={open}
      loading={loading}
    >
      <div className="flex w-full flex-col gap-5">
        <p className="text-title-1">배송 상태 변경</p>
        <DeliveryStatusChangeForm form={form} />
      </div>
    </TwoButtonModal>
  );
};

export default DeliveryStatusChangeModal;
