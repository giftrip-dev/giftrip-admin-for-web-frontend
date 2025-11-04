import ShortRow from "@/app/_components/table/short-row";
import { AccommodationReservationItem } from "@/app/api/dto/reservation";

interface ProductInfoBoxProps {
  data: AccommodationReservationItem;
}

const UserInfoBox = ({ data }: ProductInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">이용자 정보</p>
      <div>
        <ShortRow size="sm" label="이름" value={data.guestName} />
        <ShortRow
          isLastRow
          size="sm"
          label="연락처"
          value={data.guestPhoneNumber}
        />
      </div>
    </div>
  );
};

export default UserInfoBox;
