import { cn } from "@/lib/utils";

interface StatusChipProps {
  status: string;
  color: "green" | "blue" | "red" | "success";
  className?: string;
}

const StatusChip = ({ status, color, className }: StatusChipProps) => {
  const colorClass = {
    green: "bg-[#CBFFF2]",
    blue: "bg-[#BDD2FF]",
    success: "bg-status-clear text-white",
    red: "bg-status-error text-white",
  };
  return (
    <p
      className={cn(
        "rounded-sm shrink-0 px-3 py-1 text-title-3",
        colorClass[color],
        className,
      )}
    >
      {status}
    </p>
  );
};

export default StatusChip;
