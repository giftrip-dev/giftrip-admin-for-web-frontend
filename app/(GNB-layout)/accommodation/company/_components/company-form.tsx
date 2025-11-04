"use client";

import { Form } from "@/components/ui/form";
import CancelAndCreateButtonBar from "@/app/_components/button/cancel-and-create-button-bar";
import { useRouter } from "next/navigation";
import { ACCOMMODATION_PRODUCT_PAGE } from "@/constants/path";
import { usePostAccommodationCompany } from "@/hooks/accommodation/use-post-accommodation-company";
import BasicForm from "./basic-form";
import InquiryForm from "./inquiry-form";
import ChangeInfoForm from "./change-info-form";

interface CompanyFormProps {
  prev: string;
}

const CompanyForm = ({ prev }: CompanyFormProps) => {
  const createCompany = usePostAccommodationCompany();

  const { form, onSubmit, isLoading } = createCompany;
  const router = useRouter();

  // 취소 버튼 핸들러
  const clickCancel = () => {
    router.push(ACCOMMODATION_PRODUCT_PAGE + `?prev=${prev}`);
  };

  const buttonText = "생성";

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <BasicForm form={form} />
        <InquiryForm form={form} />
        <ChangeInfoForm form={form} />
        <div className="fixed right-0 top-0 mr-10 mt-10">
          <CancelAndCreateButtonBar
            cancelButtonText="취소"
            createButtonText={buttonText}
            onClickCancel={clickCancel}
            onClickCreate={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default CompanyForm;
