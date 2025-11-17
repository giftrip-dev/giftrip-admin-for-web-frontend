"use client";

import PageCrumble from "@/app/_components/page-crumble";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCT_MANAGEMENT_PAGE } from "@/constants/path";
import { PRODUCT_TYPES } from "@/constants/product";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

const ProductManagementLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  // 현재 세그먼트
  const segment = useSelectedLayoutSegment();

  // 탭 목록
  const tabList = [
    { value: PRODUCT_TYPES.EXPERIENCE, label: "여행" },
    { value: PRODUCT_TYPES.CAMPAIGN, label: "체험단" },
    { value: PRODUCT_TYPES.ACCOMMODATION, label: "숙소" },
    { value: PRODUCT_TYPES.PRODUCT, label: "맛집" },
  ];

  // 현재 탭
  const current = segment ?? PRODUCT_TYPES.EXPERIENCE;

  return (
    <div className="flex flex-col gap-8 p-10">
      <PageCrumble
        props={{ icon: "product", type: "original", path: "상품 관리" }}
      />
      {/* 탭 바 */}
      <Tabs
        value={current}
        onValueChange={(val) =>
          router.push(`${PRODUCT_MANAGEMENT_PAGE}/${val}?prev=1`)
        }
        className="w-full"
      >
        <TabsList className="flex w-full gap-8">
          {tabList.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}

              // className="text-sm data-[state=active]:font-semibold"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div>{children}</div>
    </div>
  );
};

export default ProductManagementLayout;
