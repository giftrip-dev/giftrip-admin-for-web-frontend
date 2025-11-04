import ShortRow from "@/app/_components/table/short-row";
import { CampaignReservationItem } from "@/app/api/dto/reservation";

interface ProductInfoBoxProps {
  data: CampaignReservationItem;
}

const ProductInfoBox = ({ data }: ProductInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">예약 상품 정보</p>
      <div>
        <ShortRow size="sm" label="상품명" value={data.itemTitle} />
        <ShortRow size="sm" label="장소" value={data.address || "-"} />
        <ShortRow size="sm" label="설명" value={data.description || "-"} />
        <ShortRow
          size="sm"
          label="담당자 연락처"
          value={data.managerPhoneNumber || "-"}
        />
        <ShortRow
          isLastRow
          size="sm"
          label="관련 링크"
          value={data.relatedLink || "-"}
        />
      </div>
    </div>
  );
};

export default ProductInfoBox;
