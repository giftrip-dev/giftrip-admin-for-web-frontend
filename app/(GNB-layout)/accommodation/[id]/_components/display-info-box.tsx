import ShortRow from "@/app/_components/table/short-row";
import { AccommodationItem } from "@/app/api/dto/accommodation";

interface DisplayInfoBoxProps {
  data: AccommodationItem;
}

const DisplayInfoBox = ({ data }: DisplayInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">표시 설정</p>
      <div>
        <ShortRow
          isLastRow
          size="md"
          label="판매 상태"
          value={data.isActive ? "판매 중" : "판매 중지"}
        />
      </div>
    </div>
  );
};

export default DisplayInfoBox;
