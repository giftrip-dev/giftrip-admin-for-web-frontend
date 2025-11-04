"use client";
import { useState } from "react";
import ExperienceTableContainer from "./table-container";
import Loading from "@/components/shared/loading/loading";
import ExperienceFilterBox from "./experience-filter-box";
import { ExperienceCategory } from "@/app/api/dto/experience";
import { ReservationStatus } from "@/app/api/dto/reservation";

const ExperienceReservationContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [category, setCategory] = useState<ExperienceCategory | "all">("all"); // 카테고리
  const [status, setStatus] = useState<ReservationStatus | "all">("all"); // 예약 상태
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 체험 예약 이용 날짜

  const filterProps = {
    keyword,
    category,
    status,
    duration,
    currentPage,
    setCurrentPage,
    setKeyword,
    setDuration,
    setCategory,
    setStatus,
  };

  return (
    <div className="flex flex-col gap-10 overflow-x-auto">
      <ExperienceFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[600px]">
        <Loading>
          <ExperienceTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default ExperienceReservationContainer;
