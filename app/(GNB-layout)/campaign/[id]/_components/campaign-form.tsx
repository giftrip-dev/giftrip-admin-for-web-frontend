"use client";

import { Form } from "@/components/ui/form";
import CancelAndCreateButtonBar from "@/app/_components/button/cancel-and-create-button-bar";
import { useRouter } from "next/navigation";
import {
  CAMPAIGN_PRODUCT_DETAIL_PAGE,
  CAMPAIGN_PRODUCT_PAGE,
} from "@/constants/path";
import { usePostCampaignProduct } from "@/hooks/campaign/use-post-campaign-product";
import DisplayForm from "../../_components/display-form";
import BasicForm from "../../_components/basic-form";
import InquiryForm from "../../_components/inquiry-form";
import { useUpdateCampaignProduct } from "@/hooks/campaign/use-update-campaign-product";
import ChangeInfoForm from "../../_components/change-info-form";

interface CampaignFormProps {
  mode: "create" | "edit";
  campaignId?: string;
  prev: string;
}

const CampaignForm = ({ mode, campaignId, prev }: CampaignFormProps) => {
  const createCampaign = usePostCampaignProduct();
  const updateCampaign = useUpdateCampaignProduct(campaignId);
  const isEdit = mode === "edit";

  const { form, onSubmit, isLoading } = isEdit
    ? updateCampaign
    : createCampaign;
  const router = useRouter();

  // 취소 버튼 핸들러
  const clickCancel = () => {
    if (!isEdit) {
      router.push(CAMPAIGN_PRODUCT_PAGE + `?prev=${prev}`);
    } else {
      router.push(
        `${CAMPAIGN_PRODUCT_DETAIL_PAGE.replace("[id]", campaignId as string)}?prev=${prev}`,
      );
    }
  };

  const buttonText = isEdit ? "수정" : "생성";

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <DisplayForm form={form} />
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

export default CampaignForm;
