"use client";

import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/shared/loading/loading";
import ProductCtaButtonList from "@/app/_components/button/product-cta-button-list";
import { useDeleteCoupon } from "@/hooks/coupon/use-delete-coupon";
import { COUPON_PAGE, COUPON_EDIT_PAGE } from "@/constants/path";
import PageCrumble from "@/app/_components/page-crumble";
import CouponDetailContainer from "../_components/coupon-detail-container";

const CouponDetailPage = () => {
  const { id } = useParams();
  const { onSubmit, loading } = useDeleteCoupon();
  const router = useRouter();

  // 수정 버튼 핸들러
  const clickEdit = () => {
    router.push(COUPON_EDIT_PAGE.replace("[id]", id as string));
  };

  // 삭제 버튼 핸들러
  const clickDelete = () => {
    onSubmit(id as string);
  };

  // 목록 버튼 핸들러
  const clickBackToList = (prev: string) => {
    router.push(`${COUPON_PAGE}?prev=${prev}`);
  };

  return (
    <div className="pt-3">
      <PageCrumble
        props={{
          type: "second",
          path: ["쿠폰 관리", "쿠폰 상세"],
        }}
      />
      <ProductCtaButtonList
        clickBackToList={clickBackToList}
        clickDelete={clickDelete}
        clickEdit={clickEdit}
        loading={loading}
        modalTitle="쿠폰 삭제"
      />
      <Loading>
        <CouponDetailContainer id={id as string} />
      </Loading>
    </div>
  );
};

export default CouponDetailPage;
