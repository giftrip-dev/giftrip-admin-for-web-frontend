import { LoadIcon } from "@/components/shared/loading/loading";
import { CouponTable } from "./coupon-table";
import { CouponScope, CouponType } from "@/app/api/dto/coupon";
import { useGetCouponList } from "@/hooks/coupon/use-get-coupon-list";
import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  getPageFromSearchParams,
  getUpdatedSearchWithPage,
} from "@/util/pagination";

interface CouponTableContainerProps {
  keyword: string; // 검색어
  category: string; // 카테고리 (상품 카테고리)
  scope: string; // 사용 범위
  duration: { start?: Date; end?: Date }; // 생성 일자
  isActive: string; // 판매 상태
  isExpired: string; // 만료 상태
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const CouponTableContainer = ({
  keyword,
  category,
  scope,
  duration,
  isActive,
  isExpired,
  currentPage,
  setCurrentPage,
}: CouponTableContainerProps) => {
  const prev = useSearchParams().get("prev") ?? "1";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetCouponList({
    page: currentPage,
    itemType: category as CouponType,
    scope: scope as CouponScope,
    limit: 5,
    search: keyword,
    validFrom: duration?.start?.toISOString(),
    validTo: duration?.end?.toISOString(),
    isExpired:
      isExpired === "true" ? true : isExpired === "false" ? false : undefined,
    isActive:
      isActive === "true" ? true : isActive === "false" ? false : undefined,
  });

  // prev로 현재 페이지 초기화
  useEffect(() => {
    const page = getPageFromSearchParams(searchParams);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParams, currentPage, setCurrentPage]);

  // 페이지 변경 시 URL 업데이트
  const handlePageChange = useCallback(
    (next: React.SetStateAction<number>) => {
      const newPage = typeof next === "function" ? next(currentPage) : next;
      setCurrentPage(newPage);
      const newSearch = getUpdatedSearchWithPage(searchParams, newPage);
      router.replace(`${pathname}?${newSearch}`);
    },
    [searchParams, pathname, router, setCurrentPage, currentPage],
  );

  if (!data) return <LoadIcon />;

  return (
    <CouponTable
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={handlePageChange}
      prev={prev}
    />
  );
};
export default CouponTableContainer;
