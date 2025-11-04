import { useGetExperienceProductDetail } from "@/hooks/experience/use-get-experience-product-detail";
import DetailInfoSummaryBox from "./detail-info-summary-box";
import { LoadIcon } from "@/components/shared/loading/loading";
import DisplayInfoBox from "../[id]/_components/display-info-box";
import ExperienceDetailHeader from "./experience-detail-header";
import ProductCtaButtonList from "@/app/_components/button/product-cta-button-list";
import BasicInfoBox from "../[id]/_components/basic-info-box";
import StockInfoBox from "../[id]/_components/stock-info-box";
import InquiryInfoBox from "./inquiry-info-box";
import RefundInfoBox from "./refund-info-box";
import { useDeleteExperienceProduct } from "@/hooks/experience/use-delete-experience";
import { useRouter, useSearchParams } from "next/navigation";
import {
  EXPERIENCE_PRODUCT_EDIT_PAGE,
  EXPERIENCE_PRODUCT_PAGE,
} from "@/constants/path";
import PriceInfoBox from "../[id]/_components/price-info-box";

const DetailInfoContainer = ({ id }: { id: string }) => {
  const prev = useSearchParams().get("prev");
  const { onSubmit, loading } = useDeleteExperienceProduct();
  const { data } = useGetExperienceProductDetail(id);
  const router = useRouter();

  // 목록 이동 핸들러
  const clickBackToList = () => {
    if (prev) {
      router.push(`${EXPERIENCE_PRODUCT_PAGE}?prev=${prev}`);
    } else {
      router.push(EXPERIENCE_PRODUCT_PAGE);
    }
  };

  // 수정 핸들러
  const clickEdit = () => {
    router.push(
      `${EXPERIENCE_PRODUCT_EDIT_PAGE.replace("[id]", id)}?prev=${prev}`,
    );
  };

  // 삭제 핸들러
  const clickDelete = () => {
    onSubmit(id);
  };

  if (!data) return <LoadIcon />;
  return (
    <div>
      <ExperienceDetailHeader>
        <ProductCtaButtonList
          modalTitle="체험 상품 삭제"
          clickBackToList={clickBackToList}
          clickDelete={clickDelete}
          clickEdit={clickEdit}
          loading={loading}
        />
      </ExperienceDetailHeader>
      <DetailInfoSummaryBox data={data} />
      <div className="flex flex-col gap-10 p-10">
        <DisplayInfoBox data={data} />
        <BasicInfoBox data={data} />
        <PriceInfoBox data={data} />
        <StockInfoBox data={data} />
        <InquiryInfoBox data={data} />
        <RefundInfoBox data={data} />
      </div>
    </div>
  );
};

export default DetailInfoContainer;
