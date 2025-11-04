"use client";
import PageCrumble from "@/app/_components/page-crumble";
import { usePathname } from "next/navigation";
import Loading from "@/components/shared/loading/loading";
import AccountDetailContainer from "./_components/account-detail-container";

const AccountDetailTable = () => {
  const id = usePathname().split("/")[2];
  if (!id) return null;
  return (
    <div className="flex flex-col gap-8 p-10">
      <PageCrumble
        props={{ icon: "account", type: "original", path: "관리자 계정 관리" }}
      />
      <Loading>
        <AccountDetailContainer id={id} />
      </Loading>
    </div>
  );
};
export default AccountDetailTable;
