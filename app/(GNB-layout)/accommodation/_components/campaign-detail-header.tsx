import PageCrumble from "@/app/_components/page-crumble";

interface CampaignDetailHeaderProps {
  children: React.ReactNode;
}

const AccommodationDetailHeader = ({ children }: CampaignDetailHeaderProps) => {
  return (
    <div className="relative flex items-start justify-between bg-[#32333C] px-8 pb-6 pt-8">
      <div className="flex flex-col gap-2">
        <PageCrumble
          props={{
            icon: "product",
            type: "original",
            path: "숙소 관리",
            color: "white",
          }}
        />
        <PageCrumble
          props={{
            type: "second",
            path: ["숙소 관리", "숙소 상세"],
            color: "white",
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default AccommodationDetailHeader;
