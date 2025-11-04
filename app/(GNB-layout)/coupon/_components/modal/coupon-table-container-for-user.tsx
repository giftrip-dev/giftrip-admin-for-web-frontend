import { LoadIcon } from "@/components/shared/loading/loading";
import { CouponScope } from "@/app/api/dto/coupon";
import { useGetCouponList } from "@/hooks/coupon/use-get-coupon-list";
import { CouponTableForUser } from "./coupon-table-for-user";

interface CouponTableContainerProps {
  keyword: string; // 검색어
  duration: { start?: Date; end?: Date }; // 생성 일자
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
  setSelectedCouponId: React.Dispatch<React.SetStateAction<string | null>>; // 선택된 쿠폰 ID 설정
  selectedCouponId: string | null; // 선택된 쿠폰 ID
  scope?: CouponScope; // 쿠폰 적용 대상
}

const CouponTableContainerForUser = ({
  keyword,
  duration,
  currentPage,
  setCurrentPage,
  setSelectedCouponId,
  selectedCouponId,
  scope = CouponScope.INDIVIDUAL_CUSTOMER,
}: CouponTableContainerProps) => {
  const { data } = useGetCouponList({
    page: currentPage,
    limit: 5,
    search: keyword,
    scope,
    isExpired: false,
    validFrom: duration?.start?.toISOString(),
    validTo: duration?.end?.toISOString(),
  });

  if (!data) {
    return <LoadIcon />;
  }

  return (
    <CouponTableForUser
      selectedCouponId={selectedCouponId}
      setSelectedCouponId={setSelectedCouponId}
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={setCurrentPage}
    />
  );
};
export default CouponTableContainerForUser;
