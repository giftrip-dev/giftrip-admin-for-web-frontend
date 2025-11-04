import { Dispatch, SetStateAction } from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import DurationBox from "@/app/_components/duration-box";
import { PRODUCT_SALE_STATUS_ARRAY } from "@/constants/product";
import SelectBox from "../../../../_components/select-box";
import { ACCOMMODATION_CATEGORY_ARRAY } from "@/constants/accommodation";

interface AccommodationFilterBoxProps {
  keyword: string;
  category: string;
  mainLocation: string;
  subLocation: string;
  duration: { start?: Date; end?: Date };
  isActive: string;
  setCurrentPage: Dispatch<SetStateAction<number>>; // 페이지 업데이트 함수
  setKeyword: (val: string) => void; // 검색어 업데이트 함수
  setCategory: (val: string) => void; // 상세 분류 업데이트 함수
  setDuration: Dispatch<SetStateAction<{ start?: Date; end?: Date }>>; // 생성일자 업데이트 함수
  setIsActive: Dispatch<SetStateAction<string>>; // 활성화 여부 업데이트 함수
}

const AccommodationFilterBox = ({
  keyword,
  category,
  // mainLocation,
  // subLocation,
  duration,
  isActive,
  setCurrentPage,
  setCategory,
  setKeyword,
  setDuration,
  setIsActive,
}: AccommodationFilterBoxProps) => {
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

  // 판매 상태 변경 핸들러
  const changeIsActive = (val: string) => {
    setIsActive(val);
    setCurrentPage(1);
  };

  // 상세 분류 변경 핸들러
  const changeCategory = (val: string) => {
    setCategory(val);
    setCurrentPage(1);
  };

  // 모든 필터 초기화 핸들러
  const resetAllFilters = () => {
    setCurrentPage(1);
    setKeyword("");
    setCategory("all");
    setDuration({ start: undefined, end: undefined });
    setIsActive("all");
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
        conditions={ACCOMMODATION_CATEGORY_ARRAY}
        handleChangeValue={changeCategory}
        value={category}
      />
      <DurationBox
        handleFilterChange={changeDuration}
        filterName="생성 일자"
        duration={duration}
      />

      <CheckBox
        label="판매 상태"
        conditions={PRODUCT_SALE_STATUS_ARRAY}
        value={isActive}
        handleChangeValue={changeIsActive}
      />
    </div>
  );
};

export default AccommodationFilterBox;
