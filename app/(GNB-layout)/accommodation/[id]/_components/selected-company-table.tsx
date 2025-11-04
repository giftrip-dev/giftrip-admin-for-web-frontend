import { AccommodationCompanyItem } from "@/app/api/dto/accommodation";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { NoDataCell } from "@/app/_components/table/no-data-cell";
import {
  ACCOMMODATION_CATEGORY_LABEL,
  ACCOMMODATION_MAIN_LOCATION_LABEL,
} from "@/constants/accommodation";
import { phoneNumberFormatter } from "@/util/number";

interface SelectedCompanyTableProps {
  company: AccommodationCompanyItem | null;
}

const SelectedCompanyTable = ({ company }: SelectedCompanyTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>숙소 유형</TableHead>
          <TableHead>지역</TableHead>
          <TableHead>업체명</TableHead>
          <TableHead>담당자</TableHead>
          <TableHead>담당자 연락처</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {company ? (
          <TableRow>
            <TableCell size="md">
              <span className="text-body-2">
                {ACCOMMODATION_CATEGORY_LABEL[company.category]}
              </span>
            </TableCell>
            <TableCell size="md">
              <span className="text-body-2">
                {ACCOMMODATION_MAIN_LOCATION_LABEL[company.mainLocation]}
                {company.subLocation && `[${company.subLocation}]`}
              </span>
            </TableCell>
            <TableCell size="md">
              <span className="text-body-2">{company.name}</span>
            </TableCell>
            <TableCell size="md">
              <span className="text-body-2">{company.managerName}</span>
            </TableCell>
            <TableCell size="md">
              <span className="text-body-2">
                {phoneNumberFormatter(company.managerPhoneNumber)}
              </span>
            </TableCell>
          </TableRow>
        ) : (
          <NoDataCell colSpan={5} />
        )}
      </TableBody>
    </Table>
  );
};

export default SelectedCompanyTable;
