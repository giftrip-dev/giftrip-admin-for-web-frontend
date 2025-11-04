"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MemberOrderTable from "./member-order-table";
import MemberReservationTable from "./member-reservation-table";

interface MemberDetailTabsProps {
  memberId: string;
}

const MemberDetailTabs = ({ memberId }: MemberDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="flex flex-col gap-6 px-10 pb-10">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex gap-8">
          <TabsTrigger value="orders" className="text-h1-R">
            주문정보
          </TabsTrigger>
          <TabsTrigger value="reservations" className="text-h1-R">
            예약정보
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-8">
          <MemberOrderTable memberId={memberId} />
        </TabsContent>

        <TabsContent value="reservations" className="mt-8">
          <MemberReservationTable memberId={memberId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberDetailTabs;
