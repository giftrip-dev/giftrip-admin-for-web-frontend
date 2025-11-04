import PageCrumble from "@/app/_components/page-crumble";
const ExperienceCreateHeader = () => {
  return (
    <div className="flex flex-col gap-2 px-10 pt-10">
      <PageCrumble
        props={{
          icon: "product",
          type: "original",
          path: "체험단 관리",
        }}
      />
      <PageCrumble
        props={{
          type: "second",
          path: ["체험단 관리", "체험단 생성"],
        }}
      />
    </div>
  );
};

export default ExperienceCreateHeader;
