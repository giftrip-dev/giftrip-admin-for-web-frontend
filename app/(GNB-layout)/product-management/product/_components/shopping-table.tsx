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
import { ShoppingItem } from "@/app/api/dto/shopping";
import { SHOPPING_CATEGORY_LABEL } from "@/constants/shopping";
import {
  SHOPPING_PRODUCT_DETAIL_PAGE,
  SHOPPING_PRODUCT_NEW_PAGE,
} from "@/constants/path";
import { useRouter } from "next/navigation";
import CreateCtaButton from "@/app/_components/button/create-cta-button";
import { EXPOSURE_TAG_LABEL } from "@/constants/product";

interface ShoppingTableProps {
  prev: string;
  data: ShoppingItem[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
}

export function ShoppingTable({
  prev,
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
}: ShoppingTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<ShoppingItem>();
  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "생성 일자",
    }),

    columnHelper.accessor("category", {
      cell: (data) => SHOPPING_CATEGORY_LABEL[data.getValue()],
      header: "상세 분류",
    }),

    columnHelper.accessor("name", {
      cell: (data) => data.getValue(),
      header: "상품명",
    }),

    columnHelper.accessor("originalPrice", {
      cell: (data) => handleCommaPrice(data.getValue()),
      header: "판매가",
    }),
    columnHelper.accessor("finalPrice", {
      cell: (data) => {
        const hasDiscount = data.row.original.hasDiscount;
        if (hasDiscount) {
          return handleCommaPrice(data.getValue());
        }
        return "-";
      },
      header: "할인가",
    }),
    columnHelper.accessor("exposureTags", {
      cell: (data) =>
        data.getValue() ? EXPOSURE_TAG_LABEL[data.getValue()[0]] : "-",
      header: "홈 진열 상태",
    }),
    columnHelper.accessor("isAvailableToPurchase", {
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

  // 쇼핑 상품 클릭 핸들러
  const clickShoppingProduct = (row: Row<ShoppingItem>) => {
    const id = row.original.id;
    router.push(
      SHOPPING_PRODUCT_DETAIL_PAGE.replace("[id]", id) + `?prev=${prev}`,
    );
  };

  // 쇼핑 상품 생성 버튼 핸들러
  const clickCreateShoppingProduct = () => {
    router.push(SHOPPING_PRODUCT_NEW_PAGE + `?prev=${prev}`);
  };

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <div className="flex items-center justify-between">
        <TableSummaryText
          currentDataLen={data.length}
          totalDataLen={totalDataLength}
        />
        <CreateCtaButton onClick={clickCreateShoppingProduct} />
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
                    onClick={() => clickShoppingProduct(row)}
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
