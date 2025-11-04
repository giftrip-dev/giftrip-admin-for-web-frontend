"use client";
import { useState } from "react";
import Loading from "@/components/shared/loading/loading";
import MainBannerFilterBox from "./main-banner-filter-box";
import MainBannerTableContainer from "./main-banner-table-container";

const MainBannerContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [category, setCategory] = useState("all"); // 카테고리(홈, 체험 등)
  const [order, setOrder] = useState("all"); // 출력 순서
  const [isActive, setIsActive] = useState("all"); // 활성화 여부
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 생성 일자

  const filterProps = {
    keyword,
    category,
    order,
    isActive,
    duration,
    currentPage,
    setCurrentPage,
    setKeyword,
    setCategory,
    setOrder,
    setDuration,
    setIsActive,
  };

  return (
    <div className="mt-8 flex flex-col gap-10 overflow-x-auto">
      <MainBannerFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[600px]">
        <Loading>
          <MainBannerTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default MainBannerContainer;
