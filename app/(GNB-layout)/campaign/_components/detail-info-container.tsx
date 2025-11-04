import DetailInfoSummaryBox from "./detail-info-summary-box";
import { LoadIcon } from "@/components/shared/loading/loading";
import DisplayInfoBox from "../[id]/_components/display-info-box";
import CampaignDetailHeader from "./campaign-detail-header";
import ProductCtaButtonList from "@/app/_components/button/product-cta-button-list";
import BasicInfoBox from "../[id]/_components/basic-info-box";
import InquiryInfoBox from "./inquiry-info-box";
import RefundInfoBox from "./refund-info-box";
import { useDeleteCampaignProduct } from "@/hooks/campaign/use-delete-campaign-product";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CAMPAIGN_PRODUCT_EDIT_PAGE,
  CAMPAIGN_PRODUCT_PAGE,
} from "@/constants/path";
import { useGetCampaignProductDetail } from "@/hooks/campaign/use-get-campaign-product-detail";

const DetailInfoContainer = ({ id }: { id: string }) => {
  const prev = useSearchParams().get("prev") || 1;
  const { onSubmit, loading } = useDeleteCampaignProduct();
  const { data } = useGetCampaignProductDetail(id);
  const router = useRouter();

  // 목록 이동 핸들러
  const clickBackToList = () => {
    if (prev) {
      router.push(`${CAMPAIGN_PRODUCT_PAGE}?prev=${prev}`);
    } else {
      router.push(CAMPAIGN_PRODUCT_PAGE);
    }
  };

  // 수정 핸들러
  const clickEdit = () => {
    router.push(
      `${CAMPAIGN_PRODUCT_EDIT_PAGE.replace("[id]", id)}?prev=${prev}`,
    );
  };

  // 삭제 핸들러
  const clickDelete = () => {
    onSubmit(id);
  };

  if (!data) return <LoadIcon />;
  return (
    <div>
      <CampaignDetailHeader>
        <ProductCtaButtonList
          modalTitle="체험단 상품 삭제"
          clickBackToList={clickBackToList}
          clickDelete={clickDelete}
          clickEdit={clickEdit}
          loading={loading}
        />
      </CampaignDetailHeader>
      <DetailInfoSummaryBox data={data} />
      <div className="flex flex-col gap-10 p-10">
        <DisplayInfoBox data={data} />
        <BasicInfoBox data={data} />
        <InquiryInfoBox data={data} />
        <RefundInfoBox data={data} />
      </div>
    </div>
  );
};

export default DetailInfoContainer;
