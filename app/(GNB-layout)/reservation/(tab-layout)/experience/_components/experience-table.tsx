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
import { NoDataCell } from "@/app/_components/table/no-data-cell";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import Pagination from "@/app/_components/pagination";
import formattedDate from "@/util/date";
import { ExperienceReservationItem } from "@/app/api/dto/reservation";
import { useRouter } from "next/navigation";
import { RESERVATION_EXPERIENCE_DETAIL_PAGE } from "@/constants/path";
import { EXPERIENCE_CATEGORY_LABEL } from "@/constants/experience";
import StatusChip from "@/app/_components/chip/status-chip";
import { RESERVATION_STATUS_LABEL } from "@/constants/reservation";
import { handleCommaPrice } from "@/util/price";
import { getChipColor } from "@/util/status";
interface ExperienceTableProps {
  data: ExperienceReservationItem[];
  prev: string;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
}

export function ExperienceTable({
  data,
  prev,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
}: ExperienceTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<ExperienceReservationItem>();
  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "생성일",
      maxSize: 100,
    }),
    columnHelper.accessor("category", {
      cell: (data) => EXPERIENCE_CATEGORY_LABEL[data.getValue()],
      header: "상세 분류",
      maxSize: 90,
    }),
    columnHelper.accessor("itemTitle", {
      cell: (data) => data.getValue(),
      header: "상품명 ",
      maxSize: 250,
    }),
    columnHelper.accessor("ordererName", {
      cell: (data) => data.getValue(),
      header: "예약자",
      maxSize: 100,
    }),
    columnHelper.accessor("ordererPhoneNumber", {
      cell: (data) => data.getValue() || "정보 없음",
      header: "연락처",
    }),
    columnHelper.accessor("experienceDate", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "예약 일자",
    }),
    columnHelper.accessor("status", {
      cell: (data) => {
        return (
          <StatusChip
            color={getChipColor(data.getValue())}
            status={RESERVATION_STATUS_LABEL[data.getValue()]}
          />
        );
      },
      header: "예약 상태",
      maxSize: 100,
    }),

    // 결제 금액
    columnHelper.accessor("paidAmount", {
      cell: (data) => `${handleCommaPrice(data.getValue())}원`,
      header: "결제 금액",
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
    columnResizeMode: "onChange",
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

  // 체험 상품 클릭 핸들러
  const clickExperienceProduct = (row: Row<ExperienceReservationItem>) => {
    const id = row.original.id;
    router.push(
      `${RESERVATION_EXPERIENCE_DETAIL_PAGE.replace("[id]", id)}?prev=${prev}`,
    );
  };

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryText
        currentDataLen={data.length}
        totalDataLen={totalDataLength}
      />
      <Table className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, headerIndex) => {
                return (
                  <TableHead
                    className={headerIndex === 0 ? "border-x" : "border-r"}
                    key={header.id + headerIndex}
                    style={{
                      width: header.getSize(),
                      minWidth: header.getSize(),
                      maxWidth: header.getSize(),
                    }}
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
                    onClick={() => clickExperienceProduct(row)}
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
