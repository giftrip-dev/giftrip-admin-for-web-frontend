import AppliedCouponTable from "@/app/_components/table/applied-coupon-table";
import ShortRow from "@/app/_components/table/short-row";
import { AccommodationItem } from "@/app/api/dto/accommodation";
import { commaWithUnit } from "@/util/price";

interface PriceInfoBoxProps {
  data: AccommodationItem;
}

const PriceInfoBox = ({ data }: PriceInfoBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">가격 정보</p>
      <div>
        <ShortRow
          size="md"
          label="판매가"
          value={commaWithUnit(data.originalPrice, "원")}
        />
        <ShortRow size="md" label="할인" value={`${data.discountRate}%`}>
          <div className="w-full py-4">
            <AppliedCouponTable coupon={data.appliedCoupon || null} />
          </div>
        </ShortRow>
        <ShortRow
          isLastRow
          size="md"
          label="할인가"
          value={commaWithUnit(data.finalPrice, "원")}
        />
      </div>
    </div>
  );
};

export default PriceInfoBox;
