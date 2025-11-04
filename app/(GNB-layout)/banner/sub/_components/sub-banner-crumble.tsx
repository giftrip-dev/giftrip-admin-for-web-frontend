import PageCrumble from "@/app/_components/page-crumble";

const SubBannerCrumble = () => {
  return (
    <PageCrumble
      props={{
        type: "second",
        path: ["서브 배너 관리", "서브 배너 상세"],
      }}
    />
  );
};

export default SubBannerCrumble;
