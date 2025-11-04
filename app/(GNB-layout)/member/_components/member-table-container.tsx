import { LoadIcon } from "@/components/shared/loading/loading";
import { MemberTable } from "./member-table";
import { useGetMemberList } from "@/hooks/member/use-get-member-list";
import { useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  getPageFromSearchParams,
  getUpdatedSearchWithPage,
} from "@/util/pagination";

interface MemberTableContainerProps {
  keyword: string; // 검색어
  memberType: string; // 회원 유형
  duration: { start?: Date; end?: Date }; // 생성 일자
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const MemberTableContainer = ({
  keyword,
  memberType,
  currentPage,
  duration,
  setCurrentPage,
}: MemberTableContainerProps) => {
  const prev = useSearchParams().get("prev") ?? "1";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetMemberList({
    page: currentPage,
    limit: 10,
    search: keyword,
    isInfluencer: memberType,
    createdAtStart: duration?.start?.toISOString(),
    createdAtEnd: duration?.end?.toISOString(),
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
    <MemberTable
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={handlePageChange}
      prev={prev}
    />
  );
};
export default MemberTableContainer;
