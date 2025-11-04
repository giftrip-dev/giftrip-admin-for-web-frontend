"use client";
import { useState } from "react";
import AccommodationTableContainer from "./table-container";
import Loading from "@/components/shared/loading/loading";
import AccommodationFilterBox from "./accommodation-filter-box";

const AccommodationReviewContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [isActive, setIsActive] = useState("all"); // 활성화 여부
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 생성 일자

  // todo: 이전 페이지 로직 확인하기
  // useEffect(() => {
  //   if (prev) {
  //     setCurrentPage(Number(prev));
  //   }
  // }, [prev, setCurrentPage]);

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
      <AccommodationFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[600px]">
        <Loading>
          <AccommodationTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default AccommodationReviewContainer;
