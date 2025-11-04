import ShortRow from "@/app/_components/table/short-row";
import { OrderItem, PaymentStatus } from "@/app/api/dto/order";
import { PAYMENT_STATUS_LABEL } from "@/constants/order";
import StatusChip from "@/app/_components/chip/status-chip";

interface BasicInfoBoxProps {
  data: OrderItem;
}

const BasicInfoBox = ({ data }: BasicInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">기본 정보</p>
      <div>
        <ShortRow size="sm" label="주문자 성함" value={data.ordererName} />
        <ShortRow
          size="sm"
          label="주문자 연락처"
          value={data.ordererPhoneNumber}
        />
        <ShortRow size="sm" label="주문번호" value={data.orderNumber} />
        <ShortRow size="sm" label="상품개수" value={data.itemCount} />
        <ShortRow
          isLastRow
          size="sm"
          label="결제 상태"
          value={PAYMENT_STATUS_LABEL[data.paymentStatus]}
        >
          <StatusChip
            status={PAYMENT_STATUS_LABEL[data.paymentStatus]}
            color={
              data.paymentStatus === PaymentStatus.PENDING ? "blue" : "green"
            }
          />
        </ShortRow>
      </div>
    </div>
  );
};

export default BasicInfoBox;
