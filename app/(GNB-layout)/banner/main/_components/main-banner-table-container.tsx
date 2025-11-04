import { LoadIcon } from "@/components/shared/loading/loading";
import { MainBannerTable } from "./main-banner-table";
import { useGetBannerList } from "@/hooks/banner/use-get-banner-list";
import { BannerCategory, BannerOrder, BannerType } from "@/app/api/dto/banner";
import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  getPageFromSearchParams,
  getUpdatedSearchWithPage,
} from "@/util/pagination";

interface MainBannerTableContainerProps {
  keyword: string; // 검색어
  order: string; // 출력 순서
  category: string; // 상세 분류
  duration: { start?: Date; end?: Date }; // 생성 일자
  isActive: string; // 판매 상태
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const MainBannerTableContainer = ({
  keyword,
  category,
  currentPage,
  order,
  duration,
  isActive,
  setCurrentPage,
}: MainBannerTableContainerProps) => {
  const prev = useSearchParams().get("prev") ?? "1";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetBannerList({
    page: currentPage,
    type: BannerType.MAIN,
    limit: 5,
    search: keyword,
    itemType: category as BannerCategory,
    orderDirection: order as BannerOrder,
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
    <MainBannerTable
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={handlePageChange}
      prev={prev}
    />
  );
};
export default MainBannerTableContainer;
