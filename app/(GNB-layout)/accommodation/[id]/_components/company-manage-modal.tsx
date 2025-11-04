import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AccommodationCompanyItem } from "@/app/api/dto/accommodation";
import CompanyModalHeader from "./company-modal-header";
import CompanyFilterBox from "./company-filter-box";
import CompanyTableContainer from "./company-table-container";

const CompanyManageModal = ({
  isOpen,
  onClose,
  onSelectCompany,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectCompany: (company: AccommodationCompanyItem) => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [duration, setDuration] = useState<{ start?: Date; end?: Date }>({
    start: undefined,
    end: undefined,
  });
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  );
  const [selectedCompany, setSelectedCompany] =
    useState<AccommodationCompanyItem | null>(null);

  // 모달 닫기 핸들러
  const closeModal = () => {
    setSelectedCompanyId(null);
    setSelectedCompany(null);
    setKeyword("");
    setDuration({ start: undefined, end: undefined });
    setCurrentPage(1);
    onClose();
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    isOpen ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="flex min-h-[706px] w-[1000px] flex-col gap-8 overflow-x-auto rounded-lg bg-white p-6">
          <CompanyModalHeader
            selectedCompany={selectedCompany}
            onClose={closeModal}
            onSelectCompany={onSelectCompany}
          />
          <CompanyFilterBox
            setCurrentPage={setCurrentPage}
            keyword={keyword}
            duration={duration}
            setKeyword={setKeyword}
            setDuration={setDuration}
          />
          <CompanyTableContainer
            setSelectedCompanyId={setSelectedCompanyId}
            setSelectedCompany={setSelectedCompany}
            selectedCompanyId={selectedCompanyId}
            keyword={keyword}
            duration={duration}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    ) : null,
    document.getElementById("portal-root") || document.body,
  );
};

export default CompanyManageModal;
