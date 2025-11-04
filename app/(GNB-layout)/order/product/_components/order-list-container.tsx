"use client";
import { useState } from "react";
import Loading from "@/components/shared/loading/loading";
import OrderFilterBox from "./order-filter-box";
import OrderTableContainer from "./order-table-container";

const OrderListContainer = () => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [keyword, setKeyword] = useState(""); // 검색어
  const [deliveryStatus, setDeliveryStatus] = useState("all"); // 배송 상태
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  }); // 생성 일자

  const filterProps = {
    keyword,
    duration,
    deliveryStatus,
    currentPage,
    setCurrentPage,
    setKeyword,
    setDuration,
    setDeliveryStatus,
  };

  return (
    <div className="mt-8 flex flex-col gap-10 overflow-x-auto">
      <OrderFilterBox {...filterProps} />
      <div className="relative min-h-[250px] min-w-[600px]">
        <Loading>
          <OrderTableContainer {...filterProps} />
        </Loading>
      </div>
    </div>
  );
};
export default OrderListContainer;
