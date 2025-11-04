import { Dispatch, SetStateAction } from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import DurationBox from "@/app/_components/duration-box";
import {
  COUPON_ACTIVE_ARRAY,
  COUPON_EXPIRED_ARRAY,
  COUPON_SCOPE_ARRAY,
  COUPON_TYPE_ARRAY,
} from "@/constants/coupon";
import SelectBox from "@/app/_components/select-box";

interface CouponFilterBoxProps {
  keyword: string;
  category: string;
  scope: string;
  duration: { start?: Date; end?: Date };
  isActive: string;
  isExpired: string;
  setCurrentPage: Dispatch<SetStateAction<number>>; // 페이지 업데이트 함수
  setKeyword: (val: string) => void; // 검색어 업데이트 함수
  setCategory: (val: string) => void; // 카테고리 (상품 카테고리) 업데이트 함수
  setScope: (val: string) => void; // 사용 범위 업데이트 함수
  setDuration: Dispatch<SetStateAction<{ start?: Date; end?: Date }>>; // 생성일자 업데이트 함수
  setIsActive: Dispatch<SetStateAction<string>>; // 활성화 여부 업데이트 함수
  setIsExpired: Dispatch<SetStateAction<string>>; // 만료 여부 업데이트 함수
}

const CouponFilterBox = ({
  keyword,
  category,
  scope,
  duration,
  isActive,
  isExpired,
  setCurrentPage,
  setKeyword,
  setCategory,
  setScope,
  setDuration,
  setIsActive,
  setIsExpired,
}: CouponFilterBoxProps) => {
  // 사용 범위 변경 핸들러
  const changeScope = (val: string) => {
    setScope(val);
    setCurrentPage(1);
  };

  // 만료 여부 변경 핸들러
  const changeIsExpired = (val: string) => {
    setIsExpired(val);
    setCurrentPage(1);
  };

  // 카테고리 변경 핸들러
  const changeCategory = (val: string) => {
    setCategory(val);
    setCurrentPage(1);
  };

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

  // 활성화 여부 변경 핸들러
  const changeIsActive = (val: string) => {
    setIsActive(val);
    setCurrentPage(1);
  };

  // 모든 필터 초기화 핸들러
  const resetAllFilters = () => {
    setCurrentPage(1);
    setKeyword("");
    setCategory("all");
    setScope("all");
    setIsExpired("all");
    setDuration({ start: undefined, end: undefined });
    setIsActive("all");
  };

  return (
    <div className="w-full min-w-[600px]">
      <SearchBar
        placeholder="쿠폰명"
        keyword={keyword}
        setKeyword={changeKeyword}
        resetAllFilters={resetAllFilters}
      />
      <SelectBox
        label="카테고리"
        conditions={COUPON_TYPE_ARRAY}
        handleChangeValue={changeCategory}
        value={category}
      />
      <DurationBox
        handleFilterChange={changeDuration}
        filterName="적용 기간"
        duration={duration}
      />
      <CheckBox
        label="사용 범위"
        conditions={COUPON_SCOPE_ARRAY}
        handleChangeValue={changeScope}
        value={scope}
      />
      <CheckBox
        label="활성화 여부"
        conditions={COUPON_ACTIVE_ARRAY}
        value={isActive}
        handleChangeValue={changeIsActive}
      />
      <CheckBox
        label="만료 상태"
        conditions={COUPON_EXPIRED_ARRAY}
        value={isExpired}
        handleChangeValue={changeIsExpired}
      />
    </div>
  );
};

export default CouponFilterBox;
