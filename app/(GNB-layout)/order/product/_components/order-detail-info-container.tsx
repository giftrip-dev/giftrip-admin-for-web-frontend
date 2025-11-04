import { useGetOrderDetail } from "@/hooks/order/use-get-order-detail";
import { LoadIcon } from "@/components/shared/loading/loading";
import OrderInfoSummaryBox from "./order-info-summary-box";
import BasicInfoBox from "../[id]/_components/basic-info-box";
import ProductInfoBox from "../[id]/_components/product-info-box";
import PaymentInfoBox from "../[id]/_components/payment-info-box";
import DeliveryInfoBox from "../[id]/_components/delivery-info-box";
import OrderDetailHeader from "./order-detail-header";
import OrderCtaButtonList from "../[id]/_components/order-cta-button-list";
import { OrderStatus } from "@/app/api/dto/order";

const OrderDetailInfoContainer = ({ id }: { id: string }) => {
  const { data } = useGetOrderDetail(id);

  if (!data) return <LoadIcon />;
  return (
    <>
      <OrderDetailHeader>
        <OrderCtaButtonList
          id={id as string}
          isCancelable={data.status !== OrderStatus.CANCELED}
        />
      </OrderDetailHeader>
      <OrderInfoSummaryBox data={data} />
      <div className="flex flex-col gap-10 p-10">
        <BasicInfoBox data={data} />
        {data.orderItems.map((item) => (
          <ProductInfoBox key={item.id} data={item} />
        ))}
        <PaymentInfoBox data={data} />
        <DeliveryInfoBox data={data} />
      </div>
    </>
  );
};

export default OrderDetailInfoContainer;
