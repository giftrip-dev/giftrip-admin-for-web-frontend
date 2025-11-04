import { AppliedCoupon } from "@/app/api/dto/coupon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NoDataCell } from "@/app/_components/table/no-data-cell";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import formattedDate from "@/util/date";

interface AppliedCouponTableProps {
  coupon: AppliedCoupon | null;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

const AppliedCouponTable = ({
  coupon,
  showRemoveButton = false,
  onRemove,
}: AppliedCouponTableProps) => {
  if (!coupon) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>혜택명</TableHead>
            <TableHead>할인율</TableHead>
            <TableHead>기간</TableHead>
            {showRemoveButton && <TableHead className="w-20">제거</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          <NoDataCell
            colSpan={showRemoveButton ? 4 : 3}
            size="md"
            text="적용된 혜택이 없어요"
          />
        </TableBody>
      </Table>
    );
  }

  const dateText =
    coupon.startDate && coupon.endDate
      ? `${formattedDate(coupon.startDate)} ~ ${formattedDate(coupon.endDate)}`
      : "제한 없음";

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>혜택명</TableHead>
          <TableHead>할인율</TableHead>
          <TableHead>기간</TableHead>
          {showRemoveButton && <TableHead className="w-20">제거</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell size="lg">{coupon.name}</TableCell>
          <TableCell size="lg">{coupon.discountRate + `%`}</TableCell>
          <TableCell size="lg">{dateText}</TableCell>
          {showRemoveButton && (
            <TableCell size="lg">
              <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="mx-auto rounded-full border-red-200 px-1 hover:bg-red-50"
              >
                <X className="size-5 text-red-500" />
              </Button>
            </TableCell>
          )}
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AppliedCouponTable;
