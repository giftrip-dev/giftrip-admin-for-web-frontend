"use client";

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
import { NoDataCell } from "@/app/_components/table/no-data-cell";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import Pagination from "@/app/_components/pagination";
import formattedDate from "@/util/date";
import {
  MemberReservationItem,
  ReservationStatus,
} from "@/app/api/dto/reservation";
import { useGetMemberReservationList } from "@/hooks/reservation/use-get-member-reservation-list";
import { commaWithUnit } from "@/util/price";
import { useState } from "react";
import StatusChip from "@/app/_components/chip/status-chip";
import { PRODUCT_TYPES, PRODUCT_TYPES_LABEL } from "@/constants/product";
import Link from "next/link";
import TooltipRow from "@/app/_components/table/tooltip-row";
import { RESERVATION_STATUS_LABEL } from "@/constants/reservation";

interface MemberReservationTableProps {
  memberId: string;
}

const MemberReservationTable = ({ memberId }: MemberReservationTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // 예약 목록 조회
  const { data, isLoading } = useGetMemberReservationList(memberId, {
    page: currentPage,
    limit: 10,
  });

  const columnHelper = createColumnHelper<MemberReservationItem>();
  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "예약일",
      maxSize: 120,
    }),
    columnHelper.accessor("reservationNumber", {
      cell: (data) => {
        const itemType = data.row.original.itemType;
        return (
          <Link
            href={`/reservation/${itemType}/${data.row.original.id}`}
            className="w-full text-blue-700 underline"
          >
            <TooltipRow text={data.getValue()} />
          </Link>
        );
      },
      header: "예약 ID",
      minSize: 160,
    }),
    columnHelper.accessor("itemType", {
      cell: (data) => PRODUCT_TYPES_LABEL[data.getValue()],
      header: "유형",
      maxSize: 80,
    }),
    columnHelper.accessor("itemTitle", {
      cell: (data) => data.getValue(),
      header: "상품명",
      minSize: 200,
    }),
    columnHelper.accessor("ordererName", {
      cell: (data) => data.getValue(),
      header: "예약자",
      maxSize: 100,
    }),
    columnHelper.accessor("guestCount", {
      cell: (data) => commaWithUnit(data.getValue(), "명"),
      header: "인원",
      maxSize: 80,
    }),
    columnHelper.accessor("experienceDate", {
      cell: (data) => {
        const date = data.getValue();
        const itemType = data.row.original.itemType;
        if (itemType === PRODUCT_TYPES.ACCOMMODATION) {
          const checkInDate = data.row.original.checkInDate;
          const checkOutDate = data.row.original.checkOutDate;
          return `${formattedDate(checkInDate, "YYYY-MM-DD")} ~ ${formattedDate(
            checkOutDate,
            "YYYY-MM-DD",
          )}`;
        } else {
          return formattedDate(date, "YYYY-MM-DD");
        }
      },
      header: "이용일",
      maxSize: 130,
    }),
    columnHelper.accessor("paidAmount", {
      cell: (data) => commaWithUnit(data.getValue(), "원"),
      header: "결제금액",
      maxSize: 120,
    }),
    columnHelper.accessor("status", {
      cell: (data) => {
        const status = data.getValue();
        const color =
          status === ReservationStatus.CANCELLED
            ? "red"
            : status === ReservationStatus.COMPLETED
              ? "blue"
              : "green";
        return (
          <StatusChip status={RESERVATION_STATUS_LABEL[status]} color={color} />
        );
      },
      header: "상태",
      maxSize: 100,
    }),
  ];

  const table = useReactTable({
    data: data?.items || [],
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

  if (isLoading) {
    return <div className="flex justify-center py-8">로딩 중...</div>;
  }

  const currentDataLength = data?.items?.length || 0;
  const totalDataLength = data?.meta?.totalItems || 0;
  const totalPages = data?.meta?.totalPages || 1;

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryText
        currentDataLen={currentDataLength}
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
                    size="md"
                    className={`${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                    key={cell.id + cellIndex}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <NoDataCell colSpan={columns.length} text="예약 내역이 없습니다" />
          )}
        </TableBody>
      </Table>

      {currentDataLength > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MemberReservationTable;
