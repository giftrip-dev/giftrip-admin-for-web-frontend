import ShortRow from "@/app/_components/table/short-row";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ACCOMMODATION_CATEGORY_LABEL,
  ACCOMMODATION_MAIN_LOCATION_LABEL,
} from "@/constants/accommodation";
import { phoneNumberFormatter } from "@/util/number";
import { useGetAccommodationCompanyDetail } from "@/hooks/accommodation/use-get-company-detail";
import Loading from "@/components/shared/loading/loading";

interface CompanyInfoBoxProps {
  accommodationId: string;
}

const CompanyInfoBox = ({ accommodationId }: CompanyInfoBoxProps) => {
  const { data: companyData, isLoading } =
    useGetAccommodationCompanyDetail(accommodationId);

  if (isLoading || !companyData) return <Loading />;

  const location =
    ACCOMMODATION_MAIN_LOCATION_LABEL[companyData.mainLocation] +
    " " +
    (companyData.subLocation || "");
  const phoneNumberText = companyData.managerPhoneNumber
    ? phoneNumberFormatter(companyData.managerPhoneNumber)
    : "-";
  return (
    <div className="flex flex-col gap-3">
      <p className="text-title-1">업체 정보</p>
      <div>
        <ShortRow isLastRow size="md" label="업체 정보" value={""}>
          <div className="w-full py-4">
            <Table className="border-x border-b">
              <TableHeader>
                <TableRow>
                  <TableHead>숙소 유형</TableHead>
                  <TableHead>지역</TableHead>
                  <TableHead>업체명</TableHead>
                  <TableHead>관리자</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell size="md">
                    <p>{ACCOMMODATION_CATEGORY_LABEL[companyData.category]}</p>
                  </TableCell>
                  <TableCell size="md">
                    <p>{location}</p>
                  </TableCell>
                  <TableCell size="md">
                    <p>{companyData.name}</p>
                  </TableCell>
                  <TableCell size="md">
                    <p>
                      {companyData.managerName} ({phoneNumberText})
                    </p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </ShortRow>
      </div>
    </div>
  );
};

export default CompanyInfoBox;
