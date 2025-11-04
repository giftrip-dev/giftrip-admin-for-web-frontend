"use client";
import { useEffect, useState } from "react";
import ShoppingTableContainer from "./shopping-table-container";
import Loading from "@/components/shared/loading/loading";
import ShoppingFilterBox from "./shopping-filter-box";
import { useSearchParams } from "next/navigation";

const ShoppingProductContainer = () => {
  const prev = useSearchParams().get("prev") || "1";
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [category, setCategory] = useState("all"); // 상세 분류
  const [exposureTag, setExposureTag] = useState("all"); // 진열 태그
  const [isActive, setIsActive] = useState("all"); // 활성화 여부
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 생성 일자

  // 이전 페이지 정보로 현재 페이지 업데이트
  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    } else {
      setCurrentPage(1);
    }
  }, [prev, setCurrentPage]);

  const filterProps = {
    keyword,
    category,
    exposureTag,
    isActive,
    duration,
    currentPage,
    setCurrentPage,
    setKeyword,
    setCategory,
    setExposureTag,
    setDuration,
    setIsActive,
  };

  return (
    <div className="flex flex-col gap-10 overflow-x-auto">
      <ShoppingFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[600px]">
        <Loading>
          <ShoppingTableContainer prev={prev} {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default ShoppingProductContainer;
