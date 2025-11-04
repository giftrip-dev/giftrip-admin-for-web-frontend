import StatusChip from "@/app/_components/chip/status-chip";
import ShortRow from "@/app/_components/table/short-row";
import {
  ExperienceReservationItem,
  ReservationStatus,
} from "@/app/api/dto/reservation";
import formattedDate from "@/util/date";
import { RESERVATION_STATUS_LABEL } from "@/constants/reservation";
import ReservationStatusChangeButton from "@/app/(GNB-layout)/reservation/_components/reservation-status-change-button";
import { PRODUCT_TYPES } from "@/constants/product";
import { getChipColor } from "@/util/status";

interface ReservationBasicInfoBoxProps {
  data: ExperienceReservationItem;
}

const ReservationBasicInfoBox = ({ data }: ReservationBasicInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">예약 기본 정보</p>
      <div>
        <ShortRow
          size="sm"
          label="생성일"
          value={formattedDate(data.createdAt, "YYYY-MM-DD")}
        />
        <ShortRow size="sm" label="예약자" value={data.ordererName} />
        <ShortRow
          size="sm"
          label="예약자 연락처"
          value={data.ordererPhoneNumber}
        />
        <ShortRow
          size="sm"
          label="예약 일자"
          value={formattedDate(data.experienceDate, "YYYY-MM-DD")}
        />
        <ShortRow size="sm" label="수량/인원" value={data.quantity} />
        <ShortRow
          isLastRow
          size="sm"
          label="예약 상태"
          value={data.status || "-"}
        >
          <div className="flex items-center gap-2">
            <StatusChip
              status={RESERVATION_STATUS_LABEL[data.status]}
              color={getChipColor(data.status)}
            />
            {data.status !== ReservationStatus.CANCELLED &&
              data.status !== ReservationStatus.COMPLETED && (
                <ReservationStatusChangeButton
                  id={data.id}
                  status={data.status}
                  type={PRODUCT_TYPES.EXPERIENCE}
                />
              )}
          </div>
        </ShortRow>
      </div>
    </div>
  );
};

export default ReservationBasicInfoBox;
