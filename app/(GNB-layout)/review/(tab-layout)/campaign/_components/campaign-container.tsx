"use client";
import { useState } from "react";
import CampaignTableContainer from "./table-container";
import Loading from "@/components/shared/loading/loading";
import CampaignFilterBox from "./campaign-filter-box";

const CampaignReviewContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [isActive, setIsActive] = useState("all"); // 활성화 여부
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 생성 일자

  const filterProps = {
    keyword,
    isActive,
    duration,
    currentPage,
    setCurrentPage,
    setKeyword,
    setDuration,
    setIsActive,
  };

  return (
    <div className="flex flex-col gap-10 overflow-x-auto">
      <CampaignFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[600px]">
        <Loading>
          <CampaignTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default CampaignReviewContainer;
