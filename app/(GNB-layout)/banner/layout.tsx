"use client";

import PageCrumble from "@/app/_components/page-crumble";
import { useSelectedLayoutSegment } from "next/navigation";

const BannerLayout = ({ children }: { children: React.ReactNode }) => {
  // 현재 세그먼트
  const segment = useSelectedLayoutSegment();
  const isMain = segment === "main";
  const pathName = isMain ? "메인 배너 관리" : "서브 배너 관리";

  return (
    <div className="flex flex-col p-10">
      <PageCrumble
        props={{ icon: "banner", type: "original", path: pathName }}
      />

      <div>{children}</div>
    </div>
  );
};

export default BannerLayout;
