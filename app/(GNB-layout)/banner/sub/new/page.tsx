import PageCrumble from "@/app/_components/page-crumble";
import SubBannerForm from "../_components/sub-banner-form";

const NewSubBannerPage = () => {
  return (
    <div className="flex flex-col gap-10 pt-3">
      <PageCrumble
        props={{
          type: "second",
          path: ["서브 배너 관리", "서브 배너 생성"],
        }}
      />
      <SubBannerForm mode="create" />
    </div>
  );
};

export default NewSubBannerPage;
