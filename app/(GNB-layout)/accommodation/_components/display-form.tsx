import ShortRow from "@/app/_components/table/short-row";
import CustomRadioField from "@/components/shared/form/custom-radio-field";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { accommodationProductSchema } from "@/schema/accommodation";
import { EXPERIENCE_ACTIVE_ARRAY } from "@/constants/experience";

interface DisplayFormProps {
  form: UseFormReturn<z.infer<typeof accommodationProductSchema>>;
}

const DisplayForm = ({ form }: DisplayFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">표시 설정</p>
      <ShortRow isLastRow label="판매 상태" value={""} size="lg">
        <CustomRadioField
          form={form}
          direction="horizontal"
          name="isActive"
          radioValue={EXPERIENCE_ACTIVE_ARRAY}
        />
      </ShortRow>
    </div>
  );
};

export default DisplayForm;
