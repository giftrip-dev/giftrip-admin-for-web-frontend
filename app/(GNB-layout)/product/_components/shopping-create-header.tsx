import PageCrumble from "@/app/_components/page-crumble";
const ShoppingCreateHeader = () => {
  return (
    <div className="flex flex-col gap-2 px-10 pt-10">
      <PageCrumble
        props={{
          icon: "product",
          type: "original",
          path: "쇼핑 상품 관리",
        }}
      />
      <PageCrumble
        props={{
          type: "second",
          path: ["쇼핑 상품 관리", "쇼핑 상품 생성"],
        }}
      />
    </div>
  );
};

export default ShoppingCreateHeader;
