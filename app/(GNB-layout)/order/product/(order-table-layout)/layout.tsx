"use client";

import PageCrumble from "@/app/_components/page-crumble";

const OrderProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col p-10">
      <PageCrumble
        props={{ icon: "order", type: "original", path: "주문 관리" }}
      />

      <div>{children}</div>
    </div>
  );
};

export default OrderProductLayout;
