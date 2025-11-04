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
import { CouponItem } from "@/app/api/dto/coupon";
import { COUPON_SCOPE_LABEL, COUPON_TYPE_LABEL } from "@/constants/coupon";

interface CouponTableForUserProps {
  data: CouponItem[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
  selectedCouponId: string | null; // 선택된 쿠폰 ID
  setSelectedCouponId: (couponId: string) => void; // 쿠폰 선택 핸들러
}

export function CouponTableForUser({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
  selectedCouponId,
  setSelectedCouponId,
}: CouponTableForUserProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<CouponItem>();

  const columns = React.useMemo(() => {
    const baseColumns = [
      columnHelper.accessor("createdAt", {
        cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
        header: "생성일",
      }),
      columnHelper.accessor("itemType", {
        cell: (data) => COUPON_TYPE_LABEL[data.getValue()],
        header: "카테고리",
      }),
      columnHelper.accessor("name", {
        cell: (data) => data.getValue(),
        header: "쿠폰명",
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
      }),
      columnHelper.accessor("discountRate", {
        cell: (data) => data.getValue() + "%",
        header: "할인율",
      }),
      columnHelper.accessor("scope", {
        cell: (data) => COUPON_SCOPE_LABEL[data.getValue()],
        header: "사용 범위",
      }),
      columnHelper.accessor("isExpired", {
        cell: (data) =>
          data.getValue() ? (
            <span className="text-status-error">만료</span>
          ) : (
            <span className="text-status-clear">유효</span>
          ),
        header: "만료 상태",
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
            name="couponSelection"
            checked={selectedCouponId === data.getValue()}
            onChange={() => {
              setSelectedCouponId(data.getValue());
            }}
            className="size-4"
          />
        </div>
      ),
      header: "선택",
      enableSorting: false,
    });
    return [radioColumn, ...baseColumns];
  }, [selectedCouponId, setSelectedCouponId, columnHelper]);

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

  // 쿠폰 선택 핸들러
  const handleCouponSelect = (coupon: CouponItem) => {
    setSelectedCouponId(coupon.id);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("prev", currentPage.toString());
    window.history.replaceState({}, "", url.toString());
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <div className="flex items-center justify-between">
        <TableSummaryText
          currentDataLen={data.length}
          totalDataLen={totalDataLength}
        />
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
                    onClick={() => handleCouponSelect(row.original)}
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
