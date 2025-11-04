import { AccountTable } from "./account-table";
import { AdminAccountRes } from "@/app/api/dto/account";

interface FilterAndTableContainerProps {
  data: AdminAccountRes;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const FilterAndTableContainer = ({
  data,
  currentPage,
  setCurrentPage,
}: FilterAndTableContainerProps) => {
  return (
    <>
      <AccountTable
        data={data.items}
        totalDataLength={data.meta.totalItems}
        totalPages={data.meta.totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={3}
      />
    </>
  );
};
export default FilterAndTableContainer;
