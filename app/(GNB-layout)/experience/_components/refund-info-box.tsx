import { Textarea } from "@/components/ui/textarea";
import { ExperienceItem } from "@/app/api/dto/experience";

interface RefundInfoBoxProps {
  data: ExperienceItem;
}

const RefundInfoBox = ({ data }: RefundInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">취소 및 환불</p>
      <Textarea readOnly className="min-h-[210px]" value={data.changeInfo} />
    </div>
  );
};

export default RefundInfoBox;
