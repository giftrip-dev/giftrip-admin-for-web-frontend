import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { experienceProductSchema } from "@/schema/experience";
import CustomTextareaField from "@/components/shared/form/custom-text-area-field";

interface InquiryFormProps {
  form: UseFormReturn<z.infer<typeof experienceProductSchema>>;
}

const InquiryForm = ({ form }: InquiryFormProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">문의 사항 설정</p>
      <CustomTextareaField
        textAreaClass="min-h-[260px]"
        form={form}
        name="inquiryInfo"
        placeholder="문의 사항을 입력해주세요"
      />
    </div>
  );
};

export default InquiryForm;
