import MemoBox from "@/app/(GNB-layout)/experience/_components/memo-box";
import { MemberDetailItem } from "@/app/api/dto/member";
import formattedDate from "@/util/date";

const MemberInfoSummaryBox = ({ data }: { data: MemberDetailItem }) => {
  return (
    <div className="flex flex-col gap-2 bg-[#32333C] px-8 pb-10 text-white">
      <div className="flex items-center gap-2">
        <p className="text-title-1">{`이름 :`}</p>
        <p className="text-body-1">
          {data.userInfo.isWithdrawn ? "-" : data.userInfo.name || "-"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-title-1">{`닉네임 :`}</p>
        <p className="text-body-1">
          {data.userInfo.isWithdrawn ? "-" : data.userInfo.nickname || "-"}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-title-1">{`가입일 :`}</p>
        <p className="text-body-1">
          {formattedDate(data.userInfo.createdAt, "YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
      <MemoBox memo={data.userInfo.adminMemo || ""} clickUpdate={() => {}} />
    </div>
  );
};

export default MemberInfoSummaryBox;
