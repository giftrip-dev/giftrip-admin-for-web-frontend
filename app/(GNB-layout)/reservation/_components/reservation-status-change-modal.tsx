import TwoButtonModal from "@/app/_components/modal/two-button-modal";
import ReservationStatusChangeForm from "./reservation-status-form";
import { ProductType } from "@/constants/product";
import { useUpdateReservationStatus } from "@/hooks/reservation/use-update-reservation-status";
import { ReservationStatus } from "@/app/api/dto/reservation";
interface StatusChangeModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  status: ReservationStatus;
  type: ProductType;
}

const ReservationStatusChangeModal = ({
  open,
  onClose,
  id,
  status,
  type,
}: StatusChangeModalProps) => {
  const { onSubmit, loading, form } = useUpdateReservationStatus(
    id,
    status,
    type,
    onClose,
  );

  return (
    <TwoButtonModal
      title="예약 상태 변경"
      desc="예약 상태를 변경하시겠습니까?"
      buttonText="변경"
      onClickFirstBtn={onClose}
      onClickSecondBtn={onSubmit}
      open={open}
      loading={loading}
    >
      <div className="flex w-full flex-col gap-5">
        <p className="text-title-1">예약 상태 변경</p>
        <ReservationStatusChangeForm form={form} />
      </div>
    </TwoButtonModal>
  );
};

export default ReservationStatusChangeModal;
