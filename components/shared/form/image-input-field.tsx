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
import { X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

interface ImageInputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  imageSpec?: string;
  aspectRatio?: "rect" | "square";
}

export function ImageInputField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  imageSpec,
  aspectRatio = "square",
}: ImageInputFieldProps<T>) {
  const fileRef = useRef<HTMLInputElement>(null);
  const value = form.watch(name) as File | string | null;

  const handleDelete = () => {
    form.setValue(name, undefined as PathValue<T, Path<T>>);
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue(name, file as PathValue<T, Path<T>>);
      e.target.value = "";
    }
  };

  const renderPreview = () => {
    if (!value) return null;

    const src = typeof value === "string" ? value : URL.createObjectURL(value);
    return (
      <div
        className={cn(
          `relative z-10 size-full min-w-[300px] overflow-hidden`,
          aspectRatio === "square" ? "aspect-square" : "aspect-[268/124]",
        )}
      >
        <Image src={src} alt="preview" fill className="object-cover" />
        <button
          type="button"
          className="absolute right-1 top-1 rounded-full bg-white p-1"
          onClick={handleDelete}
        >
          <X size={16} />
        </button>
      </div>
    );
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({}) => (
        <FormItem
          className={`relative flex flex-col gap-4 ${
            !value ? "items-center py-[100px]" : "items-start py-4"
          }`}
        >
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="flex flex-col items-center gap-2">
              {renderPreview()}
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={handleSelectFile}
                className="hidden"
              />
              {!value && (
                <Button
                  className="max-w-max text-title-3"
                  type="button"
                  variant="outline"
                  onClick={() => fileRef.current?.click()}
                >
                  {value ? "이미지 변경" : "이미지 업로드"}
                </Button>
              )}
            </div>
          </FormControl>
          {!value && (
            <div className="flex flex-col items-center">
              {description && <FormDescription>{description}</FormDescription>}
              {imageSpec && (
                <p className="mt-2 text-body-2 text-label-alternative">
                  {imageSpec}
                </p>
              )}
            </div>
          )}
          <FormMessage className="mb-10" />
        </FormItem>
      )}
    />
  );
}
