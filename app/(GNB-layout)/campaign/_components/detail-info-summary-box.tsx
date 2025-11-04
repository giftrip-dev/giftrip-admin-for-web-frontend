import { CampaignItem } from "@/app/api/dto/campaign";
import MemoBox from "./memo-box";

const DetailInfoSummaryBox = ({ data }: { data: CampaignItem }) => {
  return (
    <div className="bg-[#32333C] px-8 pb-6 text-white">
      <div className="flex items-center gap-2">
        <p className="text-title-1">{`상품명 :`}</p>
        <p>{data.title}</p>
      </div>
      <MemoBox memo={data.memo || ""} clickUpdate={() => {}} />
    </div>
  );
};

export default DetailInfoSummaryBox;
