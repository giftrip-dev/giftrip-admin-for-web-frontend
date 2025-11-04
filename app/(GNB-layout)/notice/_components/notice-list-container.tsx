"use client";
import { useState } from "react";
import Loading from "@/components/shared/loading/loading";
import NoticeFilterBox from "./notice-filter-box";
import NoticeTableContainer from "./notice-table-container";

const NoticeListContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [type, setType] = useState("all"); // 유형 (공지사항, 이벤트)
  const [isActive, setIsActive] = useState("all"); // 활성화 여부
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 생성 일자

  const filterProps = {
    keyword,
    type,
    isActive,
    duration,
    currentPage,
    setCurrentPage,
    setKeyword,
    setType,
    setDuration,
    setIsActive,
  };

  return (
    <div className="mt-8 flex flex-col gap-10 overflow-x-auto">
      <NoticeFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[600px]">
        <Loading>
          <NoticeTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default NoticeListContainer;
