"use client";

import { useState, useEffect } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  useController,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import CalendarSingle, { searchDate } from "@/app/_components/calendar-single";

interface DateRangeFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  startField: Path<T>;
  endField: Path<T>;
  label?: string;
  disabled?: boolean;
  className?: string;
  disablePastDates?: boolean; // 과거 날짜 비활성화 여부 (기본값: false)
}

export function CustomDateRangeField<T extends FieldValues>({
  form,
  startField,
  endField,
  label,
  disabled,
  className,
  disablePastDates = false,
}: DateRangeFieldProps<T>) {
  const {
    field: { onChange: onStartChange },
  } = useController({
    control: form.control,
    name: startField,
    defaultValue: "" as PathValue<T, Path<T>>,
  });
  const {
    field: { onChange: onEndChange },
  } = useController({
    control: form.control,
    name: endField,
    defaultValue: "" as PathValue<T, Path<T>>,
  });

  // useWatch로 폼 값 변화 감지
  const startValue = useWatch({ control: form.control, name: startField });
  const endValue = useWatch({ control: form.control, name: endField });

  const [date, setDate] = useState<searchDate>({
    start: undefined,
    end: undefined,
  });

  // form 값이 외부에서 리셋될 때 로컬 date도 초기화
  useEffect(() => {
    // ISO 문자열을 Date 객체로 변환 (로컬 시간대 유지)
    const parseDate = (iso: string) => {
      if (!iso) return undefined;
      const [year, month, day] = iso.split("-").map(Number);
      return new Date(year, month - 1, day); // month는 0부터 시작
    };

    const newStart = parseDate(startValue);
    const newEnd = parseDate(endValue);

    setDate({ start: newStart, end: newEnd });
  }, [startValue, endValue]);

  // 날짜를 YYYY-MM-DD 형식으로 변환 (로컬 시간대 유지)
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 캘린더에서 날짜 고르면
  const handleDateChange = (newDate: searchDate) => {
    setDate(newDate);

    // start/end 모두 선택됐으면 사용자가 선택한 날짜 그대로 저장
    if (newDate?.start && newDate?.end) {
      const isoStart = formatDate(newDate.start);
      const isoEnd = formatDate(newDate.end);
      onStartChange(isoStart as PathValue<T, Path<T>>);
      onEndChange(isoEnd as PathValue<T, Path<T>>);
    } else {
      // 하나라도 비어있으면 빈 문자열로 리셋
      onStartChange("" as PathValue<T, Path<T>>);
      onEndChange("" as PathValue<T, Path<T>>);
    }
  };

  return (
    <FormField
      control={form.control}
      name={startField as Path<T>}
      render={() => (
        <FormItem className="relative">
          {label && (
            <FormLabel className="mb-2" htmlFor={startField as string}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            <div className={`flex items-center ${className}`}>
              {disabled ? (
                <div className="flex h-12 w-full items-center justify-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground">
                  {date?.start && date?.end
                    ? `${date.start.toLocaleDateString()} ~ ${date.end.toLocaleDateString()}`
                    : "날짜를 선택해주세요"}
                </div>
              ) : (
                <CalendarSingle
                  disablePastDates={disablePastDates}
                  date={date}
                  setDate={handleDateChange}
                />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
