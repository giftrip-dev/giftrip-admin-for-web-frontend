import FilterName from "@/app/_components/table/filter-name";
import { ReactNode } from "react";
interface ShortRowProps {
  label?: string; // 행 제목
  value: string | number; // 행 값
  isLastRow?: boolean; // 마지막 행 여부
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  rowClass?: string;
  noBorder?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

const ShortRow = ({
  label,
  value,
  size,
  isLastRow,
  children,
  rowClass,
  noBorder,
}: ShortRowProps) => {
  return (
    <div
      className={`flex ${isLastRow ? "border-b" : ""} ${noBorder ? "" : "border-x border-t"} ${rowClass}`}
    >
      {label && <FilterName size={size ?? "sm"} name={label} />}
      <div
        className={`flex w-full items-center truncate px-5 ${size === "sm" ? "text-body-2" : "text-body-2"}`}
      >
        {children ?? value}
      </div>
    </div>
  );
};
export default ShortRow;
