"use client";
import { useState } from "react";
import Loading from "@/components/shared/loading/loading";
import SubBannerTableContainer from "./sub-banner-table-container";
import SubBannerFilterBox from "./sub-banner-filter-box";

const SubBannerContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [isActive, setIsActive] = useState("all"); // 활성화 여부
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 생성 일자

  const filterProps = {
    isActive,
    duration,
    currentPage,
    setCurrentPage,
    setDuration,
    setIsActive,
  };

  return (
    <div className="mt-8 flex flex-col gap-10 overflow-x-auto">
      <SubBannerFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[550px]">
        <Loading>
          <SubBannerTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default SubBannerContainer;
