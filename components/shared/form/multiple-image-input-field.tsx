"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface MultipleImageInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  imageSpec?: string;
  aspectRatio?: "rect" | "square";
  maxImages?: number;
}

export function MultipleImageInputField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  imageSpec,
  aspectRatio = "square",
  maxImages = 5,
}: MultipleImageInputFieldProps<T>) {
  const fileRef = useRef<HTMLInputElement>(null);
  const value = form.watch(name) as (File | string)[] | undefined;
  const images = value || [];

  const handleDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    form.setValue(name, newImages as PathValue<T, Path<T>>);
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const remainingSlots = maxImages - images.length;
      const filesToAdd = files.slice(0, remainingSlots);
      const newImages = [...images, ...filesToAdd];
      form.setValue(name, newImages as PathValue<T, Path<T>>);
      e.target.value = "";
    }
  };

  const renderImagePreview = (image: File | string, index: number) => {
    const src = typeof image === "string" ? image : URL.createObjectURL(image);
    return (
      <div
        key={index}
        className={cn(
          "relative overflow-hidden rounded-lg border",
          aspectRatio === "square" ? "aspect-square" : "aspect-[268/124]",
          "w-[300px]",
        )}
      >
        <Image
          src={src}
          alt={`preview ${index + 1}`}
          fill
          className="object-cover"
        />
        <button
          type="button"
          className="absolute right-1 top-1 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
          onClick={() => handleDelete(index)}
        >
          <X size={14} />
        </button>
      </div>
    );
  };

  const canAddMore = images.length < maxImages;

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="flex flex-col gap-4">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="flex flex-col gap-4">
              {/* 이미지 미리보기 그리드 */}
              {images.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {images.map((image, index) =>
                    renderImagePreview(image, index),
                  )}
                </div>
              )}

              {/* 파일 선택 입력 */}
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileRef}
                onChange={handleSelectFiles}
                className="hidden"
              />

              {/* 업로드 버튼 */}
              {canAddMore && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileRef.current?.click()}
                  className="w-fit"
                >
                  <Plus size={16} className="mr-2" />
                  이미지 추가 ({images.length}/{maxImages})
                </Button>
              )}

              {/* 설명 텍스트 */}
              {images.length === 0 && (
                <div className="flex flex-col items-center py-8 text-center">
                  {description && (
                    <FormDescription className="mb-2">
                      {description}
                    </FormDescription>
                  )}
                  {imageSpec && (
                    <p className="text-body-2 text-label-alternative">
                      {imageSpec}
                    </p>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
