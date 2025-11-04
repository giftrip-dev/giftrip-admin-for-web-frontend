import { Textarea } from "@/components/ui/textarea";
import { ShoppingItem } from "@/app/api/dto/shopping";

interface RefundInfoBoxProps {
  data: ShoppingItem;
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
