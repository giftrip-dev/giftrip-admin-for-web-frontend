import { Dispatch, SetStateAction } from "react";
import CheckBox from "@/app/_components/check-box";
import SearchBar from "@/app/_components/search-bar";
import DurationBox from "@/app/_components/duration-box";
import { MEMBER_TYPE_ARRAY } from "@/constants/member";
import { MemberType } from "@/app/api/dto/member";

interface MemberFilterBoxProps {
  keyword: string;
  memberType: MemberType;
  duration: { start?: Date; end?: Date };
  setCurrentPage: Dispatch<SetStateAction<number>>; // 페이지 업데이트 함수
  setKeyword: (val: string) => void; // 검색어 업데이트 함수
  setDuration: Dispatch<SetStateAction<{ start?: Date; end?: Date }>>; // 생성일자 업데이트 함수
  setMemberType: Dispatch<SetStateAction<MemberType>>; // 인플루언서 여부 업데이트 함수
}

const MemberFilterBox = ({
  keyword,
  memberType,
  duration,
  setCurrentPage,
  setKeyword,
  setDuration,
  setMemberType,
}: MemberFilterBoxProps) => {
  // 인플루언서 여부 변경 핸들러
  const changeMemberType = (val: string) => {
    setMemberType(val as MemberType);
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

  // 모든 필터 초기화 핸들러
  const resetAllFilters = () => {
    setCurrentPage(1);
    setKeyword("");
    setMemberType(MemberType.ALL);
    setDuration({ start: undefined, end: undefined });
  };

  return (
    <div className="w-full min-w-[600px]">
      <SearchBar
        placeholder="이름,이메일"
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
        label="회원 유형"
        conditions={MEMBER_TYPE_ARRAY}
        handleChangeValue={changeMemberType}
        value={memberType}
      />
    </div>
  );
};

export default MemberFilterBox;
