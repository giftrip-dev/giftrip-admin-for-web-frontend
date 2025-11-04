import { LoadIcon } from "@/components/shared/loading/loading";
import { SubBannerTable } from "./sub-banner-table";
import { useGetBannerList } from "@/hooks/banner/use-get-banner-list";
import { BannerType } from "@/app/api/dto/banner";

interface SubBannerTableContainerProps {
  duration: { start?: Date; end?: Date }; // 생성 일자
  isActive: string; // 판매 상태
  currentPage: number; // 현재 페이지
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 설정
}

const SubBannerTableContainer = ({
  currentPage,
  duration,
  isActive,
  setCurrentPage,
}: SubBannerTableContainerProps) => {
  const { data } = useGetBannerList({
    page: currentPage,
    type: BannerType.SUB,
    limit: 10,
    createdAtStart: duration?.start?.toISOString(),
    createdAtEnd: duration?.end?.toISOString(),
    isActive:
      isActive === "true" ? true : isActive === "false" ? false : undefined,
  });

  if (!data) return <LoadIcon />;

  return (
    <SubBannerTable
      data={data.items}
      currentPage={currentPage}
      totalPages={data.meta.totalPages}
      totalDataLength={data.meta.totalItems}
      setCurrentPage={setCurrentPage}
    />
  );
};
export default SubBannerTableContainer;
