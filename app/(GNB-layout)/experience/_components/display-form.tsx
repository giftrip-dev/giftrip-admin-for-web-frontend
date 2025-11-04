import ShortRow from "@/app/_components/table/short-row";
import CustomRadioField from "@/components/shared/form/custom-radio-field";
import CustomSelectField from "@/components/shared/form/custom-select-field";
import {
  EXPERIENCE_ACTIVE_ARRAY,
  EXPERIENCE_CATEGORY_ARRAY_CREATE,
} from "@/constants/experience";
import { EXPOSURE_TAG_PARTIAL_ARRAY } from "@/constants/product";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { experienceProductSchema } from "@/schema/experience";

interface DisplayFormProps {
  form: UseFormReturn<z.infer<typeof experienceProductSchema>>;
}

const DisplayForm = ({ form }: DisplayFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">표시 설정</p>
      <div>
        <ShortRow label="판매 상태" value={""} size="lg">
          <CustomRadioField
            form={form}
            direction="horizontal"
            name="isActive"
            radioValue={EXPERIENCE_ACTIVE_ARRAY}
          />
        </ShortRow>
        <ShortRow label="카테고리" value={""} size="lg">
          <div className="w-full max-w-[200px]">
            <CustomSelectField
              form={form}
              placeholder="선택"
              name="category"
              selectValue={EXPERIENCE_CATEGORY_ARRAY_CREATE}
            />
          </div>
        </ShortRow>
        <ShortRow isLastRow label="홈 진열 상태" value={""} size="lg">
          <CustomRadioField
            form={form}
            direction="horizontal"
            name="exposureTags"
            radioValue={EXPOSURE_TAG_PARTIAL_ARRAY}
          />
        </ShortRow>
      </div>
    </div>
  );
};

export default DisplayForm;
