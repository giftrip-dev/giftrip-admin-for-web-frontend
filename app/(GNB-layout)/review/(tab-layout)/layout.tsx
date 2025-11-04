"use client";

import PageCrumble from "@/app/_components/page-crumble";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { REVIEW_PAGE } from "@/constants/path";
import { PRODUCT_TYPES } from "@/constants/product";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

const ReviewLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  // 현재 세그먼트
  const segment = useSelectedLayoutSegment();

  // 탭 목록
  const tabList = [
    { value: PRODUCT_TYPES.EXPERIENCE, label: "여행" },
    { value: PRODUCT_TYPES.CAMPAIGN, label: "체험단" },
    { value: PRODUCT_TYPES.ACCOMMODATION, label: "숙소" },
    { value: PRODUCT_TYPES.PRODUCT, label: "상품" },
  ];

  // 현재 탭
  const current = segment ?? PRODUCT_TYPES.EXPERIENCE;

  return (
    <div className="flex flex-col gap-8">
      <PageCrumble
        props={{ icon: "review", type: "original", path: "리뷰 관리" }}
      />
      <Tabs
        value={current}
        onValueChange={(val) => router.push(`${REVIEW_PAGE}/${val}`)}
        className="w-full"
      >
        <TabsList className="flex w-full gap-8">
          {tabList.map(({ value, label }) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div>{children}</div>
    </div>
  );
};

export default ReviewLayout;
