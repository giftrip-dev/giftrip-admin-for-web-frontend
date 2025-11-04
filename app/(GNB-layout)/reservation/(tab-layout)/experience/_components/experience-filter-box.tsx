import { Dispatch, SetStateAction } from "react";
import SearchBar from "@/app/_components/search-bar";
import DurationBox from "@/app/_components/duration-box";
import { ExperienceCategory } from "@/app/api/dto/experience";
import SelectBox from "@/app/_components/select-box";
import { EXPERIENCE_CATEGORY_ARRAY } from "@/constants/experience";
import { ReservationStatus } from "@/app/api/dto/reservation";
import { RESERVATION_STATUS_ARRAY } from "@/constants/reservation";
import CheckBox from "@/app/_components/check-box";

interface ExperienceFilterBoxProps {
  keyword: string;
  duration: { start?: Date; end?: Date };
  category: ExperienceCategory | "all";
  status: ReservationStatus | "all";
  setCurrentPage: Dispatch<SetStateAction<number>>; // 페이지 업데이트 함수
  setKeyword: (val: string) => void; // 검색어 업데이트 함수
  setDuration: Dispatch<SetStateAction<{ start?: Date; end?: Date }>>; // 생성일자 업데이트 함수
  setCategory: Dispatch<SetStateAction<ExperienceCategory | "all">>; // 카테고리 업데이트 함수
  setStatus: Dispatch<SetStateAction<ReservationStatus | "all">>; // 예약 상태 업데이트 함수
}

const ExperienceFilterBox = ({
  keyword,
  duration,
  category,
  status,
  setCurrentPage,
  setKeyword,
  setDuration,
  setCategory,
  setStatus,
}: ExperienceFilterBoxProps) => {
  // 체험 이용 일자 변경 핸들러
  const changeDuration = (start?: Date, end?: Date) => {
    setDuration({ start, end });
    setCurrentPage(1);
  };

  // 검색어 변경 핸들러
  const changeKeyword = (newKeyword: string) => {
    setKeyword(newKeyword);
    setCurrentPage(1);
  };

  // 카테고리 변경 핸들러
  const changeCategory = (newCategory: string) => {
    setCategory(newCategory as ExperienceCategory | "all");
    setCurrentPage(1);
  };

  // 예약 상태 변경 핸들러
  const changeStatus = (newStatus: string) => {
    setStatus(newStatus as ReservationStatus | "all");
    setCurrentPage(1);
  };

  // 모든 필터 초기화 핸들러
  const resetAllFilters = () => {
    setCurrentPage(1);
    setKeyword("");
    setDuration({ start: undefined, end: undefined });
    setCategory("all");
    setStatus("all");
  };

  return (
    <div className="w-full min-w-[600px]">
      <SearchBar
        placeholder="상품명"
        keyword={keyword}
        setKeyword={changeKeyword}
        resetAllFilters={resetAllFilters}
      />
      <SelectBox
        label="상세 분류"
        conditions={EXPERIENCE_CATEGORY_ARRAY}
        value={category}
        handleChangeValue={changeCategory}
      />
      <DurationBox
        handleFilterChange={changeDuration}
        filterName="예약 일자"
        duration={duration}
      />
      <CheckBox
        label="예약 상태"
        conditions={RESERVATION_STATUS_ARRAY}
        value={status}
        handleChangeValue={changeStatus}
      />
    </div>
  );
};

export default ExperienceFilterBox;
