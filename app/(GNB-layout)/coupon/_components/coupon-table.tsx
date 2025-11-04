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
import { useRouter } from "next/navigation";
import { COUPON_DETAIL_PAGE, COUPON_NEW_PAGE } from "@/constants/path";
import CreateCtaButton from "@/app/_components/button/create-cta-button";
import { CouponItem } from "@/app/api/dto/coupon";
import { COUPON_SCOPE_LABEL, COUPON_TYPE_LABEL } from "@/constants/coupon";

interface CouponTableProps {
  data: CouponItem[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
  prev: string;
}

export function CouponTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
  prev,
}: CouponTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<CouponItem>();
  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "생성일",
      maxSize: 80,
    }),
    columnHelper.accessor("itemType", {
      cell: (data) => COUPON_TYPE_LABEL[data.getValue()],
      header: "카테고리",
      maxSize: 80,
    }),
    columnHelper.accessor("name", {
      cell: (data) => data.getValue(),
      header: "쿠폰명",
      size: 200,
    }),
    columnHelper.accessor("startDate", {
      cell: (data) => {
        if (data.row.original.startDate && data.row.original.endDate) {
          return (
            formattedDate(data.row.original.startDate, "YYYY/MM/DD") +
            " ~ " +
            formattedDate(data.row.original.endDate, "YYYY/MM/DD")
          );
        }
        return "기간 없음";
      },
      header: "적용 기간",
      maxSize: 160,
    }),
    columnHelper.accessor("discountRate", {
      cell: (data) => data.getValue() + "%",
      header: "할인율",
      size: 80,
    }),
    columnHelper.accessor("scope", {
      cell: (data) => COUPON_SCOPE_LABEL[data.getValue()],
      header: "사용 범위",
      size: 120,
    }),

    columnHelper.accessor("isExpired", {
      cell: (data) =>
        data.getValue() ? (
          <span className="text-status-error">만료</span>
        ) : (
          <span className="text-status-clear">유효</span>
        ),
      header: "만료 상태",
      size: 100,
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
    enableColumnResizing: false,
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

  // 쿠폰 클릭 핸들러
  const clickCoupon = (row: Row<CouponItem>) => {
    const id = row.original.id;
    router.push(`${COUPON_DETAIL_PAGE.replace("[id]", id)}?prev=${prev}`);
  };

  // 쿠폰 생성 클릭 핸들러
  const clickCreateCoupon = () => {
    router.push(COUPON_NEW_PAGE);
  };

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <div className="flex items-center justify-between">
        <TableSummaryText
          currentDataLen={data.length}
          totalDataLen={totalDataLength}
        />
        <CreateCtaButton onClick={clickCreateCoupon} />
      </div>
      <Table className="table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header, headerIndex) => {
                return (
                  <TableHead
                    className={headerIndex === 0 ? "border-x" : "border-r"}
                    key={header.id + headerIndex}
                    style={{ width: `${header.getSize()}px` }}
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
                    onClick={() => clickCoupon(row)}
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
