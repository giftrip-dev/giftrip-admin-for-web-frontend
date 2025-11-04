import PageCrumble from "@/app/_components/page-crumble";
import CompanyForm from "../_components/company-form";

const NewAccommodationCompanyPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 px-10 pt-10">
        <PageCrumble
          props={{
            icon: "product",
            type: "original",
            path: "숙소 업체 등록",
          }}
        />
      </div>
      <div className="px-10 pb-10">
        <CompanyForm prev={"1"} />
      </div>
    </div>
  );
};

export default NewAccommodationCompanyPage;
