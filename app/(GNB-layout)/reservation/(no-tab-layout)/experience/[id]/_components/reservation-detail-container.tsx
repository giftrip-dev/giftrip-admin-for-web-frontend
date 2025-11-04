import { LoadIcon } from "@/components/shared/loading/loading";
import ReservationCtaButtonList from "@/app/(GNB-layout)/reservation/_components/reservation-cta-button-list";
import ReservationDetailHeader from "@/app/(GNB-layout)/reservation/_components/reservation-detail-header";
import ReservationSummaryBox from "./reservation-summary-box";
import { useGetExperienceReservationDetail } from "@/hooks/reservation/use-get-experience-reservation-detail";
import { ReservationStatus } from "@/app/api/dto/reservation";
import UserInfoBox from "./user-info-box";
import ReservationBasicInfoBox from "./reservation-basic-info-box";
import ProductInfoBox from "./product-info-box";
import PaymentInfoBox from "./payment-info-box";
import { RESERVATION_EXPERIENCE_PAGE } from "@/constants/path";
import { useCancelExperienceReservation } from "@/hooks/experience/use-cancel-experience-reservation";

const ReservationDetailContainer = ({ id }: { id: string }) => {
  const { data } = useGetExperienceReservationDetail(id);
  const { onSubmit, loading } = useCancelExperienceReservation();

  if (!data) return <LoadIcon />;
  return (
    <>
      <ReservationDetailHeader
        title="체험 예약 관리"
        path={["체험 예약 관리", "체험 예약 상세"]}
      >
        <ReservationCtaButtonList
          id={id as string}
          isCancelable={data.status !== ReservationStatus.CANCELLED}
          nextPage={RESERVATION_EXPERIENCE_PAGE}
          onSubmit={onSubmit}
          loading={loading}
        />
      </ReservationDetailHeader>
      <ReservationSummaryBox
        id={data.id}
        createdAt={data.createdAt}
        adminMemo={data.adminMemo}
      />
      <div className="flex flex-col gap-10 p-10">
        <UserInfoBox data={data} />
        <ReservationBasicInfoBox data={data} />
        <ProductInfoBox data={data} />
        <PaymentInfoBox data={data} />
      </div>
    </>
  );
};

export default ReservationDetailContainer;
