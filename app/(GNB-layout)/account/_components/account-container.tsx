import { useGetAccountList } from "@/hooks/account/use-get-account-list";
import FilterAndTableContainer from "./filter-and-table-container";
import { useState } from "react";

const AccountContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetAccountList({
    page: currentPage,
    limit: 3,
  });

  if (!data) return null;
  return (
    <div className="flex flex-col gap-10">
      <FilterAndTableContainer
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default AccountContainer;
