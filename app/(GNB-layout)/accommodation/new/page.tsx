import AccommodationForm from "../[id]/_components/accommodation-form";
import AccommodationCreateHeader from "../_components/accommodation-create-header";

const NewCampaignPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <AccommodationCreateHeader />
      <div className="px-10 pb-10">
        <AccommodationForm mode="create" prev={"1"} />
      </div>
    </div>
  );
};

export default NewCampaignPage;
