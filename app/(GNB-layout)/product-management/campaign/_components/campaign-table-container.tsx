import { CampaignTable } from "./campaign-table";
import { LoadIcon } from "@/components/shared/loading/loading";
import { useGetCampaignProductList } from "@/hooks/campaign/use-get-campaign-product-list";
import { CampaignCategory } from "@/app/api/dto/campaign";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";
import {
  getPageFromSearchParams,
  getUpdatedSearchWithPage,
} from "@/util/pagination";

interface CampaignTableContainerProps {
  keyword: string; // 검색어
  exposureTag: string; // 진열 태그
  category: string; // 상세 분류
  duration: { start?: Date; end?: Date }; // 생성 일자
  isActive: string; // 판매 상태
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const CampaignTableContainer = ({
  keyword,
  category,
  currentPage,
  exposureTag,
  duration,
  isActive,
  setCurrentPage,
}: CampaignTableContainerProps) => {
  const prev = useSearchParams().get("prev") || "1";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetCampaignProductList({
    page: currentPage,
    limit: 10,
    search: keyword,
    category: category as CampaignCategory,
    exposureTags: exposureTag,
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

  // 데이터 로딩 중 로딩 아이콘 표시
  if (!data) return <LoadIcon />;

  return (
    <CampaignTable
      prev={prev}
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={handlePageChange}
    />
  );
};
export default CampaignTableContainer;
