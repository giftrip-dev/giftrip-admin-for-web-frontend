"use client";

import PageCrumble from "@/app/_components/page-crumble";
import CouponForm from "../../_components/coupon-form";
import { useParams } from "next/navigation";

const EditCouponPage = () => {
  const params = useParams();
  const couponId = params.id as string;

  return (
    <div className="flex flex-col gap-8 pt-3">
      <PageCrumble
        props={{
          type: "second",
          path: ["쿠폰 관리", "쿠폰 상세"],
        }}
      />
      <CouponForm mode="edit" couponId={couponId} />
    </div>
  );
};

export default EditCouponPage;
