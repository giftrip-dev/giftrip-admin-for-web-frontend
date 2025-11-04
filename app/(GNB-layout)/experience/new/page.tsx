import ExperienceForm from "../[id]/_components/experience-form";
import ExperienceCreateHeader from "../_components/experience-create-header";

const NewExperiencePage = () => {
  return (
    <div className="flex flex-col gap-8">
      <ExperienceCreateHeader />
      <div className="px-10 pb-10">
        <ExperienceForm mode="create" />
      </div>
    </div>
  );
};

export default NewExperiencePage;
