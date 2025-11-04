"use client";

import { useParams, useRouter } from "next/navigation";
import SubBannerCrumble from "../_components/sub-banner-crumble";
import Loading from "@/components/shared/loading/loading";
import SubBannerDetailContainer from "../_components/sub-banner-detail-container";
import ProductCtaButtonList from "@/app/_components/button/product-cta-button-list";
import { useDeleteBanner } from "@/hooks/banner/use-delete-banner";
import { SUB_BANNER_EDIT_PAGE, SUB_BANNER_PAGE } from "@/constants/path";

const SubBannerDetailPage = () => {
  const { id } = useParams();
  const { onSubmit, loading } = useDeleteBanner({ isMain: false });
  const router = useRouter();

  // 목록 버튼 핸들러
  const clickBackToList = (prev: string) => {
    router.push(`${SUB_BANNER_PAGE}?prev=${prev}`);
  };

  // 수정 버튼 핸들러
  const clickEdit = () => {
    router.push(SUB_BANNER_EDIT_PAGE.replace("[id]", id as string));
  };

  // 삭제 버튼 핸들러
  const clickDelete = () => {
    onSubmit(id as string);
  };

  return (
    <div className="pt-3">
      <SubBannerCrumble />
      <ProductCtaButtonList
        clickBackToList={clickBackToList}
        clickDelete={clickDelete}
        clickEdit={clickEdit}
        loading={loading}
        modalTitle="배너 삭제"
      />
      <Loading>
        <SubBannerDetailContainer id={id as string} />
      </Loading>
    </div>
  );
};

export default SubBannerDetailPage;
