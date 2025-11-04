import { ExperienceTable } from "./experience-table";
import { LoadIcon } from "@/components/shared/loading/loading";
import { PRODUCT_TYPES } from "@/constants/product";
import { useGetExperienceReviewList } from "@/hooks/review/use-get-experience-review-list";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";
import {
  getPageFromSearchParams,
  getUpdatedSearchWithPage,
} from "@/util/pagination";

interface ExperienceTableContainerProps {
  keyword: string; // 검색어
  duration: { start?: Date; end?: Date }; // 생성 일자
  isActive: string; // 판매 상태
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const ExperienceTableContainer = ({
  keyword,
  currentPage,
  duration,
  isActive,
  setCurrentPage,
}: ExperienceTableContainerProps) => {
  const prev = useSearchParams().get("prev") ?? "1";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetExperienceReviewList({
    page: currentPage,
    limit: 10,
    itemType: PRODUCT_TYPES.EXPERIENCE,
    search: keyword,
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
    <ExperienceTable
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={handlePageChange}
      prev={prev}
    />
  );
};
export default ExperienceTableContainer;
