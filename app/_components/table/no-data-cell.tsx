import { TableCell, TableRow } from "@/components/ui/table";

interface NoDataCellProps {
  colSpan: number;
  text?: string;
  size?: "sm" | "md" | "lg";
}

export const NoDataCell = ({ colSpan, text, size = "lg" }: NoDataCellProps) => {
  const sizeClass = {
    sm: "h-[100px]",
    md: "h-[150px]",
    lg: "h-[200px]",
  };
  return (
    <TableRow>
      <TableCell
        className={`${sizeClass[size]} text-subtitle-1 text-label-alternative`}
        size={"lg"}
        colSpan={colSpan}
      >
        {text || "데이터가 존재하지 않습니다."}
      </TableCell>
    </TableRow>
  );
};
