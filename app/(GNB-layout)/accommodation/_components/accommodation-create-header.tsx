import PageCrumble from "@/app/_components/page-crumble";
const AccommodationCreateHeader = () => {
  return (
    <div className="flex flex-col gap-2 px-10 pt-10">
      <PageCrumble
        props={{
          icon: "product",
          type: "original",
          path: "숙소 관리",
        }}
      />
      <PageCrumble
        props={{
          type: "second",
          path: ["숙소 관리", "숙소 생성"],
        }}
      />
    </div>
  );
};

export default AccommodationCreateHeader;
