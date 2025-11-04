"use client";

import { UseFormReturn, useWatch } from "react-hook-form";
import { z } from "zod";
import { shoppingProductSchema } from "@/schema/shopping";
import ShortRow from "@/app/_components/table/short-row";
import CustomRadioField from "@/components/shared/form/custom-radio-field";
import CustomInputField from "@/components/shared/form/custom-input-field";
import ProductOptionTable from "./product-option-table";
import ProductOptionStockTable from "./product-option-stock-table";
import { useEffect } from "react";

interface OptionFormProps {
  form: UseFormReturn<z.infer<typeof shoppingProductSchema>>;
  isOptionUsed: boolean;
  setIsEditMode: (isEditMode: boolean) => void; // 옵션 수정 모드 활성화 여부
  isEditMode: boolean; // 옵션 수정 모드 활성화 여부
}

// 재고 관리 라디오 데이터
const STOCK_MANAGEMENT_ARRAY = [
  { value: "false", label: "설정 안함" },
  { value: "true", label: "설정" },
];

const OptionForm = ({
  isOptionUsed,
  form,
  setIsEditMode,
  isEditMode,
}: OptionFormProps) => {
  const hasStockManagement = useWatch({
    control: form.control,
    name: "hasStockManagement",
  });

  useEffect(() => {
    if (hasStockManagement === "false") {
      form.setValue("stockCount", null);
    }
  }, [hasStockManagement, form]);

  return (
    <div>
      {!isOptionUsed && (
        <ShortRow
          isLastRow={!isOptionUsed}
          label="재고 관리"
          value={""}
          size="md"
        >
          <div className="flex w-full flex-col gap-4 py-4">
            <div className="flex items-center gap-4">
              <CustomRadioField
                radioValue={STOCK_MANAGEMENT_ARRAY}
                name="hasStockManagement"
                direction="horizontal"
                form={form}
              />
              {hasStockManagement === "true" && (
                <div className="flex items-center gap-2">
                  <CustomInputField
                    form={form}
                    name="stockCount"
                    type="number"
                    placeholder="재고 수량"
                    className="w-[130px]"
                  />
                  <span className="text-body-2">개</span>
                </div>
              )}
            </div>
          </div>
        </ShortRow>
      )}
      {isOptionUsed && (
        <ShortRow label="옵션 설정" value={""} size="md">
          <div className="flex w-full flex-col gap-8 py-4">
            <ProductOptionTable form={form} setOptionEditMode={setIsEditMode} />
            {!isEditMode && <ProductOptionStockTable form={form} />}
          </div>
        </ShortRow>
      )}
    </div>
  );
};

export default OptionForm;
