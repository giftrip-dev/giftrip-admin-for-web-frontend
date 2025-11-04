import { LoadIcon } from "@/components/shared/loading/loading";
import { AccommodationCompanyItem } from "@/app/api/dto/accommodation";
import { useGetAccommodationCompanyList } from "@/hooks/accommodation/use-get-accommodation-company-list";
import CompanyTable from "./company-table";

interface CompanyTableContainerProps {
  keyword: string; // 검색어
  duration: { start?: Date; end?: Date }; // 생성 일자
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
  setSelectedCompanyId: React.Dispatch<React.SetStateAction<string | null>>; // 선택된 업체 ID 설정
  setSelectedCompany: React.Dispatch<
    React.SetStateAction<AccommodationCompanyItem | null>
  >; // 선택된 업체 정보 설정
  selectedCompanyId: string | null; // 선택된 업체 ID
}

const CompanyTableContainer = ({
  keyword,
  duration,
  currentPage,
  setCurrentPage,
  setSelectedCompanyId,
  setSelectedCompany,
  selectedCompanyId,
}: CompanyTableContainerProps) => {
  const { data } = useGetAccommodationCompanyList({
    page: currentPage,
    limit: 5,
    search: keyword,
    checkInDateStart: duration?.start?.toISOString(),
    checkInDateEnd: duration?.end?.toISOString(),
  });

  if (!data) return <LoadIcon />;

  return (
    <CompanyTable
      selectedCompanyId={selectedCompanyId}
      setSelectedCompanyId={setSelectedCompanyId}
      setSelectedCompany={setSelectedCompany}
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default CompanyTableContainer;
