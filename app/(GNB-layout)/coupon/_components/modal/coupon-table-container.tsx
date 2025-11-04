import { LoadIcon } from "@/components/shared/loading/loading";
import { CouponScope, CouponItem } from "@/app/api/dto/coupon";
import { useGetCouponList } from "@/hooks/coupon/use-get-coupon-list";
import { CouponTable } from "./coupon-table";
import { ProductType } from "@/constants/product";

interface CouponTableContainerProps {
  keyword: string; // 검색어
  duration: { start?: Date; end?: Date }; // 생성 일자
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
  setSelectedCouponId: React.Dispatch<React.SetStateAction<string | null>>; // 선택된 쿠폰 ID 설정
  setSelectedCoupon: React.Dispatch<React.SetStateAction<CouponItem | null>>; // 선택된 쿠폰 정보 설정
  selectedCouponId: string | null; // 선택된 쿠폰 ID
  scope?: CouponScope; // 쿠폰 적용 대상
  itemType?: ProductType;
}

const CouponTableContainer = ({
  keyword,
  duration,
  currentPage,
  setCurrentPage,
  setSelectedCouponId,
  setSelectedCoupon,
  selectedCouponId,
  scope = CouponScope.INDIVIDUAL_CUSTOMER,
  itemType,
}: CouponTableContainerProps) => {
  const { data } = useGetCouponList({
    page: currentPage,
    limit: 5,
    search: keyword,
    scope,
    isExpired: false,
    validFrom: duration?.start?.toISOString(),
    validTo: duration?.end?.toISOString(),
    itemType,
  });

  if (!data) return <LoadIcon />;

  return (
    <CouponTable
      selectedCouponId={selectedCouponId}
      setSelectedCouponId={setSelectedCouponId}
      setSelectedCoupon={setSelectedCoupon}
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={setCurrentPage}
    />
  );
};
export default CouponTableContainer;
