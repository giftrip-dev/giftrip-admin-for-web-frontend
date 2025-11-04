import PageCrumble from "@/app/_components/page-crumble";
import CouponForm from "../_components/coupon-form";

const NewCouponPage = () => {
  return (
    <div className="flex flex-col gap-10 pt-3">
      <PageCrumble
        props={{
          type: "second",
          path: ["쿠폰 관리", "쿠폰 생성"],
        }}
      />
      <CouponForm mode="create" />
    </div>
  );
};

export default NewCouponPage;
