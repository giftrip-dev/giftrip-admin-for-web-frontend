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
import { useEffect } from "react";
import { NoDataCell } from "@/app/_components/table/no-data-cell";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import Pagination from "@/app/_components/pagination";
import formattedDate from "@/util/date";
import { useRouter } from "next/navigation";
import { SUB_BANNER_DETAIL_PAGE, SUB_BANNER_NEW_PAGE } from "@/constants/path";
import { BannerItem } from "@/app/api/dto/banner";
import Image from "next/image";
import CreateCtaButton from "@/app/_components/button/create-cta-button";

interface SubBannerTableProps {
  data: BannerItem[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
}

export function SubBannerTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
}: SubBannerTableProps) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<BannerItem>();
  const columns = [
    columnHelper.accessor("createdAt", {
      cell: (data) => formattedDate(data.getValue(), "YYYY-MM-DD"),
      header: "생성 일자",
    }),

    columnHelper.accessor("imageUrl", {
      cell: (data) => (
        <div className="flex items-center justify-center">
          <Image
            src={data.getValue()}
            alt="배너 이미지"
            width={164}
            height={164}
          />
        </div>
      ),
      header: "이미지",
    }),

    columnHelper.accessor("title", {
      cell: (data) => data.getValue(),
      header: "배너명",
    }),

    columnHelper.accessor("displayOrder", {
      cell: (data) => {
        const isTopBanner = data.getValue() === 0;
        return isTopBanner ? "상단" : "하단";
      },
      header: "섹션",
    }),
    columnHelper.accessor("isActive", {
      cell: (data) =>
        data.getValue() ? (
          <span className="text-status-clear">공개</span>
        ) : (
          <span className="text-status-error">비공개</span>
        ),
      header: "공개 상태",
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

  // 체험 상품 클릭 핸들러
  const clickBanner = (row: Row<BannerItem>) => {
    const id = row.original.id;
    router.push(`${SUB_BANNER_DETAIL_PAGE.replace("[id]", id)}`);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("prev", currentPage.toString());
    window.history.replaceState({}, "", url.toString());
  }, [currentPage]);

  // 배너 생성 핸들러
  const clickCreateBanner = () => {
    router.push(SUB_BANNER_NEW_PAGE);
  };

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <div className="flex items-center justify-between">
        <TableSummaryText
          currentDataLen={data.length}
          totalDataLen={totalDataLength}
        />
        <CreateCtaButton onClick={clickCreateBanner} />
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
                    onClick={() => clickBanner(row)}
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
