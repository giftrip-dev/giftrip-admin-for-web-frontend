"use client";

import PageCrumble from "@/app/_components/page-crumble";

const NoticeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col p-10">
      <PageCrumble
        props={{ icon: "member", type: "original", path: "회원 관리" }}
      />
      <div>{children}</div>
    </div>
  );
};

export default NoticeLayout;
