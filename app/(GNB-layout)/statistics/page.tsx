"use client";

import { useGetStatistics } from "@/hooks/statistics/use-get-statistics";

const numberFormatter = new Intl.NumberFormat("ko-KR");
const priceFormatter = new Intl.NumberFormat("ko-KR");
const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
});

const StatisticsPage = () => {
  const { data, isLoading } = useGetStatistics();
  const today = dateFormatter.format(new Date());

  // API 데이터가 없을 때 기본값 처리
  if (isLoading || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">통계 데이터를 불러오는 중...</p>
      </main>
    );
  }

  // 계산된 값들
  const paymentSuccessRate =
    data.payments.successPaymentCount + data.payments.failedPaymentCount > 0
      ? (
          (data.payments.successPaymentCount /
            (data.payments.successPaymentCount +
              data.payments.failedPaymentCount)) *
          100
        ).toFixed(1)
      : "0.0";
  const reservationCancelRate =
    data.reservations.totalReservations > 0
      ? (
          (data.reservations.canceledReservations /
            data.reservations.totalReservations) *
          100
        ).toFixed(1)
      : "0.0";
  const couponUsageRate =
    data.coupons.totalCoupons > 0
      ? ((data.coupons.usedCoupons / data.coupons.totalCoupons) * 100).toFixed(
          1,
        )
      : "0.0";

  // 주문 완료율 계산
  const orderCompletionRate =
    data.orders.totalOrders > 0
      ? ((data.orders.completedOrders / data.orders.totalOrders) * 100).toFixed(
          1,
        )
      : "0.0";

  // 주요 지표 카드
  const overviewMetrics = [
    {
      label: "전체 사용자",
      value: data.users.totalUsers,
      helper: `활성 사용자 ${numberFormatter.format(data.users.activeUsers)}명`,
      subHelper: `인플루언서 ${numberFormatter.format(data.users.influencerCount)}명`,
      gradient: "from-slate-600 to-slate-700",
    },
    {
      label: "이번 달 신규 사용자",
      value: data.users.thisMonthNewUsers,
      helper: `오늘 신규 ${numberFormatter.format(data.users.todayNewUsers)}명`,
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      label: "전체 주문",
      value: data.orders.totalOrders,
      helper: `완료 ${numberFormatter.format(data.orders.completedOrders)}건`,
      subHelper: `취소 ${numberFormatter.format(data.orders.canceledOrders)}건`,
      completionRate: parseFloat(orderCompletionRate),
      gradient: "from-indigo-600 to-blue-600",
    },
    {
      label: "완료 주문 금액",
      value: data.orders.completedOrderAmount,
      isPrice: true,
      helper: `전체 주문 금액 ${priceFormatter.format(data.orders.totalOrderAmount)}원`,
      gradient: "from-slate-700 to-slate-800",
      highlight: true,
    },
    {
      label: "이번 달 주문",
      value: data.orders.thisMonthOrders,
      helper: `오늘 주문 ${numberFormatter.format(data.orders.todayOrders)}건`,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      label: "성공 결제 건수",
      value: data.payments.successPaymentCount,
      helper: `실패 ${numberFormatter.format(data.payments.failedPaymentCount)}건`,
      subHelper: `성공률 ${paymentSuccessRate}%`,
      successRate: parseFloat(paymentSuccessRate),
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      label: "성공 결제 금액",
      value: data.payments.successPaymentAmount,
      isPrice: true,
      helper: `이번 달 ${priceFormatter.format(data.payments.thisMonthPaymentAmount)}원`,
      gradient: "from-teal-600 to-cyan-600",
      highlight: true,
    },
    {
      label: "환불 금액",
      value: data.payments.refundAmount,
      isPrice: true,
      helper: `환불 건수 ${numberFormatter.format(data.orders.canceledOrders)}건`,
      gradient: "from-rose-600 to-red-600",
      warning: data.payments.refundAmount > 0,
    },
  ];

  // 예약 통계
  const reservationStats = [
    {
      label: "전체 예약",
      value: data.reservations.totalReservations,
      helper: `확정 ${numberFormatter.format(data.reservations.confirmedReservations)}건`,
    },
    {
      label: "체험 예약",
      value: data.reservations.experienceReservations,
    },
    {
      label: "체험단 예약",
      value: data.reservations.campaignReservations,
    },
    {
      label: "숙소 예약",
      value: data.reservations.accommodationReservations,
    },
    {
      label: "취소 예약",
      value: data.reservations.canceledReservations,
      helper: `취소율 ${reservationCancelRate}%`,
    },
    {
      label: "이번 달 예약",
      value: data.reservations.thisMonthReservations,
      helper: `오늘 예약 ${numberFormatter.format(data.reservations.todayReservations)}건`,
    },
  ];

  // 상품 통계
  const productStats = [
    {
      label: "전체 상품",
      value: data.products.totalProducts,
      helper: `활성 ${numberFormatter.format(data.products.activeProducts)}개`,
      subHelper: `품절 ${numberFormatter.format(data.products.soldOutProducts)}개`,
    },
    {
      label: "상품 조회수",
      value: data.products.totalViewCount,
    },
    {
      label: "전체 체험",
      value: data.experiences.totalExperiences,
      helper: `활성 ${numberFormatter.format(data.experiences.activeExperiences)}개`,
    },
    {
      label: "체험 조회수",
      value: data.experiences.totalViewCount,
    },
    {
      label: "전체 체험단",
      value: data.campaigns.totalCampaigns,
      helper: `활성 ${numberFormatter.format(data.campaigns.activeCampaigns)}개`,
    },
    {
      label: "체험단 조회수",
      value: data.campaigns.totalViewCount,
    },
    {
      label: "전체 숙소",
      value: data.accommodations.totalAccommodations,
      helper: `활성 ${numberFormatter.format(data.accommodations.activeAccommodations)}개`,
    },
    {
      label: "숙소 조회수",
      value: data.accommodations.totalViewCount,
    },
  ];

  // 리뷰 통계
  const reviewStats = [
    {
      label: "전체 리뷰",
      value: data.reviews.totalReviews,
      helper: `활성 리뷰 ${numberFormatter.format(data.reviews.activeReviews)}개`,
    },
    {
      label: "평균 평점",
      value: data.reviews.averageRating.toFixed(1),
      isRating: true,
    },
  ];

  // 쿠폰/포인트 통계
  const couponPointStats = [
    {
      label: "전체 쿠폰",
      value: data.coupons.totalCoupons,
      helper: `활성 ${numberFormatter.format(data.coupons.activeCoupons)}개`,
      subHelper: `사용 ${numberFormatter.format(data.coupons.usedCoupons)}개`,
    },
    {
      label: "사용 가능 쿠폰",
      value: data.coupons.availableCoupons,
      helper: `사용률 ${couponUsageRate}%`,
    },
    {
      label: "전체 포인트 잔액",
      value: data.points.totalPointBalance,
      isPrice: true,
      helper: `보유 사용자 ${numberFormatter.format(data.points.usersWithPoints)}명`,
    },
    {
      label: "포인트 거래",
      value: data.points.totalTransactions,
      helper: `이번 달 지급 ${numberFormatter.format(data.points.thisMonthPointGiven)}P`,
    },
  ];

  // 배송 통계
  const deliveryStats = [
    {
      label: "전체 배송",
      value: data.deliveries.totalDeliveries,
      helper: `배송 완료 ${numberFormatter.format(data.deliveries.deliveredCount)}건`,
      subHelper: `배송 중 ${numberFormatter.format(data.deliveries.shippingCount)}건`,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col gap-8 bg-gray-50 px-8 pb-20 pt-10">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
          Dashboard Overview
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              통계 대시보드
            </h1>
            <p className="text-sm text-gray-500">
              {today} 집계 · 실시간 지표는 10분 단위로 갱신됩니다.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
            <span className="inline-flex size-2 rounded-full bg-emerald-500" />
            오늘 트래픽이 안정적으로 유지되고 있어요.
          </div>
        </div>
      </header>

      {/* 주요 지표 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">주요 지표</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {overviewMetrics.map((metric) => (
            <article
              key={metric.label}
              className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              {/* 그라데이션 배경 */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-5 transition-opacity group-hover:opacity-10`}
              />
              <div className="relative">
                <p className="text-sm font-medium text-gray-500">
                  {metric.label}
                </p>
                <p
                  className={`mt-3 text-3xl font-bold ${
                    metric.highlight
                      ? "bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent"
                      : metric.warning
                        ? "text-rose-600"
                        : "text-gray-900"
                  }`}
                >
                  {metric.isPrice
                    ? `${priceFormatter.format(metric.value)}원`
                    : numberFormatter.format(metric.value)}
                </p>
                {/* 진행 바 (비율이 있는 경우) */}
                {metric.completionRate !== undefined && (
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-gray-600">
                      <span>완료율</span>
                      <span className="font-semibold">
                        {metric.completionRate}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-500"
                        style={{ width: `${metric.completionRate}%` }}
                      />
                    </div>
                  </div>
                )}
                {metric.successRate !== undefined && (
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-gray-600">
                      <span>성공률</span>
                      <span className="font-semibold text-green-600">
                        {metric.successRate}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 transition-all duration-500"
                        style={{ width: `${metric.successRate}%` }}
                      />
                    </div>
                  </div>
                )}
                {metric.helper && (
                  <p className="mt-4 text-xs text-gray-500">{metric.helper}</p>
                )}
                {metric.subHelper && (
                  <p className="mt-1 text-xs text-gray-400">
                    {metric.subHelper}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 예약 통계 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">예약 통계</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 예약 타입별 분포 차트 */}
          <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              예약 타입별 분포
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "체험 예약",
                  value: data.reservations.experienceReservations,
                  color: "from-blue-500 to-cyan-500",
                  total: data.reservations.totalReservations,
                },
                {
                  label: "체험단 예약",
                  value: data.reservations.campaignReservations,
                  color: "from-purple-500 to-pink-500",
                  total: data.reservations.totalReservations,
                },
                {
                  label: "숙소 예약",
                  value: data.reservations.accommodationReservations,
                  color: "from-amber-500 to-orange-500",
                  total: data.reservations.totalReservations,
                },
              ].map((item) => {
                const percentage =
                  item.total > 0
                    ? ((item.value / item.total) * 100).toFixed(1)
                    : "0";
                return (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {item.label}
                      </span>
                      <span className="text-gray-600">
                        {numberFormatter.format(item.value)}건 ({percentage}%)
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          {/* 예약 요약 카드들 */}
          <div className="space-y-6">
            {reservationStats
              .filter((stat) =>
                ["전체 예약", "취소 예약", "이번 달 예약"].includes(stat.label),
              )
              .map((stat) => (
                <article
                  key={stat.label}
                  className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
                    stat.label === "취소 예약"
                      ? "ring-2 ring-rose-100"
                      : stat.label === "전체 예약"
                        ? "ring-2 ring-blue-100"
                        : ""
                  }`}
                >
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-gray-900">
                    {numberFormatter.format(stat.value)}
                  </p>
                  {stat.helper && (
                    <p className="mt-4 text-xs text-gray-500">{stat.helper}</p>
                  )}
                  {stat.label === "취소 예약" && (
                    <div className="mt-4">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-red-500"
                          style={{ width: `${reservationCancelRate}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        취소율 {reservationCancelRate}%
                      </p>
                    </div>
                  )}
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* 상품 통계 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">상품 통계</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {productStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-gray-900">
                {numberFormatter.format(stat.value)}
              </p>
              {stat.helper && (
                <p className="mt-4 text-xs text-gray-500">{stat.helper}</p>
              )}
              {stat.subHelper && (
                <p className="mt-1 text-xs text-gray-400">{stat.subHelper}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* 리뷰 및 기타 통계 */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 리뷰 통계 */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            리뷰 통계
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {reviewStats.map((stat) => (
              <article
                key={stat.label}
                className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
                  stat.isRating ? "ring-2 ring-yellow-100" : ""
                }`}
              >
                <p className="text-sm text-gray-500">{stat.label}</p>
                {stat.isRating ? (
                  <div className="mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-4xl font-bold text-transparent">
                        {stat.value}
                      </span>
                      <span className="text-2xl">⭐</span>
                      <span className="text-sm text-gray-500">/ 5.0</span>
                    </div>
                    {/* 평점 진행 바 */}
                    <div className="mt-4">
                      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                          style={{
                            width: `${(parseFloat(stat.value) / 5) * 100}%`,
                          }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        {data.reviews.totalReviews > 0
                          ? `${numberFormatter.format(data.reviews.totalReviews)}개의 리뷰 기준`
                          : "리뷰 없음"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mt-3 text-3xl font-semibold text-gray-900">
                      {typeof stat.value === "number"
                        ? numberFormatter.format(stat.value)
                        : stat.value}
                    </p>
                    {stat.helper && (
                      <p className="mt-4 text-xs text-gray-500">
                        {stat.helper}
                      </p>
                    )}
                  </>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* 쿠폰/포인트 통계 */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            쿠폰 및 포인트 통계
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {couponPointStats.map((stat) => {
              const isCouponUsage =
                stat.label === "사용 가능 쿠폰" &&
                stat.helper?.includes("사용률");
              return (
                <article
                  key={stat.label}
                  className={`rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
                    stat.label === "전체 포인트 잔액"
                      ? "ring-2 ring-amber-100"
                      : ""
                  }`}
                >
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p
                    className={`mt-3 text-2xl font-semibold ${
                      stat.label === "전체 포인트 잔액"
                        ? "bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent"
                        : "text-gray-900"
                    }`}
                  >
                    {stat.isPrice
                      ? `${priceFormatter.format(stat.value)}원`
                      : numberFormatter.format(stat.value)}
                  </p>
                  {isCouponUsage && (
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-xs text-gray-600">
                        <span>쿠폰 사용률</span>
                        <span className="font-semibold text-purple-600">
                          {couponUsageRate}%
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                          style={{ width: `${couponUsageRate}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {stat.helper && !isCouponUsage && (
                    <p className="mt-4 text-xs text-gray-500">{stat.helper}</p>
                  )}
                  {stat.subHelper && (
                    <p className="mt-1 text-xs text-gray-400">
                      {stat.subHelper}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 결제 수단 통계 */}
      {data.payments.paymentMethodStats &&
        Object.keys(data.payments.paymentMethodStats).length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              결제 수단 통계
            </h2>
            <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-lg font-semibold text-gray-900">
                결제 수단별 사용 현황
              </h3>
              <div className="space-y-4">
                {Object.entries(data.payments.paymentMethodStats)
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([method, count]) => {
                    const methodNames: { [key: string]: string } = {
                      credit_card: "신용카드",
                      kakao_pay: "카카오페이",
                      toss_pay: "토스페이",
                      unknown: "기타",
                    };
                    const methodColors: { [key: string]: string } = {
                      credit_card: "from-blue-500 to-indigo-500",
                      kakao_pay: "from-yellow-400 to-yellow-500",
                      toss_pay: "from-blue-400 to-blue-500",
                      unknown: "from-gray-400 to-gray-500",
                    };
                    const total = Object.values(
                      data.payments.paymentMethodStats,
                    ).reduce((sum: number, val) => sum + (val as number), 0);
                    const percentage =
                      total > 0
                        ? (((count as number) / total) * 100).toFixed(1)
                        : "0";
                    return (
                      <div key={method} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`size-3 rounded-full bg-gradient-to-r ${methodColors[method] || "from-gray-400 to-gray-500"}`}
                            />
                            <span className="font-medium text-gray-700">
                              {methodNames[method] || method}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-gray-900">
                              {numberFormatter.format(count as number)}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">
                              ({percentage}%)
                            </span>
                          </div>
                        </div>
                        <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                          <div
                            className={`h-full bg-gradient-to-r ${methodColors[method] || "from-gray-400 to-gray-500"} rounded-full transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </article>
          </section>
        )}

      {/* 배송 통계 */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900">배송 통계</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {deliveryStats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold text-gray-900">
                {numberFormatter.format(stat.value)}
              </p>
              {stat.helper && (
                <p className="mt-4 text-xs text-gray-500">{stat.helper}</p>
              )}
              {stat.subHelper && (
                <p className="mt-1 text-xs text-gray-400">{stat.subHelper}</p>
              )}
            </article>
          ))}
          {data.deliveries.statusStats &&
            Object.keys(data.deliveries.statusStats).length > 0 && (
              <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  배송 상태별 통계
                </h3>
                <div className="space-y-4">
                  {Object.entries(data.deliveries.statusStats).map(
                    ([status, count]) => {
                      const statusNames: { [key: string]: string } = {
                        pending: "대기 중",
                        shipped: "배송 중",
                        delivered: "배송 완료",
                        canceled: "취소됨",
                      };
                      const statusColors: { [key: string]: string } = {
                        pending: "from-yellow-400 to-amber-500",
                        shipped: "from-blue-400 to-cyan-500",
                        delivered: "from-green-400 to-emerald-500",
                        canceled: "from-gray-400 to-gray-500",
                      };
                      const total = data.deliveries.totalDeliveries;
                      const percentage =
                        total > 0
                          ? (((count as number) / total) * 100).toFixed(1)
                          : "0";
                      return (
                        <div key={status} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">
                              {statusNames[status] || status}
                            </span>
                            <div className="text-right">
                              <span className="text-lg font-semibold text-gray-900">
                                {numberFormatter.format(count as number)}
                              </span>
                              <span className="ml-2 text-sm text-gray-500">
                                ({percentage}%)
                              </span>
                            </div>
                          </div>
                          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                              className={`h-full bg-gradient-to-r ${statusColors[status] || "from-gray-400 to-gray-500"} rounded-full transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </article>
            )}
        </div>
      </section>
    </main>
  );
};

export default StatisticsPage;
