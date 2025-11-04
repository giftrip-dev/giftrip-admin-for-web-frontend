import { Dispatch, SetStateAction } from "react";
import CheckBox from "@/app/_components/check-box";
import DurationBox from "@/app/_components/duration-box";
import { BANNER_ACTIVE_ARRAY } from "@/constants/banner";

interface SubBannerFilterBoxProps {
  duration: { start?: Date; end?: Date };
  isActive: string;
  setCurrentPage: Dispatch<SetStateAction<number>>; // 페이지 업데이트 함수
  setDuration: Dispatch<SetStateAction<{ start?: Date; end?: Date }>>; // 생성일자 업데이트 함수
  setIsActive: Dispatch<SetStateAction<string>>; // 활성화 여부 업데이트 함수
}

const SubBannerFilterBox = ({
  duration,
  isActive,
  setCurrentPage,
  setDuration,
  setIsActive,
}: SubBannerFilterBoxProps) => {
  // 생성 일자 변경 핸들러
  const changeDuration = (start?: Date, end?: Date) => {
    setDuration({ start, end });
    setCurrentPage(1);
  };

  // 판매 상태 변경 핸들러
  const changeIsActive = (val: string) => {
    setIsActive(val);
    setCurrentPage(1);
  };

  return (
    <div className="w-full min-w-[550px] border-t">
      <DurationBox
        handleFilterChange={changeDuration}
        filterName="생성 일자"
        duration={duration}
      />
      <CheckBox
        label="공개 상태"
        conditions={BANNER_ACTIVE_ARRAY}
        value={isActive}
        handleChangeValue={changeIsActive}
      />
    </div>
  );
};

export default SubBannerFilterBox;
