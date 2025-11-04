import { LoadIcon } from "@/components/shared/loading/loading";
import ReservationCtaButtonList from "@/app/(GNB-layout)/reservation/_components/reservation-cta-button-list";
import ReservationDetailHeader from "@/app/(GNB-layout)/reservation/_components/reservation-detail-header";
import ReservationSummaryBox from "./reservation-summary-box";
import { useGetAccommodationReservationDetail } from "@/hooks/reservation/use-get-accommodation-reservation-detail copy";
import { ReservationStatus } from "@/app/api/dto/reservation";
import UserInfoBox from "./user-info-box";
import ReservationBasicInfoBox from "./reservation-basic-info-box";
import ProductInfoBox from "./product-info-box";
import PaymentInfoBox from "./payment-info-box";
import { RESERVATION_ACCOMMODATION_PAGE } from "@/constants/path";
import { useCancelAccommodationReservation } from "@/hooks/accommodation/use-cancel-accommodation-reservation";

const ReservationDetailContainer = ({ id }: { id: string }) => {
  const { data } = useGetAccommodationReservationDetail(id);
  const { onSubmit, loading } = useCancelAccommodationReservation();
  if (!data) return <LoadIcon />;
  return (
    <>
      <ReservationDetailHeader
        title="숙소 예약 관리"
        path={["숙소 예약 관리", "숙소 예약 상세"]}
      >
        <ReservationCtaButtonList
          nextPage={RESERVATION_ACCOMMODATION_PAGE}
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
        <ReservationBasicInfoBox data={data} />
        <ProductInfoBox data={data} />
        <PaymentInfoBox data={data} />
        <UserInfoBox data={data} />
      </div>
    </>
  );
};

export default ReservationDetailContainer;
