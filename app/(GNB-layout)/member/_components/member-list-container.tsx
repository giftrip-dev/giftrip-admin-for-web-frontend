"use client";
import { useState } from "react";
import Loading from "@/components/shared/loading/loading";
import MemberFilterBox from "./member-filter-box";
import MemberTableContainer from "./member-table-container";
import { MemberType } from "@/app/api/dto/member";

const MemberListContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [memberType, setMemberType] = useState(MemberType.ALL); // 회원 유형
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
    memberType,
    duration,
    currentPage,
    setCurrentPage,
    setKeyword,
    setDuration,
    setMemberType,
  };

  return (
    <div className="mt-8 flex flex-col gap-10 overflow-x-auto">
      <MemberFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[600px]">
        <Loading>
          <MemberTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default MemberListContainer;
