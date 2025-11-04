import * as React from "react";
import {
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { NoDataCell } from "@/app/_components/table/no-data-cell";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import Pagination from "@/app/_components/pagination";
import formattedDate from "@/util/date";
import { AccommodationCompanyItem } from "@/app/api/dto/accommodation";
import {
  ACCOMMODATION_CATEGORY_LABEL,
  ACCOMMODATION_MAIN_LOCATION_LABEL,
} from "@/constants/accommodation";
import { phoneNumberFormatter } from "@/util/number";
import CreateCtaButton from "@/app/_components/button/create-cta-button";
import { COMPANY_NEW_PAGE } from "@/constants/path";
import { useRouter } from "next/navigation";

interface CompanyTableProps {
  data: AccommodationCompanyItem[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number;
  selectedCompanyId: string | null;
  setSelectedCompanyId: (companyId: string) => void;
  setSelectedCompany: React.Dispatch<
    React.SetStateAction<AccommodationCompanyItem | null>
  >;
}

function CompanyTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
  selectedCompanyId,
  setSelectedCompanyId,
  setSelectedCompany,
}: CompanyTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<AccommodationCompanyItem>();

  const columns = React.useMemo(() => {
    const baseColumns = [
      columnHelper.accessor("createdAt", {
        cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
        header: "생성일",
      }),
      columnHelper.accessor("category", {
        cell: (data) => ACCOMMODATION_CATEGORY_LABEL[data.getValue()],
        header: "숙소 유형",
      }),
      columnHelper.accessor("mainLocation", {
        cell: (data) => {
          const main = ACCOMMODATION_MAIN_LOCATION_LABEL[data.getValue()];
          const sub = data.row.original.subLocation;
          return sub ? `${main} ${sub}` : main;
        },
        header: "지역",
      }),
      columnHelper.accessor("name", {
        cell: (data) => data.getValue(),
        header: "업체명",
      }),
      columnHelper.accessor("managerName", {
        cell: (data) => {
          const name = data.getValue();
          const phone = data.row.original.managerPhoneNumber;
          return `${name} (${phone ? phoneNumberFormatter(phone) : ""})`;
        },
        header: "담당자",
      }),
      // 주소
      columnHelper.accessor("address1", {
        cell: (data) => {
          const address1 = data.getValue();
          const address2 = data.row.original.address2;
          return `${address1} ${address2}`;
        },
        header: "주소",
      }),
    ];

    const radioColumn = columnHelper.accessor("id", {
      cell: (data) => (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex justify-center"
        >
          <input
            type="radio"
            name="companySelection"
            checked={selectedCompanyId === data.getValue()}
            onChange={() => {
              setSelectedCompanyId(data.getValue());
              setSelectedCompany(data.row.original);
            }}
            className="size-4"
          />
        </div>
      ),
      header: "선택",
      enableSorting: false,
    });
    return [radioColumn, ...baseColumns];
  }, [
    selectedCompanyId,
    setSelectedCompanyId,
    setSelectedCompany,
    columnHelper,
  ]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleCompanySelect = (company: AccommodationCompanyItem) => {
    setSelectedCompanyId(company.id);
    setSelectedCompany(company);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("prev", currentPage.toString());
    window.history.replaceState({}, "", url.toString());
  }, [currentPage]);

  // 업체 생성 버튼 핸들러
  const createCompany = () => {
    if (confirm("업체를 생성하시겠습니까? 기존 작업은 취소됩니다.")) {
      router.push(COMPANY_NEW_PAGE);
    }
  };
  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <div className="flex items-center justify-between">
        <TableSummaryText
          currentDataLen={data.length}
          totalDataLen={totalDataLength}
        />
        <CreateCtaButton buttonText="업체 생성" onClick={createCompany} />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, headerIndex) => {
                return (
                  <TableHead
                    className={headerIndex === 0 ? "border-x" : "border-r"}
                    key={header.id + headerIndex}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow
                key={row.id + rowIndex}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <TableCell
                    onClick={() => handleCompanySelect(row.original)}
                    size="md"
                    className={`cursor-pointer ${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                    key={cell.id + cellIndex}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <NoDataCell colSpan={columns.length} />
          )}
        </TableBody>
      </Table>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default CompanyTable;
