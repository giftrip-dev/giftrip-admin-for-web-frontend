import CampaignForm from "../[id]/_components/campaign-form";
import CampaignCreateHeader from "../_components/campaign-create-header";

const NewCampaignPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <CampaignCreateHeader />
      <div className="px-10 pb-10">
        <CampaignForm mode="create" prev={"1"} />
      </div>
    </div>
  );
};

export default NewCampaignPage;
