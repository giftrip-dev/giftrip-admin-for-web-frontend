"use client";

import { useState } from "react";
import Loading from "@/components/shared/loading/loading";
import AccommodationFilterBox from "./accommodation-filter-box";
import { AccommodationCategory } from "@/app/api/dto/accommodation";
import {
  AccommodationMatchingStatus,
  ReservationStatus,
} from "@/app/api/dto/reservation";
import AccommodationTableContainer from "./table-container";

const AccommodationReservationContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [category, setCategory] = useState<AccommodationCategory>(
    AccommodationCategory.ALL,
  ); // 카테고리
  const [status, setStatus] = useState<ReservationStatus>(
    ReservationStatus.ALL,
  ); // 예약 상태
  const [matchingStatus, setMatchingStatus] =
    useState<AccommodationMatchingStatus>(AccommodationMatchingStatus.ALL); // 매칭 상태
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 숙소 예약 이용 날짜

  const filterProps = {
    keyword,
    category,
    status,
    matchingStatus,
    duration,
    currentPage,
    setCurrentPage,
    setKeyword,
    setDuration,
    setCategory,
    setStatus,
    setMatchingStatus,
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
export default AccommodationReservationContainer;
