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
import { ORDER_PRODUCT_DETAIL_PAGE } from "@/constants/path";
import { DeliveryStatus, OrderItem, OrderStatus } from "@/app/api/dto/order";
import { handleCommaPrice } from "@/util/price";
import {
  DELIVERY_STATUS_LABEL,
  ORDER_STATUS_LABEL,
  PAYMENT_STATUS_LABEL,
} from "@/constants/order";
import TooltipRow from "@/app/_components/table/tooltip-row";
import StatusChip from "@/app/_components/chip/status-chip";

interface OrderTableProps {
  data: OrderItem[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
  prev: string;
}

export function OrderTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
  prev,
}: OrderTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<OrderItem>();
  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "주문일자",
      maxSize: 100,
    }),

    columnHelper.accessor("itemTitle", {
      cell: (data) => {
        const orderName =
          data.row.original.itemCount > 1
            ? `${data.row.original.itemTitle} 외 ${data.row.original.itemCount - 1}건`
            : data.row.original.itemTitle;
        return orderName;
      },
      header: "상품명",
      minSize: 250,
    }),
    columnHelper.accessor("itemCount", {
      cell: (data) => data.getValue(),
      header: "상품 개수",
      maxSize: 70,
    }),
    columnHelper.accessor("orderNumber", {
      cell: (data) => <TooltipRow text={data.getValue()} />,
      header: "주문 번호",
      size: 140,
    }),
    columnHelper.accessor("ordererName", {
      cell: (data) => data.getValue(),
      header: "주문자",
      size: 80,
    }),
    columnHelper.accessor("ordererPhoneNumber", {
      cell: (data) => data.getValue(),
      header: "연락처",
      size: 120,
    }),
    columnHelper.accessor("deliveryStatus", {
      cell: (data) => (
        <StatusChip
          status={DELIVERY_STATUS_LABEL[data.getValue()]}
          color={data.getValue() === DeliveryStatus.PENDING ? "green" : "blue"}
        />
      ),
      header: "배송 상태",
      size: 110,
    }),
    columnHelper.accessor("paidAmount", {
      cell: (data) => handleCommaPrice(data.getValue(), "원"),
      header: "결제 금액",
      size: 100,
    }),
    columnHelper.accessor("paymentStatus", {
      cell: (data) => PAYMENT_STATUS_LABEL[data.getValue()],
      header: "결제 상태",
      size: 100,
    }),
    // 주문 상태
    columnHelper.accessor("status", {
      cell: (data) => {
        const isCanceled = data.getValue() === OrderStatus.CANCELED;
        return (
          <p className={isCanceled ? "font-semibold text-status-error" : ""}>
            {ORDER_STATUS_LABEL[data.getValue()]}
          </p>
        );
      },
      header: "주문 상태",
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
  const clickBanner = (row: Row<OrderItem>) => {
    const id = row.original.id;
    router.push(
      `${ORDER_PRODUCT_DETAIL_PAGE.replace("[id]", id)}?prev=${prev}`,
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
                    onClick={() => clickBanner(row)}
                    size="md"
                    className={`cursor-pointer ${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                    key={cell.id + cellIndex}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                    }}
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
