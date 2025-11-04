"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { shoppingProductSchema } from "@/schema/shopping";
import { Button } from "@/components/ui/button";
import CustomInputField from "@/components/shared/form/custom-input-field";
import { ChevronUp, ChevronDown } from "lucide-react";
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

interface ProductOptionTableProps {
  form: UseFormReturn<z.infer<typeof shoppingProductSchema>>;
  setOptionEditMode: (isEditMode: boolean) => void; // 옵션 수정 모드 활성화 여부
}

const ProductOptionTable = ({
  form,
  setOptionEditMode,
}: ProductOptionTableProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "options",
  });

  // 새 옵션 추가
  const handleAddOption = () => {
    append({
      seq: fields.length + 1,
      name: "",
      price: 0,
      stockCount: 0,
    });
  };

  // 옵션 삭제
  const handleRemoveOption = (index: number) => {
    remove(index);
    // seq 재정렬
    const currentOptions = form.getValues("options") || [];
    currentOptions.forEach((_, idx) => {
      form.setValue(`options.${idx}.seq`, idx + 1);
    });
  };

  // 옵션 순서 변경 (위로)
  const handleMoveUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
      // seq 재정렬
      const currentOptions = form.getValues("options") || [];
      currentOptions.forEach((_, idx) => {
        form.setValue(`options.${idx}.seq`, idx + 1);
      });
    }
  };

  // 옵션 순서 변경 (아래로)
  const handleMoveDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
      // seq 재정렬
      const currentOptions = form.getValues("options") || [];
      currentOptions.forEach((_, idx) => {
        form.setValue(`options.${idx}.seq`, idx + 1);
      });
    }
  };

  // 설정/저장 버튼 클릭
  const handleToggleEditMode = () => {
    if (isEditMode) {
      // 저장 시 유효성 검사
      const currentOptions = form.getValues("options") || [];
      const hasEmptyFields = currentOptions.some(
        (option) =>
          !option.name ||
          !option.name.trim() ||
          option.price === undefined ||
          option.price === null,
      );

      if (hasEmptyFields) {
        toast({
          title: "옵션 저장 실패",
          description: "모든 옵션의 이름과 가격을 입력해주세요.",
        });
        return;
      }

      // 저장 로직 (필요시 추가)
      setOptionEditMode(false);
      setIsEditMode(false);
      toast({
        title: "저장 완료",
        description: "옵션이 성공적으로 저장되었습니다.",
      });
    } else {
      // 옵션이 없으면 하나 추가
      if (fields.length === 0) {
        handleAddOption();
      }
      setOptionEditMode(true);
      setIsEditMode(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h3 className="text-title-1">상품옵션</h3>
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
      {fields.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              {isEditMode ? (
                <>
                  <TableHead>편집</TableHead>
                  <TableHead>옵션명</TableHead>
                  <TableHead>가격설정</TableHead>
                  <TableHead>관리</TableHead>
                </>
              ) : (
                <>
                  <TableHead>No</TableHead>
                  <TableHead>옵션명</TableHead>
                  <TableHead>가격</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                {isEditMode ? (
                  <>
                    {/* 편집 (순서 변경) */}
                    <TableCell size="md">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className="size-6 p-1"
                        >
                          <ChevronUp className="size-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === fields.length - 1}
                          className="size-6 p-1"
                        >
                          <ChevronDown className="size-3" />
                        </Button>
                      </div>
                    </TableCell>

                    {/* 옵션명 */}
                    <TableCell size="md">
                      <CustomInputField
                        form={form}
                        name={`options.${index}.name`}
                        placeholder="옵션명을 입력하세요"
                        noMessage
                      />
                    </TableCell>

                    {/* 가격설정 */}
                    <TableCell size="md">
                      <CustomInputField
                        form={form}
                        name={`options.${index}.price`}
                        type="price"
                        placeholder="0"
                        noMessage
                      />
                    </TableCell>

                    {/* 관리 */}
                    <TableCell size="md">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveOption(index)}
                        >
                          삭제
                        </Button>
                        {index === fields.length - 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleAddOption}
                          >
                            추가
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </>
                ) : (
                  <>
                    {/* No */}
                    <TableCell size="md">
                      <span className="text-body-2">{index + 1}</span>
                    </TableCell>

                    {/* 옵션명 */}
                    <TableCell size="md">
                      <span className="text-body-2">
                        {form.watch(`options.${index}.name`) || "-"}
                      </span>
                    </TableCell>

                    {/* 가격 */}
                    <TableCell size="md">
                      <span className="text-body-2">
                        {form.watch(`options.${index}.price`)
                          ? `${form.watch(`options.${index}.price`).toLocaleString()}원`
                          : "0원"}
                      </span>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* 옵션이 없을 때 */}
      {fields.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <p className="text-body-2">설정된 옵션이 없습니다.</p>
          <p className="mt-1 text-body-3">
            설정 버튼을 클릭하여 옵션을 추가하세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductOptionTable;
