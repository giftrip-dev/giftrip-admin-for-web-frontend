import PageCrumble from "@/app/_components/page-crumble";

const MainBannerCrumble = () => {
  return (
    <PageCrumble
      props={{
        type: "second",
        path: ["메인 배너 관리", "메인 배너 상세"],
      }}
    />
  );
};

export default MainBannerCrumble;
