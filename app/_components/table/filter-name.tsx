interface FilterNameProps {
  name: string;
  size?: "sm" | "md" | "lg"; // default md
}

const FilterName = ({ name, size }: FilterNameProps) => {
  const sizeClass: Record<"sm" | "md" | "lg", string> = {
    sm: "h-10",
    md: "min-h-[72px]",
    lg: "min-h-[86px]",
  };
  return (
    <p
      className={`flex w-[154px] shrink-0 items-center border-r bg-gray-100 px-5 text-body-3 ${sizeClass[size ?? "md"]}`}
    >
      {name}
    </p>
  );
};
export default FilterName;
