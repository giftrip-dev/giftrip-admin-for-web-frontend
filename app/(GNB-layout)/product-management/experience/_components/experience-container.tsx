"use client";
import { useState } from "react";
import ExperienceTableContainer from "./table-container";
import Loading from "@/components/shared/loading/loading";
import ExperienceFilterBox from "./experience-filter-box";

const ExperienceProductContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [category, setCategory] = useState("all"); // 상세 분류
  const [exposureTag, setExposureTag] = useState("all"); // 진열 태그
  const [isActive, setIsActive] = useState("all"); // 활성화 여부
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 생성 일자

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
      <ExperienceFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[600px]">
        <Loading>
          <ExperienceTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default ExperienceProductContainer;
