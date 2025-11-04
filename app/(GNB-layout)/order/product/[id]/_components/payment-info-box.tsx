import ShortRow from "@/app/_components/table/short-row";
import { OrderDetailItem } from "@/app/api/dto/order";
import { PAYMENT_METHOD_LABEL } from "@/constants/order";
import formattedDate from "@/util/date";
import { handleCommaPrice } from "@/util/price";

interface PaymentInfoBoxProps {
  data: OrderDetailItem;
}

const PaymentInfoBox = ({ data }: PaymentInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">결제 정보</p>
      <div>
        <ShortRow
          size="sm"
          label="결제 일시"
          value={formattedDate(data.createdAt, "YYYY-MM-DD HH:mm:ss")}
        />
        <ShortRow
          size="sm"
          label="배송비"
          value={handleCommaPrice(data.deliveryFee, "원")}
        />
        <ShortRow
          size="sm"
          label="총 결제 금액"
          value={handleCommaPrice(data.paidAmount, "원")}
        />
        <ShortRow
          isLastRow
          size="sm"
          label="결제 수단"
          value={PAYMENT_METHOD_LABEL[data.paymentMethod]}
        />
      </div>
    </div>
  );
};

export default PaymentInfoBox;
