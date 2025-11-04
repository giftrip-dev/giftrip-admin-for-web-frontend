import ShortRow from "@/app/_components/table/short-row";
import { CampaignReservationItem } from "@/app/api/dto/reservation";

interface UserInfoBoxProps {
  data: CampaignReservationItem;
}

const UserInfoBox = ({ data }: UserInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">이용자 정보</p>
      <div>
        <ShortRow size="sm" label="이름" value={data.userName || "-"} />
        <ShortRow
          isLastRow
          size="sm"
          label="연락처"
          value={data.userPhoneNumber || "-"}
        />
      </div>
    </div>
  );
};

export default UserInfoBox;
