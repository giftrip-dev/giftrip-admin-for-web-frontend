import ShortRow from "@/app/_components/table/short-row";
import { ExperienceReservationItem } from "@/app/api/dto/reservation";
import { handleCommaPrice } from "@/util/price";
import { PAYMENT_METHOD_LABEL, PAYMENT_STATUS_LABEL } from "@/constants/order";

interface PaymentInfoBoxProps {
  data: ExperienceReservationItem;
}

const PaymentInfoBox = ({ data }: PaymentInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">결제 정보</p>
      <div>
        <ShortRow
          size="sm"
          label="결제 금액"
          value={`${handleCommaPrice(data.paidAmount)}원`}
        />
        <ShortRow
          size="sm"
          label="결제 방법"
          value={PAYMENT_METHOD_LABEL[data.paymentMethod]}
        />
        <ShortRow
          isLastRow
          size="sm"
          label="결제 상태"
          value={PAYMENT_STATUS_LABEL[data.paymentStatus]}
        />
      </div>
    </div>
  );
};

export default PaymentInfoBox;
