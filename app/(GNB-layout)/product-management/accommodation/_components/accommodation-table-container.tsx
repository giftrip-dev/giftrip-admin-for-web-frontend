import {
  AccommodationCategory,
  AccommodationMainLocation,
  AccommodationSubLocation,
} from "@/app/api/dto/accommodation";
import { AccommodationTable } from "./accommodation-table";
import { LoadIcon } from "@/components/shared/loading/loading";
import { useGetAccommodationProductList } from "@/hooks/accommodation/use-get-accommodation-product-list";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";
import {
  getPageFromSearchParams,
  getUpdatedSearchWithPage,
} from "@/util/pagination";

interface AccommodationTableContainerProps {
  keyword: string; // 검색어
  category: string; // 상세 분류
  mainLocation: string; // 대분류
  subLocation: string; // 소분류
  duration: { start?: Date; end?: Date }; // 생성 일자
  isActive: string; // 판매 상태
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const AccommodationTableContainer = ({
  keyword,
  category,
  currentPage,
  mainLocation,
  subLocation,
  duration,
  isActive,
  setCurrentPage,
}: AccommodationTableContainerProps) => {
  const prev = useSearchParams().get("prev") || "1";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetAccommodationProductList({
    page: currentPage,
    limit: 10,
    search: keyword,
    category: category as AccommodationCategory,
    mainLocation: mainLocation as AccommodationMainLocation,
    subLocation: subLocation as AccommodationSubLocation,
    createdAtStart: duration?.start?.toISOString(),
    createdAtEnd: duration?.end?.toISOString(),
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
    <AccommodationTable
      prev={prev}
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={handlePageChange}
    />
  );
};
export default AccommodationTableContainer;
