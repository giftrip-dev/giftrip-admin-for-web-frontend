"use client";

import PageCrumble from "@/app/_components/page-crumble";
import ShoppingForm from "../_components/shopping-form";
import { useParams, useSearchParams } from "next/navigation";

const EditShoppingProductPage = () => {
  const params = useParams();
  const prev = useSearchParams().get("prev") || "1";
  const shoppingProductId = params.id as string;

  return (
    <div className="flex flex-col gap-8 p-10">
      <div className="flex flex-col gap-2">
        <PageCrumble
          props={{
            type: "original",
            path: "쇼핑 상품 수정",
            icon: "product",
          }}
        />
        <PageCrumble
          props={{
            type: "second",
            path: ["상품 관리", "쇼핑 상품 수정"],
          }}
        />
      </div>
      <ShoppingForm
        mode="edit"
        shoppingProductId={shoppingProductId}
        prev={prev}
      />
    </div>
  );
};

export default EditShoppingProductPage;
