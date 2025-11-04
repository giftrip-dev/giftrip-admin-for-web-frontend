import { Dispatch, SetStateAction } from "react";
import SearchBar from "@/app/_components/search-bar";
import DurationBox from "@/app/_components/duration-box";

interface CouponFilterBoxProps {
  keyword: string;
  duration: { start?: Date; end?: Date };
  setCurrentPage: Dispatch<SetStateAction<number>>; // 페이지 업데이트 함수
  setKeyword: (val: string) => void; // 검색어 업데이트 함수
  setDuration: Dispatch<SetStateAction<{ start?: Date; end?: Date }>>; // 생성일자 업데이트 함수
}

const CouponFilterBox = ({
  keyword,
  duration,
  setCurrentPage,
  setKeyword,
  setDuration,
}: CouponFilterBoxProps) => {
  // 생성 일자 변경 핸들러
  const changeDuration = (start?: Date, end?: Date) => {
    setDuration({ start, end });
    setCurrentPage(1);
  };

  // 검색어 변경 핸들러
  const changeKeyword = (newKeyword: string) => {
    setKeyword(newKeyword);
    setCurrentPage(1);
  };

  // 모든 필터 초기화 핸들러
  const resetAllFilters = () => {
    setCurrentPage(1);
    setKeyword("");
    setDuration({ start: undefined, end: undefined });
  };

  return (
    <div className="w-full min-w-[600px]">
      <SearchBar
        placeholder="쿠폰명"
        keyword={keyword}
        setKeyword={changeKeyword}
        resetAllFilters={resetAllFilters}
      />
      <DurationBox
        handleFilterChange={changeDuration}
        filterName="생성 일자"
        duration={duration}
      />
    </div>
  );
};

export default CouponFilterBox;
