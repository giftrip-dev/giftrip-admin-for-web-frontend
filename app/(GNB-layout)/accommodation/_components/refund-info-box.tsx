import { Textarea } from "@/components/ui/textarea";
import { AccommodationItem } from "@/app/api/dto/accommodation";

interface RefundInfoBoxProps {
  data: AccommodationItem;
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
