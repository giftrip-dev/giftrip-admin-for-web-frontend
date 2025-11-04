import ShortRow from "@/app/_components/table/short-row";
import { CampaignReservationItem } from "@/app/api/dto/reservation";
import { handleCommaPrice } from "@/util/price";

interface PaymentInfoBoxProps {
  data: CampaignReservationItem;
}

const PaymentInfoBox = ({ data }: PaymentInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">결제 정보</p>
      <div>
        <ShortRow
          isLastRow
          size="sm"
          label="결제 금액"
          value={`${handleCommaPrice(data.paidAmount)}원`}
        />
      </div>
    </div>
  );
};

export default PaymentInfoBox;
