import { ExperienceCategory } from "@/app/api/dto/experience";
import { ExperienceTable } from "./experience-table";
import { LoadIcon } from "@/components/shared/loading/loading";
import { useGetExperienceProductList } from "@/hooks/experience/use-get-experience-product-list";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";
import {
  getPageFromSearchParams,
  getUpdatedSearchWithPage,
} from "@/util/pagination";

interface ExperienceTableContainerProps {
  keyword: string; // 검색어
  exposureTag: string; // 진열 태그
  category: string; // 상세 분류
  duration: { start?: Date; end?: Date }; // 생성 일자
  isActive: string; // 판매 상태
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const ExperienceTableContainer = ({
  keyword,
  category,
  currentPage,
  exposureTag,
  duration,
  isActive,
  setCurrentPage,
}: ExperienceTableContainerProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useGetExperienceProductList({
    page: currentPage,
    limit: 10,
    search: keyword,
    category: category as ExperienceCategory,
    exposureTag: exposureTag,
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
      prev={String(currentPage)}
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={handlePageChange}
    />
  );
};
export default ExperienceTableContainer;
