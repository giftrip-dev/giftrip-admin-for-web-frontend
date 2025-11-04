import ShortRow from "@/app/_components/table/short-row";
import { UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import { accommodationProductSchema } from "@/schema/accommodation";
import { useEffect } from "react";
import CustomInputField from "@/components/shared/form/custom-input-field";
import CustomSelectField from "@/components/shared/form/custom-select-field";
import { CustomDateRangeField } from "@/components/shared/form/custom-calendar-field";
import CustomTagField from "@/components/shared/form/custom-tag-field";
import { MultipleImageInputField } from "@/components/shared/form/multiple-image-input-field";

interface BasicFormProps {
  form: UseFormReturn<z.infer<typeof accommodationProductSchema>>;
}

// 오전/오후 선택 데이터
const AM_PM_OPTIONS = [
  { value: "AM", label: "오전" },
  { value: "PM", label: "오후" },
];

// 시간 선택 데이터 (1시 ~ 12시)
const HOUR_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1}시`,
}));

const BasicForm = ({ form }: BasicFormProps) => {
  // AM/PM과 시간 필드 감시
  const checkInAmPm = useWatch({ control: form.control, name: "checkInAmPm" });
  const checkInHour = useWatch({ control: form.control, name: "checkInHour" });
  const checkOutAmPm = useWatch({
    control: form.control,
    name: "checkOutAmPm",
  });
  const checkOutHour = useWatch({
    control: form.control,
    name: "checkOutHour",
  });

  // AM/PM과 시간을 24시간 형태로 변환하는 함수
  const convertTo24Hour = (amPm: string, hour: string) => {
    if (!amPm || !hour) return "";

    const hourNum = parseInt(hour);
    if (amPm === "AM") {
      if (hourNum === 12) return "00:00";
      return `${hourNum.toString().padStart(2, "0")}:00`;
    } else {
      if (hourNum === 12) return "12:00";
      return `${(hourNum + 12).toString().padStart(2, "0")}:00`;
    }
  };

  // 체크인 시간 업데이트
  useEffect(() => {
    if (checkInAmPm && checkInHour) {
      const time24 = convertTo24Hour(checkInAmPm, checkInHour);
      if (time24) {
        form.setValue("checkInTime", time24);
      }
    }
  }, [checkInAmPm, checkInHour, form]);

  // 체크아웃 시간 업데이트
  useEffect(() => {
    if (checkOutAmPm && checkOutHour) {
      const time24 = convertTo24Hour(checkOutAmPm, checkOutHour);
      if (time24) {
        form.setValue("checkOutTime", time24);
      }
    }
  }, [checkOutAmPm, checkOutHour, form]);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">기본 설정</p>
      <div>
        <ShortRow label="객실명" value={""} size="lg">
          <CustomInputField
            form={form}
            name="name"
            placeholder="객실명을 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="태그" value={""} size="lg">
          <div className="w-full py-3">
            <CustomTagField
              form={form}
              maxTags={2}
              maxLength={6}
              name="itemTags"
              placeholder="태그를 입력해주세요. (엔터키로 태그 추가)"
            />
          </div>
        </ShortRow>
        <ShortRow label="상품 소개" value={""} size="lg">
          <CustomInputField
            form={form}
            name="description"
            placeholder="상품 소개를 입력해주세요"
          />
        </ShortRow>
        <ShortRow label="썸네일" value={""} size="lg">
          <div className="w-full py-4">
            <MultipleImageInputField
              form={form}
              name="imageUrls"
              description="이미지를 업로드해주세요 ( 1:1 정방향 이미지 )"
              imageSpec="최대 5MB의 JPG,JPEG,PNG,WEBP 이미지 파일"
              maxImages={5}
              aspectRatio="square"
            />
          </div>
        </ShortRow>
        <ShortRow label="이용 시간" value={""} size="lg">
          <div className="flex w-full flex-col gap-4 py-4">
            <div className="flex items-center gap-4">
              <span className="min-w-[60px] text-body-2">체크인</span>
              <div className="flex items-center gap-2">
                <CustomSelectField
                  form={form}
                  name="checkInAmPm"
                  placeholder="오전/오후"
                  selectValue={AM_PM_OPTIONS}
                  className="w-[120px]"
                />
                <CustomSelectField
                  form={form}
                  name="checkInHour"
                  placeholder="시간"
                  selectValue={HOUR_OPTIONS}
                  className="min-w-[180px]"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="min-w-[60px] text-body-2">체크아웃</span>
              <div className="flex items-center gap-2">
                <CustomSelectField
                  form={form}
                  name="checkOutAmPm"
                  placeholder="오전/오후"
                  selectValue={AM_PM_OPTIONS}
                  className="w-[120px]"
                />
                <CustomSelectField
                  form={form}
                  name="checkOutHour"
                  placeholder="시간"
                  selectValue={HOUR_OPTIONS}
                  className="min-w-[180px]"
                />
              </div>
            </div>
          </div>
        </ShortRow>
        <ShortRow label="예약 가능일" value={""} size="lg">
          <div className="w-full py-4">
            <CustomDateRangeField
              form={form}
              startField="availableFrom"
              endField="availableTo"
              disablePastDates={true}
            />
          </div>
        </ShortRow>
        <ShortRow isLastRow label="인원 설정" value={""} size="lg">
          <div className="flex w-full items-center gap-4 py-4">
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-body-2">최소</span>
              <CustomInputField
                form={form}
                name="minOccupancy"
                type="price"
                placeholder="최소 인원"
                className="w-[100px]"
              />
              <span className="text-body-2">명</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-body-2">최대</span>
              <CustomInputField
                form={form}
                name="maxOccupancy"
                type="price"
                placeholder="최대 인원"
                className="w-[100px]"
              />
              <span className="text-body-2">명</span>
            </div>
          </div>
        </ShortRow>
      </div>
    </div>
  );
};

export default BasicForm;
