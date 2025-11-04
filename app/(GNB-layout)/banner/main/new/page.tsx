import PageCrumble from "@/app/_components/page-crumble";
import MainBannerForm from "../_components/main-banner-form";

const NewMainBannerPage = () => {
  return (
    <div className="flex flex-col gap-10 pt-3">
      <PageCrumble
        props={{
          type: "second",
          path: ["메인 배너 관리", "메인 배너 생성"],
        }}
      />
      <MainBannerForm mode="create" />
    </div>
  );
};

export default NewMainBannerPage;
