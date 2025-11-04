import ShortRow from "@/app/_components/table/short-row";
import { CouponItem } from "@/app/api/dto/coupon";
import { COUPON_SCOPE_LABEL, COUPON_TYPE_LABEL } from "@/constants/coupon";
import formattedDate from "@/util/date";

const CouponInfoBox = ({ coupon }: { coupon: CouponItem }) => {
  const dateText =
    coupon.startDate && coupon.endDate
      ? `${formattedDate(coupon.startDate, "YYYY/MM/DD")} ~ ${formattedDate(coupon.endDate, "YYYY/MM/DD")}`
      : "기간 없음";
  return (
    <>
      <ShortRow
        size="md"
        label="활성화 상태"
        value={coupon.isActive ? "활성화" : "비활성화"}
      />
      <ShortRow
        size="md"
        label="사용 범위"
        value={COUPON_SCOPE_LABEL[coupon.scope]}
      />
      <ShortRow
        size="md"
        label="카테고리"
        value={COUPON_TYPE_LABEL[coupon.itemType]}
      />
      <ShortRow size="md" label="쿠폰명" value={coupon.name} />
      <ShortRow size="md" label="쿠폰 설명" value={coupon.description || ""} />
      <ShortRow size="md" label="할인율" value={`${coupon.discountRate}%`} />
      <ShortRow size="md" label="적용 기간" value={dateText} />
      <ShortRow
        isLastRow
        size="md"
        label="만료 여부"
        value={coupon.isExpired ? "만료" : "유효"}
      />
    </>
  );
};

export default CouponInfoBox;
