import PageCrumble from "@/app/_components/page-crumble";
const ExperienceCreateHeader = () => {
  return (
    <div className="flex flex-col px-10 pt-10">
      <PageCrumble
        props={{
          icon: "product",
          type: "original",
          path: "여행 관리",
        }}
      />
      <PageCrumble
        props={{
          type: "second",
          path: ["여행 관리", "여행 생성"],
        }}
      />
    </div>
  );
};

export default ExperienceCreateHeader;
