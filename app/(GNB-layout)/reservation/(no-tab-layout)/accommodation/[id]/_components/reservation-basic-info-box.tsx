import StatusChip from "@/app/_components/chip/status-chip";
import ShortRow from "@/app/_components/table/short-row";
import {
  AccommodationMatchingStatus,
  AccommodationReservationItem,
  ReservationStatus,
} from "@/app/api/dto/reservation";
import formattedDate from "@/util/date";
import {
  ACCOMMODATION_MATCHING_STATUS_LABEL,
  RESERVATION_STATUS_LABEL,
} from "@/constants/reservation";
import MatchingStatusChangeButton from "./matching-status-change-button";
import ReservationStatusChangeButton from "@/app/(GNB-layout)/reservation/_components/reservation-status-change-button";
import { PRODUCT_TYPES } from "@/constants/product";
import { getChipColor } from "@/util/status";

interface ReservationBasicInfoBoxProps {
  data: AccommodationReservationItem;
}

const ReservationBasicInfoBox = ({ data }: ReservationBasicInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">예약 기본 정보</p>
      <div>
        <ShortRow size="sm" label="예약 ID" value={data.id} />
        <ShortRow
          size="sm"
          label="생성일"
          value={formattedDate(data.createdAt, "YYYY-MM-DD")}
        />
        <ShortRow size="sm" label="예약자" value={data.ordererName || "-"} />
        <ShortRow
          size="sm"
          label="연락처"
          value={data.ordererPhoneNumber || "-"}
        />
        <ShortRow size="sm" label="예약 일자" value={data.checkInDate}>
          <div className="flex gap-1">
            <p>{formattedDate(data.checkInDate, "YYYY-MM-DD")}</p>
            <p>~</p>
            <p>{formattedDate(data.checkOutDate, "YYYY-MM-DD")}</p>
          </div>
        </ShortRow>

        <ShortRow size="sm" label="예약 상태" value={data.status || "-"}>
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
                  type={PRODUCT_TYPES.ACCOMMODATION}
                />
              )}
          </div>
        </ShortRow>
        <ShortRow
          isLastRow
          size="sm"
          label="숙소 매칭"
          value={data.status || "-"}
        >
          <div className="flex items-center gap-2">
            <StatusChip
              status={
                ACCOMMODATION_MATCHING_STATUS_LABEL[
                  data.accommodationMatchingStatus
                ]
              }
              color={
                data.accommodationMatchingStatus ===
                AccommodationMatchingStatus.PENDING
                  ? "green"
                  : "blue"
              }
            />
            {data.status !== ReservationStatus.CANCELLED && (
              <MatchingStatusChangeButton
                id={data.id}
                status={data.accommodationMatchingStatus}
              />
            )}
          </div>
        </ShortRow>
      </div>
    </div>
  );
};

export default ReservationBasicInfoBox;
