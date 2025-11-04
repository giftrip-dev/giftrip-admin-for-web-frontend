import { AccommodationCategory } from "@/app/api/dto/accommodation";
import { AccommodationTable } from "./accommodation-table";
import { LoadIcon } from "@/components/shared/loading/loading";
import {
  AccommodationMatchingStatus,
  ReservationStatus,
} from "@/app/api/dto/reservation";
import { useGetAccommodationReservationList } from "@/hooks/reservation/use-get-accommodation-reservation-list";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";
import {
  getPageFromSearchParams,
  getUpdatedSearchWithPage,
} from "@/util/pagination";

interface AccommodationTableContainerProps {
  keyword: string; // 검색어
  duration: { start?: Date; end?: Date }; // 체험 날짜
  currentPage: number; // 현재 페이지
  category: AccommodationCategory; // 카테고리
  status: ReservationStatus; // 예약 상태
  matchingStatus: AccommodationMatchingStatus; // 매칭 상태
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const AccommodationTableContainer = ({
  keyword,
  currentPage,
  duration,
  category,
  status,
  matchingStatus,
  setCurrentPage,
}: AccommodationTableContainerProps) => {
  const prev = useSearchParams().get("prev") ?? "1";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetAccommodationReservationList({
    page: currentPage,
    limit: 10,
    category: category === AccommodationCategory.ALL ? undefined : category,
    search: keyword,
    checkInDateStart: duration?.start?.toISOString(),
    checkInDateEnd: duration?.end?.toISOString(),
    status: status === ReservationStatus.ALL ? undefined : status,
    matchingStatus:
      matchingStatus === AccommodationMatchingStatus.ALL
        ? undefined
        : matchingStatus,
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
