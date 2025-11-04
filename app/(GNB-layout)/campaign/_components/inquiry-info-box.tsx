import { Textarea } from "@/components/ui/textarea";
import { CampaignItem } from "@/app/api/dto/campaign";

interface InquiryInfoBoxProps {
  data: CampaignItem;
}

const InquiryInfoBox = ({ data }: InquiryInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">문의 사항</p>
      <Textarea readOnly className="min-h-[200px]" value={data.inquiryInfo} />
    </div>
  );
};

export default InquiryInfoBox;
