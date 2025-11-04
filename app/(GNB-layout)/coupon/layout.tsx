"use client";

import PageCrumble from "@/app/_components/page-crumble";

const CouponLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col p-10">
      <PageCrumble
        props={{ icon: "coupon", type: "original", path: "쿠폰 관리" }}
      />

      <div>{children}</div>
    </div>
  );
};

export default CouponLayout;
