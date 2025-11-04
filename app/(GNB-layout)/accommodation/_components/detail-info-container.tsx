import DetailInfoSummaryBox from "./detail-info-summary-box";
import { LoadIcon } from "@/components/shared/loading/loading";
import DisplayInfoBox from "../[id]/_components/display-info-box";
import CampaignDetailHeader from "./campaign-detail-header";
import ProductCtaButtonList from "@/app/_components/button/product-cta-button-list";
import BasicInfoBox from "../[id]/_components/basic-info-box";
import RefundInfoBox from "./refund-info-box";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ACCOMMODATION_PRODUCT_PAGE,
  ACCOMMODATION_PRODUCT_EDIT_PAGE,
} from "@/constants/path";
import { useDeleteAccommodationProduct } from "@/hooks/accommodation/use-delete-accommodation-product";
import { useGetAccommodationProductDetail } from "@/hooks/accommodation/use-get-accommodation-product-detail";
import CompanyInfoBox from "./company-info-box";
import PriceInfoBox from "./price-info-box";
import StockInfoBox from "./stock-info-box";

const DetailInfoContainer = ({ id }: { id: string }) => {
  const prev = useSearchParams().get("prev") || 1;
  const { onSubmit, loading } = useDeleteAccommodationProduct();
  const { data } = useGetAccommodationProductDetail(id);

  const router = useRouter();

  // 목록 이동 핸들러
  const clickBackToList = () => {
    if (prev) {
      router.push(`${ACCOMMODATION_PRODUCT_PAGE}?prev=${prev}`);
    } else {
      router.push(ACCOMMODATION_PRODUCT_PAGE);
    }
  };

  // 수정 핸들러
  const clickEdit = () => {
    router.push(
      `${ACCOMMODATION_PRODUCT_EDIT_PAGE.replace("[id]", id)}?prev=${prev}`,
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
          modalTitle="숙소 상품 삭제"
          clickBackToList={clickBackToList}
          clickDelete={clickDelete}
          clickEdit={clickEdit}
          loading={loading}
        />
      </CampaignDetailHeader>
      <DetailInfoSummaryBox data={data} />
      <div className="flex flex-col gap-10 p-10">
        <DisplayInfoBox data={data} />
        <CompanyInfoBox accommodationId={data.accommodationId} />
        <BasicInfoBox data={data} />
        <PriceInfoBox data={data} />
        <StockInfoBox data={data} />
        <RefundInfoBox data={data} />
      </div>
    </div>
  );
};

export default DetailInfoContainer;
