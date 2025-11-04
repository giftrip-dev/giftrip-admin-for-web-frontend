import { Dispatch, SetStateAction } from "react";
import SearchBar from "@/app/_components/search-bar";
import DurationBox from "@/app/_components/duration-box";
import CheckBox from "@/app/_components/check-box";
import { DELIVERY_STATUS_ARRAY } from "@/constants/order";

interface OrderFilterBoxProps {
  keyword: string;
  duration: { start?: Date; end?: Date };
  deliveryStatus: string;
  setCurrentPage: Dispatch<SetStateAction<number>>; // 페이지 업데이트 함수
  setKeyword: (val: string) => void; // 검색어 업데이트 함수
  setDuration: Dispatch<SetStateAction<{ start?: Date; end?: Date }>>; // 생성일자 업데이트 함수
  setDeliveryStatus: Dispatch<SetStateAction<string>>; // 배송 상태 업데이트 함수
}

const OrderFilterBox = ({
  keyword,
  duration,
  deliveryStatus,
  setCurrentPage,
  setKeyword,
  setDuration,
  setDeliveryStatus,
}: OrderFilterBoxProps) => {
  // 배송 상태 변경 핸들러
  const changeDeliveryStatus = (newDeliveryStatus: string) => {
    setDeliveryStatus(newDeliveryStatus);
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
    setDuration({ start: undefined, end: undefined });
  };

  return (
    <div className="w-full min-w-[600px]">
      <SearchBar
        placeholder="상품명, 주문자"
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
        label="배송 상태"
        conditions={DELIVERY_STATUS_ARRAY}
        handleChangeValue={changeDeliveryStatus}
        value={deliveryStatus}
      />
    </div>
  );
};

export default OrderFilterBox;
