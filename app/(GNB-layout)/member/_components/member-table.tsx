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
import { MEMBER_DETAIL_PAGE } from "@/constants/path";
import { MemberItem } from "@/app/api/dto/member";
import { commaWithUnit } from "@/util/price";
import TooltipRow from "@/app/_components/table/tooltip-row";
import { phoneNumberFormatter } from "@/util/number";

interface MemberTableProps {
  data: MemberItem[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
  prev: string;
}

export function MemberTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
  prev,
}: MemberTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<MemberItem>();
  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "등록일",
      maxSize: 100,
    }),
    columnHelper.accessor("name", {
      cell: (data) => {
        const row = data.row.original;
        if (row.isWithdrawn) {
          return "탈퇴한 회원입니다";
        }
        return data.getValue() || "-";
      },
      header: "이름",
    }),
    columnHelper.accessor("nickname", {
      cell: (data) => {
        const row = data.row.original;
        if (row.isWithdrawn) {
          return "-";
        }
        return data.getValue() || "-";
      },
      header: "닉네임",
    }),
    columnHelper.accessor("phoneNumber", {
      cell: (data) => {
        const phoneNumber = data.getValue();
        if (phoneNumber) {
          return phoneNumberFormatter(phoneNumber);
        }
        return "-";
      },
      header: "연락처",
    }),
    columnHelper.accessor("email", {
      cell: (data) => <TooltipRow text={data.getValue()} />,
      header: "이메일",
      minSize: 230,
    }),
    columnHelper.accessor("pointBalance", {
      cell: (data) =>
        data.getValue() ? commaWithUnit(data.getValue(), "P") : "0P",
      header: "포인트",
      maxSize: 90,
    }),
    columnHelper.accessor("couponCount", {
      cell: (data) =>
        data.getValue() ? commaWithUnit(data.getValue(), "장") : "0장",
      header: "쿠폰",
      maxSize: 90,
    }),
    columnHelper.accessor("isInfluencer", {
      cell: (data) => (data.getValue() ? "인플루언서" : "일반"),
      header: "유형",
      maxSize: 100,
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

  // 회원 상세 클릭 핸들러
  const clickMember = (row: Row<MemberItem>) => {
    const id = row.original.id;
    router.push(`${MEMBER_DETAIL_PAGE.replace("[id]", id)}?prev=${prev}`);
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
                    onClick={() => clickMember(row)}
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
