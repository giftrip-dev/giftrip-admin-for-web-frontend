import PageCrumble from "@/app/_components/page-crumble";
import { Button } from "@/components/ui/button";
import { AccommodationCompanyItem } from "@/app/api/dto/accommodation";

const CompanyModalHeader = ({
  selectedCompany,
  onClose,
  onSelectCompany,
}: {
  selectedCompany: AccommodationCompanyItem | null;
  onClose: () => void;
  onSelectCompany: (company: AccommodationCompanyItem) => void;
}) => {
  // 업체 선택 핸들러
  const selectCompany = () => {
    if (selectedCompany) {
      onSelectCompany(selectedCompany);
    }
  };

  return (
    <div className="flex justify-between gap-4">
      <PageCrumble
        props={{
          type: "original",
          icon: "product",
          path: "업체 선택",
        }}
      />
      <div className="flex justify-end gap-2">
        <Button onClick={onClose} variant="outline">
          취소
        </Button>
        <Button onClick={selectCompany} disabled={!selectedCompany}>
          선택
        </Button>
      </div>
    </div>
  );
};

export default CompanyModalHeader;
