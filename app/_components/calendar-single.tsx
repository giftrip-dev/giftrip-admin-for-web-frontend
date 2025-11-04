"use client";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import {
  formatCaption,
  formatWeekdayName,
} from "@/components/ui/date-formatter";
import formattedDate from "@/util/date";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";

export type searchDate =
  | { start: Date | undefined; end: Date | undefined }
  | undefined;

type CalendarDoubleProps = {
  date: searchDate;
  setDate: (data: searchDate) => void;
  disablePastDates?: boolean; // 과거 날짜 비활성화 여부 (기본값: false)
};

const CalendarDouble = ({
  date,
  setDate,
  disablePastDates = false,
}: CalendarDoubleProps) => {
  const [range, setRange] = useState<
    | {
        from: Date | undefined;
        to: Date | undefined;
      }
    | undefined
    | DateRange
  >({
    from: date?.start,
    to: date?.end,
  });

  // date prop이 변경될 때 range 상태 동기화
  useEffect(() => {
    setRange({
      from: date?.start,
      to: date?.end,
    });
  }, [date?.start, date?.end]);

  // 현재 날짜
  const currentDate = new Date();
  // 오늘 날짜의 시작 시간 (00:00:00)
  const today = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );

  // 날짜 변경 핸들러
  const onSelectRange = (newRange: undefined | DateRange) => {
    if (newRange) {
      const { from, to } = newRange;
      setRange({ from, to });
      setDate({ start: from, end: to });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "w-[250px] rounded-sm border relative h-12 text-[15px] px-3 items-center justify-between text-left",
          )}
        >
          <span className="flex gap-2 text-body-3">
            <input
              type="text"
              readOnly
              value={
                range && range.from
                  ? formattedDate(range.from, "YYYY-MM-DD")
                  : "연도. 월. 일"
              }
              placeholder="Start date"
              className="max-w-20 bg-transparent focus:outline-none"
            />
            <span>~</span>
            <input
              type="text"
              readOnly
              value={
                range && range.to
                  ? formattedDate(range.to, "YYYY-MM-DD")
                  : "연도. 월. 일"
              }
              placeholder="End date"
              className="max-w-[80px] bg-transparent focus:outline-none"
            />
          </span>
          <CalendarIcon className="absolute inset-y-0 right-0 my-auto ml-auto mr-3 size-[19px] text-black" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          formatters={{ formatCaption, formatWeekdayName }}
          mode="range"
          disabled={disablePastDates ? (date) => date < today : undefined} // prop에 따라 과거 날짜 비활성화 여부 결정
          selected={range}
          onSelect={onSelectRange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarDouble;
