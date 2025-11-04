import ShortRow from "@/app/_components/table/short-row";
import { AccommodationReservationItem } from "@/app/api/dto/reservation";
import { ACCOMMODATION_CATEGORY_LABEL } from "@/constants/accommodation";
import { phoneNumberFormatter } from "@/util/number";

interface ProductInfoBoxProps {
  data: AccommodationReservationItem;
}

const ProductInfoBox = ({ data }: ProductInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">예약 상품 정보</p>
      <div>
        <ShortRow
          size="sm"
          label="상세분류"
          value={ACCOMMODATION_CATEGORY_LABEL[data.category]}
        />
        <ShortRow size="sm" label="업체명" value={data.accommodationName} />
        <ShortRow size="sm" label="객실명" value={data.roomName} />
        <ShortRow
          size="sm"
          label="담당자 연락처"
          value={
            data.managerPhoneNumber
              ? phoneNumberFormatter(data.managerPhoneNumber)
              : "-"
          }
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
