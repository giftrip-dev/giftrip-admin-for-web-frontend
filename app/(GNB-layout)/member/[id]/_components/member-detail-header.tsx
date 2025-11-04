import PageCrumble from "@/app/_components/page-crumble";

interface MemberDetailHeaderProps {
  children: React.ReactNode;
}

const MemberDetailHeader = ({ children }: MemberDetailHeaderProps) => {
  return (
    <div className="relative flex justify-between bg-[#32333C] px-8 pb-6 pt-8">
      <div className="flex flex-col gap-2">
        <PageCrumble
          props={{
            icon: "order",
            type: "original",
            path: "회원 관리",
            color: "white",
          }}
        />
        <PageCrumble
          props={{
            type: "second",
            path: ["회원 관리", "회원 상세"],
            color: "white",
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default MemberDetailHeader;
