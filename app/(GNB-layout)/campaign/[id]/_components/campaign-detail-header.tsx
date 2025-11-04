import PageCrumble from "@/app/_components/page-crumble";

interface ExperienceDetailHeaderProps {
  children: React.ReactNode;
}

const ExperienceDetailHeader = ({ children }: ExperienceDetailHeaderProps) => {
  return (
    <div className="relative flex justify-between bg-[#32333C] px-8 pb-6 pt-8">
      <div className="flex flex-col gap-2">
        <PageCrumble
          props={{
            icon: "experience",
            type: "original",
            path: "체험단 관리",
            color: "white",
          }}
        />
        <PageCrumble
          props={{
            type: "second",
            path: ["체험단 관리", "체험단 상세"],
            color: "white",
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default ExperienceDetailHeader;
