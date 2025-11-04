"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { shoppingProductSchema } from "@/schema/shopping";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface ProductOptionStockTableProps {
  form: UseFormReturn<z.infer<typeof shoppingProductSchema>>;
}

const ProductOptionStockTable = ({ form }: ProductOptionStockTableProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  const options = form.watch("options") || [];

  // 설정/저장 버튼 클릭
  const handleToggleEditMode = () => {
    if (isEditMode) {
      // 저장 시 유효성 검사
      const currentOptions = form.getValues("options") || [];
      const hasInvalidStock = currentOptions.some(
        (option) =>
          option.stockCount === undefined ||
          option.stockCount === null ||
          option.stockCount < 0,
      );

      if (hasInvalidStock) {
        toast({
          title: "재고 저장 실패",
          description: "모든 옵션의 재고 수량을 0 이상으로 입력해주세요.",
        });
        return;
      }

      // 저장 완료
      setIsEditMode(false);
      toast({
        title: "재고 저장 완료",
        description: "옵션 재고가 성공적으로 저장되었습니다.",
      });
    } else {
      setIsEditMode(true);
    }
  };

  // 옵션이 없으면 렌더링하지 않음
  if (options.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-title-1">옵션 재고</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleToggleEditMode}
        >
          {isEditMode ? "저장" : "설정"}
        </Button>
      </div>

      {/* 테이블 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>옵션명</TableHead>
            <TableHead>재고수량</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {options.map((option, index) => (
            <TableRow key={`stock-${index}`}>
              {/* No */}
              <TableCell size="md">
                <span className="text-body-2">{index + 1}</span>
              </TableCell>

              {/* 옵션명 */}
              <TableCell size="md">
                <span className="text-body-2">{option.name || "-"}</span>
              </TableCell>

              {/* 재고수량 */}
              <TableCell size="md">
                {isEditMode ? (
                  <div className="flex items-center justify-center">
                    <CustomInputField
                      form={form}
                      name={`options.${index}.stockCount`}
                      type="number"
                      placeholder="0"
                      noMessage
                      className="w-[100px]"
                    />
                    <span className="ml-2 text-body-2">개</span>
                  </div>
                ) : (
                  <span className="text-body-2">
                    {option.stockCount !== null &&
                    option.stockCount !== undefined
                      ? `${option.stockCount.toLocaleString()}개`
                      : "0개"}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductOptionStockTable;
