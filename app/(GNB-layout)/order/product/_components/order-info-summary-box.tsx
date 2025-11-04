import MemoBox from "@/app/(GNB-layout)/experience/_components/memo-box";
import { OrderDetailItem } from "@/app/api/dto/order";
import formattedDate from "@/util/date";

const OrderInfoSummaryBox = ({ data }: { data: OrderDetailItem }) => {
  return (
    <div className="flex flex-col gap-2 bg-[#32333C] px-8 pb-10 text-white">
      <div className="flex items-center gap-2">
        <p className="text-title-1">{`주문 ID :`}</p>
        <p className="text-body-1">{data.orderNumber}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-title-1">{`주문 일시 :`}</p>
        <p className="text-body-1">
          {formattedDate(data.createdAt, "YYYY-MM-DD HH:mm:ss")}
        </p>
      </div>
      <MemoBox memo={data.adminMemo || ""} clickUpdate={() => {}} />
    </div>
  );
};

export default OrderInfoSummaryBox;
