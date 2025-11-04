import { useState } from "react";
import { toast } from "../use-toast";
import { deleteCampaignProduct } from "@/app/api/campaign";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { CAMPAIGN_PRODUCT_PAGE } from "@/constants/path";

export const useDeleteCampaignProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (id: string) => {
    setLoading(true);
    try {
      await deleteCampaignProduct(id);
      // 체험단 목록 데이터 갱신
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/campaigns";
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      toast({
        title: "체험단 상품이 삭제되었어요.",
      });
      router.replace(CAMPAIGN_PRODUCT_PAGE);
    } catch (err) {
      console.error(err);
      toast({
        title: "잠시 후 다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
};
