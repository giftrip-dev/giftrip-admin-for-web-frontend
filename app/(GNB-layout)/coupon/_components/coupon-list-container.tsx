"use client";
import { useState } from "react";
import Loading from "@/components/shared/loading/loading";
import CouponFilterBox from "./coupon-filter-box";
import CouponTableContainer from "./coupon-table-container";

const CouponListContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [category, setCategory] = useState("all"); // 카테고리 (상품 카테고리)
  const [scope, setScope] = useState("all"); // 사용 범위
  const [isActive, setIsActive] = useState("all"); // 활성화 여부
  const [isExpired, setIsExpired] = useState("all"); // 만료 여부
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 쿠폰 적용 기간

  // todo: 이전 페이지 로직 확인하기
  // useEffect(() => {
  //   if (prev) {
  //     setCurrentPage(Number(prev));
  //   }
  // }, [prev, setCurrentPage]);

  const filterProps = {
    keyword,
    category,
    scope,
    isActive,
    isExpired,
    duration,
    currentPage,
    setCurrentPage,
    setKeyword,
    setCategory,
    setScope,
    setDuration,
    setIsActive,
    setIsExpired,
  };

  return (
    <div className="mt-8 flex flex-col gap-10 overflow-x-auto">
      <CouponFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[600px]">
        <Loading>
          <CouponTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default CouponListContainer;
