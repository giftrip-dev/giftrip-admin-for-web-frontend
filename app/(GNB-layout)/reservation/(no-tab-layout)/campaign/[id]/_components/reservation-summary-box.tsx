import MemoBox from "@/app/(GNB-layout)/experience/_components/memo-box";
import formattedDate from "@/util/date";

interface ReservationSummaryBoxProps {
  id: string; // 예약번호
  createdAt: string; // 예약일시
  adminMemo?: string; // 관리자 메모
}

const ReservationSummaryBox = ({
  id,
  createdAt,
  adminMemo,
}: ReservationSummaryBoxProps) => {
  return (
    <div className="flex flex-col gap-2 bg-[#32333C] px-8 pb-10 text-white">
      <div className="flex items-center gap-2">
        <p className="text-title-1">{`예약번호 :`}</p>
        <p className="text-body-1">{id}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-title-1">{`예약 일시 :`}</p>
        <p className="text-body-1">
          {formattedDate(createdAt, "YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
      <MemoBox memo={adminMemo || ""} clickUpdate={() => {}} />
    </div>
  );
};

export default ReservationSummaryBox;
