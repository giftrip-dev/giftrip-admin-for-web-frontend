import { useCancelOrder } from "@/hooks/order/use-cancel-order";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { ORDER_PRODUCT_PAGE } from "@/constants/path";
import TwoButtonModal from "@/app/_components/modal/two-button-modal";
import { useState } from "react";

interface OrderCtaButtonListProps {
  id: string;
  isCancelable: boolean;
}

const OrderCtaButtonList = ({ id, isCancelable }: OrderCtaButtonListProps) => {
  const prev = useSearchParams().get("prev") ?? 1;
  const { onSubmit, loading } = useCancelOrder();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // 목록 버튼 핸들러
  const backToList = () => {
    router.push(`${ORDER_PRODUCT_PAGE}?prev=${prev}`);
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
        title="주문 취소"
        desc={`주문 취소 시 토스 페이먼츠 결제가 취소돼요.\n주문을 취소할까요?`}
        buttonText="주문 취소"
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
          주문 취소
        </Button>
      )}
    </div>
  );
};

export default OrderCtaButtonList;
