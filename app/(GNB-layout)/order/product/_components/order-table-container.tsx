"use client";
import { LoadIcon } from "@/components/shared/loading/loading";
import { OrderTable } from "./order-table";
import { useGetOrderList } from "@/hooks/order/use-get-order-list";
import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  getPageFromSearchParams,
  getUpdatedSearchWithPage,
} from "@/util/pagination";

interface OrderTableContainerProps {
  keyword: string; // 검색어
  duration: { start?: Date; end?: Date }; // 생성 일자
  currentPage: number; // 현재 페이지
  deliveryStatus: string; // 배송 상태
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const OrderTableContainer = ({
  keyword,
  currentPage,
  duration,
  deliveryStatus,
  setCurrentPage,
}: OrderTableContainerProps) => {
  const prev = useSearchParams().get("prev") ?? "1";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useGetOrderList({
    page: currentPage,
    limit: 5,
    search: keyword,
    createdAtStart: duration?.start?.toISOString(),
    createdAtEnd: duration?.end?.toISOString(),
    deliveryStatus,
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
    <OrderTable
      data={data.items}
      prev={prev}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={handlePageChange}
    />
  );
};
export default OrderTableContainer;
