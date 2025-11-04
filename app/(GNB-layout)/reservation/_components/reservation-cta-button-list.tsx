import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import TwoButtonModal from "@/app/_components/modal/two-button-modal";
import { useState } from "react";

interface ReservationCtaButtonListProps {
  id: string;
  isCancelable: boolean;
  nextPage: string;
  onSubmit: (id: string) => void;
  loading: boolean;
}

const ReservationCtaButtonList = ({
  id,
  isCancelable,
  nextPage,
  onSubmit,
  loading,
}: ReservationCtaButtonListProps) => {
  const prev = useSearchParams().get("prev") ?? 1;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // 목록 버튼 핸들러
  const backToList = () => {
    router.push(`${nextPage}?prev=${prev}`);
  };

  // 모달 열기 핸들러
  const openCancelModal = () => {
    setOpen(true);
  };

  // 주문 취소 핸들러
  const cancelOrder = () => {
    setOpen(false);
    onSubmit(id);
  };

  return (
    <div className="sticky right-0 top-0 flex gap-2">
      <TwoButtonModal
        title="예약 취소"
        desc={`취소 시 토스 페이먼츠 결제가 취소돼요.\n예약을 취소할까요?`}
        buttonText="예약 취소"
        onClickFirstBtn={() => setOpen(false)}
        onClickSecondBtn={cancelOrder}
        open={open}
      />
      <Button variant="label" size={"lg"} onClick={backToList}>
        목록으로
      </Button>
      {isCancelable && (
        <Button
          variant="label"
          size={"lg"}
          onClick={openCancelModal}
          disabled={loading}
        >
          예약 취소
        </Button>
      )}
    </div>
  );
};

export default ReservationCtaButtonList;
