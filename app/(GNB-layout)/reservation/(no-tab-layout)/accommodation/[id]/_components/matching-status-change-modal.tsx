import TwoButtonModal from "@/app/_components/modal/two-button-modal";
import MatchingStatusChangeForm from "./matching-status-form";
import { AccommodationMatchingStatus } from "@/app/api/dto/reservation";
import { useUpdateMatchingStatus } from "@/hooks/reservation/use-update-matching-status";

interface StatusChangeModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  status: AccommodationMatchingStatus;
}

const MatchingStatusChangeModal = ({
  open,
  onClose,
  id,
  status,
}: StatusChangeModalProps) => {
  const { onSubmit, loading, form } = useUpdateMatchingStatus(id, status);

  const handleSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <TwoButtonModal
      title="매칭 상태 변경"
      desc="매칭 상태를 변경하시겠습니까?"
      buttonText="변경"
      onClickFirstBtn={onClose}
      onClickSecondBtn={handleSubmit}
      open={open}
      loading={loading}
    >
      <div className="flex w-full flex-col gap-5">
        <p className="text-title-1">매칭 상태 변경</p>
        <MatchingStatusChangeForm form={form} />
      </div>
    </TwoButtonModal>
  );
};

export default MatchingStatusChangeModal;
