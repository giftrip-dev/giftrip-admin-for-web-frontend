"use client";
import { useState } from "react";
import AccommodationTableContainer from "./accommodation-table-container";
import Loading from "@/components/shared/loading/loading";
import AccommodationFilterBox from "./accommodation-filter-box";

const AccommodationProductContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [category, setCategory] = useState("all"); // 상세 분류
  const [mainLocation, setMainLocation] = useState("all"); // 대분류
  const [subLocation, setSubLocation] = useState("all"); // 소분류
  const [isActive, setIsActive] = useState("all"); // 활성화 여부
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 생성 일자

  const filterProps = {
    keyword,
    category,
    mainLocation,
    subLocation,
    isActive,
    duration,
    currentPage,
    setCurrentPage,
    setKeyword,
    setCategory,
    setMainLocation,
    setSubLocation,
    setDuration,
    setIsActive,
  };

  return (
    <div className="flex flex-col gap-10 overflow-x-auto">
      <AccommodationFilterBox {...filterProps} />
      <div className="relative min-h-[250px]">
        <Loading>
          <AccommodationTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default AccommodationProductContainer;
