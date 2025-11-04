import PageCrumble from "@/app/_components/page-crumble";
import ExperienceReviewContainer from "./(tab-layout)/experience/_components/experience-container";

const ReviewPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <PageCrumble
        props={{ icon: "review", type: "original", path: "리뷰 관리" }}
      />
      <ExperienceReviewContainer />
    </div>
  );
};

export default ReviewPage;
