import { Dispatch, SetStateAction } from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import DurationBox from "@/app/_components/duration-box";
import { NOTICE_ACTIVE_ARRAY, NOTICE_TYPE_ARRAY } from "@/constants/notice";

interface NoticeFilterBoxProps {
  keyword: string;
  type: string;
  duration: { start?: Date; end?: Date };
  isActive: string;
  setCurrentPage: Dispatch<SetStateAction<number>>; // 페이지 업데이트 함수
  setKeyword: (val: string) => void; // 검색어 업데이트 함수
  setType: (val: string) => void; // 상세 분류 업데이트 함수
  setDuration: Dispatch<SetStateAction<{ start?: Date; end?: Date }>>; // 생성일자 업데이트 함수
  setIsActive: Dispatch<SetStateAction<string>>; // 활성화 여부 업데이트 함수
}

const NoticeFilterBox = ({
  keyword,
  type,
  duration,
  isActive,
  setCurrentPage,
  setKeyword,
  setType,
  setDuration,
  setIsActive,
}: NoticeFilterBoxProps) => {
  // 게시글 유형 변경 핸들러
  const changeType = (val: string) => {
    setType(val);
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

  // 판매 상태 변경 핸들러
  const changeIsActive = (val: string) => {
    setIsActive(val);
    setCurrentPage(1);
  };

  // 모든 필터 초기화 핸들러
  const resetAllFilters = () => {
    setCurrentPage(1);
    setKeyword("");
    setType("all");
    setDuration({ start: undefined, end: undefined });
    setIsActive("all");
  };

  return (
    <div className="w-full min-w-[600px]">
      <SearchBar
        placeholder="제목"
        keyword={keyword}
        setKeyword={changeKeyword}
        resetAllFilters={resetAllFilters}
      />
      <DurationBox
        handleFilterChange={changeDuration}
        filterName="생성 일자"
        duration={duration}
      />
      <CheckBox
        label="게시글 유형"
        conditions={NOTICE_TYPE_ARRAY}
        handleChangeValue={changeType}
        value={type}
      />
      <CheckBox
        label="공개 상태"
        conditions={NOTICE_ACTIVE_ARRAY}
        value={isActive}
        handleChangeValue={changeIsActive}
      />
    </div>
  );
};

export default NoticeFilterBox;
