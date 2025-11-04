import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { accommodationCompanySchema } from "@/schema/accommodation";
import CustomTextareaField from "@/components/shared/form/custom-text-area-field";

interface ChangeInfoFormProps {
  form: UseFormReturn<z.infer<typeof accommodationCompanySchema>>;
}

const ChangeInfoForm = ({ form }: ChangeInfoFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">취소 및 환불 사항 설정</p>
      <CustomTextareaField
        textAreaClass="min-h-[260px]"
        form={form}
        name="changeInfo"
        placeholder="취소 및 환불 사항을 입력해주세요"
      />
    </div>
  );
};

export default ChangeInfoForm;
