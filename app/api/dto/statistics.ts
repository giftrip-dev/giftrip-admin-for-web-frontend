// 통계 응답 타입
export interface StatisticsResponse {
  users: {
    totalUsers: number;
    activeUsers: number;
    influencerCount: number;
    todayNewUsers: number;
    thisMonthNewUsers: number;
  };
  orders: {
    totalOrders: number;
    completedOrders: number;
    canceledOrders: number;
    heldOrders: number;
    totalOrderAmount: number;
    completedOrderAmount: number;
    todayOrders: number;
    thisMonthOrders: number;
  };
  payments: {
    totalPaymentAmount: number;
    successPaymentAmount: number;
    refundAmount: number;
    successPaymentCount: number;
    failedPaymentCount: number;
    todayPaymentAmount: number;
    thisMonthPaymentAmount: number;
    paymentMethodStats: {
      [key: string]: number;
    };
  };
  reservations: {
    totalReservations: number;
    confirmedReservations: number;
    canceledReservations: number;
    experienceReservations: number;
    campaignReservations: number;
    accommodationReservations: number;
    todayReservations: number;
    thisMonthReservations: number;
  };
  products: {
    totalProducts: number;
    activeProducts: number;
    soldOutProducts: number;
    totalViewCount: number;
    categoryStats: {
      [key: string]: number;
    };
  };
  experiences: {
    totalExperiences: number;
    activeExperiences: number;
    totalViewCount: number;
    categoryStats: {
      [key: string]: number;
    };
  };
  campaigns: {
    totalCampaigns: number;
    activeCampaigns: number;
    totalViewCount: number;
    categoryStats: {
      [key: string]: number;
    };
  };
  accommodations: {
    totalAccommodations: number;
    activeAccommodations: number;
    totalViewCount: number;
    categoryStats: {
      [key: string]: number;
    };
  };
  reviews: {
    totalReviews: number;
    activeReviews: number;
    averageRating: number;
    ratingStats: {
      [key: string]: number;
    };
  };
  coupons: {
    totalCoupons: number;
    activeCoupons: number;
    usedCoupons: number;
    availableCoupons: number;
  };
  points: {
    totalPointBalance: number;
    usersWithPoints: number;
    totalTransactions: number;
    todayPointGiven: number;
    thisMonthPointGiven: number;
  };
  deliveries: {
    totalDeliveries: number;
    statusStats: {
      [key: string]: number;
    };
    deliveredCount: number;
    shippingCount: number;
  };
  sms: {
    totalSent: number;
    successCount: number;
    failedCount: number;
    todaySent: number;
  };
}

