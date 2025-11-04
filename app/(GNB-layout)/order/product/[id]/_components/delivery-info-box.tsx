import ShortRow from "@/app/_components/table/short-row";
import { DeliveryStatus, OrderDetailItem } from "@/app/api/dto/order";
import { DELIVERY_STATUS_LABEL } from "@/constants/order";
import StatusChip from "@/app/_components/chip/status-chip";
import DeliveryStatusChangeButton from "./delivery-status-change-button";

interface DeliveryInfoBoxProps {
  data: OrderDetailItem;
}

const DeliveryInfoBox = ({ data }: DeliveryInfoBoxProps) => {
  const addressText = `${data.address1} ${data.address2}`;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">배송 정보</p>
      <div>
        <ShortRow
          size="sm"
          label="배송 상태"
          value={DELIVERY_STATUS_LABEL[data.deliveryStatus]}
        >
          <div className="flex items-center gap-2">
            <StatusChip
              status={DELIVERY_STATUS_LABEL[data.deliveryStatus] ?? "정보 없음"}
              color={
                data.deliveryStatus === DeliveryStatus.PENDING
                  ? "green"
                  : "blue"
              }
            />
            <DeliveryStatusChangeButton
              id={data.id}
              status={data.deliveryStatus}
            />
          </div>
        </ShortRow>

        <div className="flex">
          <p
            className={`flex w-[154px] shrink-0 items-center border-y bg-gray-100 px-5 text-body-3`}
          >
            수령자 정보
          </p>
          <div className="flex w-full flex-col border-b">
            <ShortRow size="sm" label="수령자 이름" value={data.ordererName} />
            <ShortRow
              size="sm"
              label="수령자 연락처"
              value={data.ordererPhoneNumber}
            />
            <ShortRow size="sm" label="수령자 주소" value={addressText} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoBox;
