import * as React from "react";
import {
  Row,
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
import { handleCommaPrice } from "@/util/price";
import { NoDataCell } from "@/app/_components/table/no-data-cell";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import Pagination from "@/app/_components/pagination";
import formattedDate from "@/util/date";
import { AccommodationItem } from "@/app/api/dto/accommodation";
import {
  ACCOMMODATION_CATEGORY_LABEL,
  ACCOMMODATION_MAIN_LOCATION_LABEL,
} from "@/constants/accommodation";
import CreateCtaButton from "@/app/_components/button/create-cta-button";
import {
  ACCOMMODATION_PRODUCT_DETAIL_PAGE,
  ACCOMMODATION_PRODUCT_NEW_PAGE,
} from "@/constants/path";
import { useRouter } from "next/navigation";

interface AccommodationTableProps {
  data: AccommodationItem[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
  prev: string;
}

export function AccommodationTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
  prev,
}: AccommodationTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<AccommodationItem>();
  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "생성 일자",
    }),
    columnHelper.accessor("accommodationCategory", {
      cell: (data) => ACCOMMODATION_CATEGORY_LABEL[data.getValue()],
      header: "상세 분류",
    }),
    columnHelper.accessor("accommodationName", {
      cell: (data) => data.getValue(),
      header: "업체명",
    }),
    columnHelper.accessor("name", {
      cell: (data) => data.getValue(),
      header: "객실명",
    }),
    columnHelper.accessor("availableFrom", {
      cell: (data) => {
        const availableFrom = data.row.original.availableFrom;
        const availableTo = data.row.original.availableTo;
        return `${formattedDate(availableFrom, "YYYY-MM-DD")} ~ ${formattedDate(availableTo, "YYYY-MM-DD")}`;
      },
      header: "이용 가능 기간",
    }),
    columnHelper.accessor("originalPrice", {
      cell: (data) => handleCommaPrice(data.getValue()),
      header: "판매가",
    }),
    columnHelper.accessor("finalPrice", {
      cell: (data) => handleCommaPrice(data.getValue()),
      header: "할인가",
    }),
    columnHelper.accessor("mainLocation", {
      cell: (data) => {
        const mainLocation = data.row.original.mainLocation;
        const subLocation = data.row.original.subLocation;
        return `${ACCOMMODATION_MAIN_LOCATION_LABEL[mainLocation]} ${subLocation}`;
      },
      header: "지역",
    }),
    columnHelper.accessor("isActive", {
      cell: (data) =>
        data.getValue() ? (
          <span className="text-status-clear">판매 중</span>
        ) : (
          <span className="text-status-error">판매 중단</span>
        ),
      header: "판매 상태",
    }),
  ];
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

  // 숙소 상품 클릭 핸들러
  const clickAccommodationProduct = (row: Row<AccommodationItem>) => {
    const id = row.original.id;
    router.push(
      `${ACCOMMODATION_PRODUCT_DETAIL_PAGE.replace("[id]", id)}?prev=${prev}`,
    );
  };

  // 숙소 생성 버튼 핸들러
  const clickCreateAccommodation = () => {
    router.push(`${ACCOMMODATION_PRODUCT_NEW_PAGE}?prev=${prev}`);
  };

  return (
    <div className="flex min-w-[900px] flex-col gap-[15px] overflow-x-auto">
      <div className="flex items-center justify-between">
        <TableSummaryText
          currentDataLen={data.length}
          totalDataLen={totalDataLength}
        />
        <CreateCtaButton onClick={clickCreateAccommodation} />
      </div>
      <Table className="">
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
                    onClick={() => clickAccommodationProduct(row)}
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
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
