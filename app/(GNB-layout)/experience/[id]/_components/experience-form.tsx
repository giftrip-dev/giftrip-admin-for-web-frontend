"use client";

import { Form } from "@/components/ui/form";
import CancelAndCreateButtonBar from "@/app/_components/button/cancel-and-create-button-bar";
import { useRouter } from "next/navigation";
import {
  EXPERIENCE_PRODUCT_DETAIL_PAGE,
  EXPERIENCE_PRODUCT_PAGE,
} from "@/constants/path";
import { usePostExperienceProduct } from "@/hooks/experience/use-post-experience-product";
import DisplayForm from "../../_components/display-form";
import BasicForm from "../../_components/basic-form";
import PriceForm from "../../_components/price-form";
import StockForm from "../../_components/stock-form";
import InquiryForm from "../../_components/inquiry-form";
import { useUpdateExperienceProduct } from "@/hooks/experience/use-update-experience-product";
import ChangeInfoForm from "../../_components/change-info-form";

interface ExperienceFormProps {
  mode: "create" | "edit";
  experienceId?: string;
}

const ExperienceForm = ({ mode, experienceId }: ExperienceFormProps) => {
  const createExperience = usePostExperienceProduct();
  const updateExperience = useUpdateExperienceProduct(experienceId);
  const isEdit = mode === "edit";

  const { form, onSubmit, isLoading, coupon, setCoupon } = isEdit
    ? updateExperience
    : createExperience;
  const router = useRouter();

  // 취소 버튼 핸들러
  const clickCancel = () => {
    if (!isEdit) {
      router.push(EXPERIENCE_PRODUCT_PAGE + "?prev=1");
    } else {
      router.push(
        EXPERIENCE_PRODUCT_DETAIL_PAGE.replace("[id]", experienceId as string) +
          "?prev=1",
      );
    }
  };

  const buttonText = isEdit ? "수정" : "생성";
  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <DisplayForm form={form} />
        <BasicForm form={form} />
        <PriceForm
          form={form}
          coupon={coupon}
          setCoupon={setCoupon}
          isEdit={isEdit}
        />
        <StockForm form={form} />
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

export default ExperienceForm;
