import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { accommodationProductSchema } from "@/schema/accommodation";
import ShortRow from "@/app/_components/table/short-row";
import CustomInputField from "@/components/shared/form/custom-input-field";

interface StockFormProps {
  form: UseFormReturn<z.infer<typeof accommodationProductSchema>>;
}

const StockForm = ({ form }: StockFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">재고 설정</p>
      <div>
        <ShortRow isLastRow label="당일 재고" value={""} size="lg">
          <CustomInputField
            type="price"
            form={form}
            name="dailyStock"
            placeholder="재고를 입력해주세요"
          />
        </ShortRow>
      </div>
    </div>
  );
};

export default StockForm;
