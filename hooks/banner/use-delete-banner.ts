// 배너 삭제 훅

import { useState } from "react";
import { toast } from "../use-toast";
import { deleteBanner } from "@/app/api/banner";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { MAIN_BANNER_PAGE, SUB_BANNER_PAGE } from "@/constants/path";

export const useDeleteBanner = ({ isMain }: { isMain: boolean }) => {
  const nextPage = isMain ? MAIN_BANNER_PAGE : SUB_BANNER_PAGE;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (id: string) => {
    setLoading(true);
    try {
      await deleteBanner(id);
      // 배너 목록 데이터 갱신
      await mutate((key) => {
        return Array.isArray(key) && key[0] === "/banners";
      });
      await new Promise((resolve) => setTimeout(resolve, 300));
      toast({
        title: "배너가 삭제되었어요.",
      });
      router.replace(nextPage);
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
