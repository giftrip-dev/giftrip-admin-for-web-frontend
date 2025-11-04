import { ExperienceCategory } from "@/app/api/dto/experience";
import { ExperienceTable } from "./experience-table";
import { LoadIcon } from "@/components/shared/loading/loading";
import { useGetExperienceReservationList } from "@/hooks/reservation/use-get-experience-reservation-list";
import { ReservationStatus } from "@/app/api/dto/reservation";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";
import {
  getPageFromSearchParams,
  getUpdatedSearchWithPage,
} from "@/util/pagination";

interface ExperienceTableContainerProps {
  keyword: string; // 검색어
  duration: { start?: Date; end?: Date }; // 체험 날짜
  currentPage: number; // 현재 페이지
  category: ExperienceCategory | "all"; // 카테고리
  status: ReservationStatus | "all"; // 예약 상태
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const ExperienceTableContainer = ({
  keyword,
  currentPage,
  duration,
  category,
  status,
  setCurrentPage,
}: ExperienceTableContainerProps) => {
  const prev = useSearchParams().get("prev") ?? "1";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetExperienceReservationList({
    page: currentPage,
    limit: 10,
    category: category === "all" ? undefined : category,
    search: keyword,
    experienceDateStart: duration?.start?.toISOString(),
    experienceDateEnd: duration?.end?.toISOString(),
    status: status === "all" ? undefined : status,
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
    <ExperienceTable
      prev={prev}
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={handlePageChange}
    />
  );
};
export default ExperienceTableContainer;
