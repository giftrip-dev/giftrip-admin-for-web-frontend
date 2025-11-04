import { shoppingProductSchema } from "@/schema/shopping";
import { UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import ShortRow from "@/app/_components/table/short-row";
import CustomRadioField from "@/components/shared/form/custom-radio-field";
import OptionForm from "./option-form";
import { useEffect } from "react";

interface OptionAndStockFormProps {
  form: UseFormReturn<z.infer<typeof shoppingProductSchema>>;
  isEditMode: boolean; // 옵션 수정 모드 활성화 여부
  setIsEditMode: (isEditMode: boolean) => void; // 옵션 수정 모드 활성화 여부
}

// 옵션 사용 라디오 데이터
const OPTION_USAGE_ARRAY = [
  { value: "true", label: "사용" },
  { value: "false", label: "사용안함" },
];

const OptionAndStockForm = ({
  form,
  isEditMode,
  setIsEditMode,
}: OptionAndStockFormProps) => {
  const isOptionUsed = useWatch({
    control: form.control,
    name: "isOptionUsed",
  });

  // 옵션 사용 여부가 변경되면 옵션 초기화
  useEffect(() => {
    if (isOptionUsed === "false") {
      form.setValue("options", []);
    } else {
      form.setValue("stockCount", null);
    }
  }, [isOptionUsed, form]);

  const isOptionUsedTrue = String(isOptionUsed) === "true";
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">옵션/재고 설정</p>
      <div>
        <ShortRow label="옵션 사용" value={""} size="md">
          <div className="flex w-full gap-4">
            <CustomRadioField
              radioValue={OPTION_USAGE_ARRAY}
              name="isOptionUsed"
              direction="horizontal"
              form={form}
            />
          </div>
        </ShortRow>
        <OptionForm
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          isOptionUsed={isOptionUsedTrue}
          form={form}
        />
      </div>
    </div>
  );
};

export default OptionAndStockForm;
