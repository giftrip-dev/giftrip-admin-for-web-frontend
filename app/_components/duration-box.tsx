import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import FilterName from "./table/filter-name";
import { subDays, startOfDay } from "date-fns";
import CalendarSingle, { searchDate } from "./calendar-single";
import { useState, useEffect } from "react";

interface DurationBoxProps {
  noBottomBorder?: boolean;
  filterName?: string;
  handleFilterChange: (start?: Date, end?: Date) => void; // Updated handler type
  duration: { start?: Date; end?: Date };
}

const conditions = [
  { label: "전체", value: "all" },
  { label: "7일", value: "seven-days" },
  { label: "1개월", value: "one-month" },
  { label: "선택", value: "custom" },
];

const DurationBox = ({
  noBottomBorder,
  filterName,
  handleFilterChange,
  duration,
}: DurationBoxProps) => {
  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });
  const [selectedCondition, setSelectedCondition] = useState<string>(
    conditions[0].value,
  );

  // 기간 필터 초기화 (filter-and-search-box에서 모든 필터 초기화 시)
  useEffect(() => {
    if (!duration.start && !duration.end) {
      setSelectedCondition("all");
      setDate({ start: undefined, end: undefined });
    }
  }, [duration]);

  // '선택'을 누를 때 date를 어제~오늘로 세팅
  useEffect(() => {
    if (selectedCondition === "custom") {
      setDate({
        start: startOfDay(subDays(new Date(), 1)),
        end: startOfDay(new Date()),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCondition]);

  // 기간 업데이트
  useEffect(() => {
    if (date && selectedCondition === "custom" && date.start && date.end) {
      // 'date.end'에 하루를 더한 값으로 업데이트
      const newEndDate = new Date(date.end);
      newEndDate.setDate(newEndDate.getDate() + 1); // 하루 더하기

      handleFilterChange(date.start, newEndDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, selectedCondition]);

  // 기간 필터 변경 핸들러
  const changeCondition = (value: string) => {
    setSelectedCondition(value);
    if (value === "seven-days") {
      handleFilterChange(subDays(new Date(), 7), new Date());
    } else if (value === "one-month") {
      handleFilterChange(subDays(new Date(), 30), new Date());
    } else if (value === "custom") {
      // handleFilterChange는 useEffect에서 date가 바뀔 때 호출됨
    } else {
      handleFilterChange(undefined, undefined); // Reset if "전체"
    }
  };

  return (
    <div
      className={`flex h-[72px] ${noBottomBorder ? "border-x" : "border-x border-b"}`}
    >
      <FilterName name={filterName || "기간 검색"} />
      <ToggleGroup
        value={selectedCondition}
        type="single"
        className="gap-2 pl-3"
        onValueChange={changeCondition}
      >
        {conditions.map((condition) => (
          <ToggleGroupItem
            className="flex h-12 w-[83px] items-center justify-center border [&[data-state='on']]:border-status-clear [&[data-state='on']]:text-status-clear"
            key={condition.value}
            value={condition.value}
            aria-label={condition.value}
          >
            <p className="mt-px text-body-3">{condition.label}</p>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="ml-2 flex shrink-0 items-center gap-2">
        {selectedCondition === "custom" && date && (
          <CalendarSingle date={date} setDate={setDate} />
        )}
      </div>
    </div>
  );
};

export default DurationBox;
