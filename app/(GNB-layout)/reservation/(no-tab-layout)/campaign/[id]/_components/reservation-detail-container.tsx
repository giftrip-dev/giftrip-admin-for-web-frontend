import { LoadIcon } from "@/components/shared/loading/loading";
import ReservationCtaButtonList from "@/app/(GNB-layout)/reservation/_components/reservation-cta-button-list";
import ReservationDetailHeader from "@/app/(GNB-layout)/reservation/_components/reservation-detail-header";
import ReservationSummaryBox from "./reservation-summary-box";
import { useGetCampaignReservationDetail } from "@/hooks/reservation/use-get-campaign-reservation-detail";
import { ReservationStatus } from "@/app/api/dto/reservation";
import UserInfoBox from "./user-info-box";
import ReservationBasicInfoBox from "./reservation-basic-info-box";
import ProductInfoBox from "./product-info-box";
import PaymentInfoBox from "./payment-info-box";
import { RESERVATION_CAMPAIGN_PAGE } from "@/constants/path";
import { useCancelCampaignReservation } from "@/hooks/campaign/use-cancel-campaign-reservation";

const ReservationDetailContainer = ({ id }: { id: string }) => {
  const { data } = useGetCampaignReservationDetail(id);
  const { onSubmit, loading } = useCancelCampaignReservation();
  if (!data) return <LoadIcon />;
  return (
    <>
      <ReservationDetailHeader
        title="체험단 예약 관리"
        path={["체험단 예약 관리", "체험단 예약 상세"]}
      >
        <ReservationCtaButtonList
          nextPage={RESERVATION_CAMPAIGN_PAGE}
          id={id as string}
          isCancelable={data.status !== ReservationStatus.CANCELLED}
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
