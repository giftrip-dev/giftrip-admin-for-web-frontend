import PageCrumble from "@/app/_components/page-crumble";

interface OrderDetailHeaderProps {
  children: React.ReactNode;
}

const OrderDetailHeader = ({ children }: OrderDetailHeaderProps) => {
  return (
    <div className="relative flex justify-between bg-[#32333C] px-8 pb-6 pt-8">
      <div className="flex flex-col gap-2">
        <PageCrumble
          props={{
            icon: "order",
            type: "original",
            path: "주문 관리",
            color: "white",
          }}
        />
        <PageCrumble
          props={{
            type: "second",
            path: ["주문 관리", "주문 상세"],
            color: "white",
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default OrderDetailHeader;
