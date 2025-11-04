import PageCrumble from "@/app/_components/page-crumble";

interface ReservationDetailHeaderProps {
  children: React.ReactNode;
  title: string;
  path: string[];
}

const ReservationDetailHeader = ({
  children,
  title,
  path,
}: ReservationDetailHeaderProps) => {
  return (
    <div className="relative flex justify-between bg-[#32333C] px-8 pb-6 pt-8">
      <div className="flex flex-col gap-2">
        <PageCrumble
          props={{
            icon: "order",
            type: "original",
            path: title,
            color: "white",
          }}
        />
        <PageCrumble
          props={{
            type: "second",
            path: path,
            color: "white",
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default ReservationDetailHeader;
