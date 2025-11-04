import ShortRow from "@/app/_components/table/short-row";
import { AccommodationItem } from "@/app/api/dto/accommodation";

interface StockInfoBoxProps {
  data: AccommodationItem;
}

const StockInfoBox = ({ data }: StockInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">재고 정보</p>
      <div>
        <ShortRow
          isLastRow
          size="md"
          label="당일 재고 수량"
          value={data.dailyStock}
        />
      </div>
    </div>
  );
};

export default StockInfoBox;
