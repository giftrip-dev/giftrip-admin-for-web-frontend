import DetailInfoSummaryBox from "./detail-info-summary-box";
import { LoadIcon } from "@/components/shared/loading/loading";
import DisplayInfoBox from "../[id]/_components/display-info-box";
import ShoppingDetailHeader from "./shopping-detail-header";
import ProductCtaButtonList from "@/app/_components/button/product-cta-button-list";
import BasicInfoBox from "../[id]/_components/basic-info-box";
import PriceInfoBox from "../[id]/_components/price-info-box";
import OptionAndStockInfoBox from "../[id]/_components/option-and-stock-info-box";
import InquiryInfoBox from "./inquiry-info-box";
import RefundInfoBox from "./refund-info-box";
import { useDeleteShoppingProduct } from "@/hooks/shopping/use-delete-shopping-product";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SHOPPING_PRODUCT_EDIT_PAGE,
  SHOPPING_PRODUCT_PAGE,
} from "@/constants/path";
import { useGetShoppingProductDetail } from "@/hooks/shopping/use-get-shopping-product-detail";

const DetailInfoContainer = ({ id }: { id: string }) => {
  const prev = useSearchParams().get("prev");
  const { onSubmit, loading } = useDeleteShoppingProduct();
  const { data } = useGetShoppingProductDetail(id);
  const router = useRouter();

  // 목록 이동 핸들러
  const clickBackToList = () => {
    if (prev) {
      router.push(`${SHOPPING_PRODUCT_PAGE}?prev=${prev}`);
    } else {
      router.push(SHOPPING_PRODUCT_PAGE);
    }
  };

  // 수정 핸들러
  const clickEdit = () => {
    router.push(
      `${SHOPPING_PRODUCT_EDIT_PAGE.replace("[id]", id)}?prev=${prev}`,
    );
  };

  // 삭제 핸들러
  const clickDelete = () => {
    onSubmit(id);
  };

  if (!data) return <LoadIcon />;
  return (
    <div>
      <ShoppingDetailHeader>
        <ProductCtaButtonList
          modalTitle="쇼핑 상품 삭제"
          clickBackToList={clickBackToList}
          clickDelete={clickDelete}
          clickEdit={clickEdit}
          loading={loading}
        />
      </ShoppingDetailHeader>
      <DetailInfoSummaryBox data={data} />
      <div className="flex flex-col gap-10 p-10">
        <DisplayInfoBox data={data} />
        <BasicInfoBox data={data} />
        <PriceInfoBox data={data} />
        <OptionAndStockInfoBox data={data} />
        <InquiryInfoBox data={data} />
        <RefundInfoBox data={data} />
      </div>
    </div>
  );
};

export default DetailInfoContainer;
