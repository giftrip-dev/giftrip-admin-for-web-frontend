import { AccommodationItem } from "@/app/api/dto/accommodation";
import MemoBox from "./memo-box";

const DetailInfoSummaryBox = ({ data }: { data: AccommodationItem }) => {
  return (
    <div className="bg-[#32333C] px-8 pb-6 text-white">
      <div className="flex items-center gap-2">
        <p className="text-title-1">{`상품명 :`}</p>
        <p>{data.name}</p>
      </div>
      <MemoBox memo={data.memo || ""} clickUpdate={() => {}} />
    </div>
  );
};

export default DetailInfoSummaryBox;
