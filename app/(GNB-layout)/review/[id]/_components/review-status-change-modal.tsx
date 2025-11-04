import TwoButtonModal from "@/app/_components/modal/two-button-modal";
import { useUpdateReviewStatus } from "@/hooks/review/use-update-review-status";
import ReviewStatusChangeForm from "./review-status-form";

interface StatusChangeModalProps {
  open: boolean;
  onClose: () => void;
  id: string;
  status: "true" | "false";
}

const ReviewStatusChangeModal = ({
  open,
  onClose,
  id,
  status,
}: StatusChangeModalProps) => {
  const { onSubmit, loading, form } = useUpdateReviewStatus(
    id,
    status,
    onClose,
  );

  const handleSubmit = () => {
    form.handleSubmit(onSubmit)();
  };

  return (
    <TwoButtonModal
      title="리뷰 상태 변경"
      desc="리뷰 상태를 변경하시겠습니까?"
      buttonText="변경"
      onClickFirstBtn={onClose}
      onClickSecondBtn={handleSubmit}
      open={open}
      loading={loading}
    >
      <div className="flex w-full flex-col gap-5">
        <p className="text-title-1">리뷰 상태 변경</p>
        <ReviewStatusChangeForm form={form} />
      </div>
    </TwoButtonModal>
  );
};

export default ReviewStatusChangeModal;
