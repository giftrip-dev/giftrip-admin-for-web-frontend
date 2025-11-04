import ShortRow from "@/app/_components/table/short-row";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { accommodationProductSchema } from "@/schema/accommodation";
import { Button } from "@/components/ui/button";
import SelectedCompanyTable from "./selected-company-table";
import CompanyManageModal from "./company-manage-modal";
import { useState, useEffect } from "react";
import { AccommodationCompanyItem } from "@/app/api/dto/accommodation";

interface CompanyInfoBoxProps {
  form: UseFormReturn<z.infer<typeof accommodationProductSchema>>;
  initialCompany?: AccommodationCompanyItem | null;
}

const CompanyInfoBox = ({ form, initialCompany }: CompanyInfoBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] =
    useState<AccommodationCompanyItem | null>(initialCompany || null);

  // initialCompany가 변경되면 selectedCompany 업데이트
  useEffect(() => {
    if (initialCompany) {
      setSelectedCompany(initialCompany);
    }
  }, [initialCompany]);

  const handleSelectCompany = (company: AccommodationCompanyItem) => {
    setSelectedCompany(company);
    form.setValue("accommodationId", company.id);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">업체 정보</p>
      <div>
        <ShortRow label="업체 등록" value={""} size="md">
          <div className="flex w-full flex-col gap-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-title-2">선택된 업체</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                업체 관리
              </Button>
            </div>
            <SelectedCompanyTable company={selectedCompany} />
          </div>
        </ShortRow>
      </div>

      <CompanyManageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectCompany={handleSelectCompany}
      />
    </div>
  );
};

export default CompanyInfoBox;
