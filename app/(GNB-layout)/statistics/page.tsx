"use client";

import { useGetStatistics } from "@/hooks/statistics/use-get-statistics";

const hourlyVisitors = [
  { hour: "00시", value: 150 },
  { hour: "03시", value: 120 },
  { hour: "06시", value: 260 },
  { hour: "09시", value: 540 },
  { hour: "12시", value: 780 },
  { hour: "15시", value: 860 },
  { hour: "18시", value: 930 },
  { hour: "21시", value: 610 },
];

const channelPerformance = [
  { channel: "네이버 검색", visitors: 4210, clicks: 1814, conversion: "5.1%" },
  {
    channel: "카카오 모먼트",
    visitors: 2975,
    clicks: 1102,
    conversion: "4.3%",
  },
  { channel: "자사 뉴스레터", visitors: 1830, clicks: 642, conversion: "6.7%" },
  { channel: "인스타그램", visitors: 1465, clicks: 389, conversion: "3.9%" },
];

const productLeaderboard = [
  {
    product: "더만족 신정옥동점",
    clicks: 842,
    purchases: 61,
    refunds: 2,
  },
  {
    product: "명동양꼬치",
    clicks: 735,
    purchases: 54,
    refunds: 3,
  },
  {
    product: "불끈",
    clicks: 664,
    purchases: 47,
    refunds: 1,
  },
  {
    product: "전주여행해",
    clicks: 598,
    purchases: 42,
    refunds: 4,
  },
];

const refundReasons = [
  { reason: "기상 악화 · 천재지변", count: 9, ratio: "37%" },
  { reason: "일정 변경 · 개인사정", count: 7, ratio: "29%" },
  { reason: "상품 옵션 착오", count: 5, ratio: "21%" },
  { reason: "기타", count: 3, ratio: "13%" },
];

const numberFormatter = new Intl.NumberFormat("ko-KR");
const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
});

const StatisticsPage = () => {
  const { data, isLoading } = useGetStatistics();
  const today = dateFormatter.format(new Date());
  const peakVisitors = Math.max(...hourlyVisitors.map((item) => item.value));

  // API 데이터가 없을 때 기본값 처리
  if (isLoading || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500">통계 데이터를 불러오는 중...</p>
      </main>
    );
  }

  // API 데이터를 기반으로 메트릭 계산
  const todayVisitors = data.users.todayNewUsers || data.users.activeUsers || 0;
  const productClicks = data.products.totalViewCount || 0;
  const completedOrders = data.orders.completedOrders || data.orders.todayOrders || 0;
  const refundCount = data.orders.canceledOrders || 0;

  // 전환율 계산
  const conversionRate =
    productClicks > 0
      ? ((completedOrders / productClicks) * 100).toFixed(1)
      : "0.0";

  const overviewMetrics = [
    {
      label: "오늘 방문자 수",
      value: todayVisitors,
      change: "+6.8%",
      helper: `전체 사용자 ${numberFormatter.format(data.users.totalUsers)}명`,
    },
    {
      label: "상품 상세 클릭 수",
      value: productClicks,
      change: "+5.6%",
      helper: `체험 ${numberFormatter.format(data.experiences.totalViewCount)}회 · 숙소 ${numberFormatter.format(data.accommodations.totalViewCount)}회`,
    },
    {
      label: "구매 완료 수",
      value: completedOrders,
      change: "+3.1%",
      helper: `전환율 ${conversionRate}%`,
    },
    {
      label: "환불 접수 건수",
      value: refundCount,
      change: "-1.6%",
      helper: `환불 금액 ${numberFormatter.format(data.payments.refundAmount)}원`,
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
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            오늘 트래픽이 안정적으로 유지되고 있어요.
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {overviewMetrics.map((metric) => {
          const isNegative = metric.change.startsWith("-");
          return (
            <article
              key={metric.label}
              className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-sm text-gray-500">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold text-gray-900">
                {numberFormatter.format(metric.value)}
              </p>
              <p
                className={`mt-2 inline-flex items-center gap-2 text-sm font-medium ${isNegative ? "text-rose-500" : "text-emerald-500"}`}
              >
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${isNegative ? "bg-rose-50" : "bg-emerald-50"}`}
                >
                  {isNegative ? "↓" : "↑"}
                </span>
                {metric.change}
              </p>
              <p className="mt-4 text-xs text-gray-500">{metric.helper}</p>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-8 xl:grid-cols-[2fr_1fr]">
        <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                시간대별 방문
              </h2>
              <p className="text-sm text-gray-500">
                피크 타임 {peakVisitors}명 기록
              </p>
            </div>
            <span className="text-xs text-gray-400">
              최근 업데이트 ·{" "}
              {new Date().toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="mt-8 grid grid-cols-8 gap-4">
            {hourlyVisitors.map((item) => (
              <div key={item.hour} className="flex flex-col items-center gap-3">
                <div className="flex h-48 w-full items-end justify-center rounded-2xl bg-gray-100 p-1">
                  <div
                    className="w-full rounded-2xl bg-gradient-to-t from-indigo-500 to-sky-400"
                    style={{ height: `${(item.value / peakVisitors) * 100}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    {numberFormatter.format(item.value)}
                  </p>
                  <p className="text-xs text-gray-500">{item.hour}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            유입 채널 성과
          </h2>
          <p className="text-sm text-gray-500">클릭 대비 구매율 비교</p>
          <div className="mt-6 space-y-5">
            {channelPerformance.map((channel) => (
              <div
                key={channel.channel}
                className="rounded-2xl border border-gray-100 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-gray-900">
                    {channel.channel}
                  </p>
                  <span className="text-sm font-medium text-indigo-600">
                    전환 {channel.conversion}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                    방문 {numberFormatter.format(channel.visitors)}명
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700">
                    클릭 {numberFormatter.format(channel.clicks)}회
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
        <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                인기 상품 랭킹
              </h2>
              <p className="text-sm text-gray-500">클릭 · 구매 · 환불 지표</p>
            </div>
            <span className="text-xs text-gray-400">최근 24시간</span>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">상품명</th>
                  <th className="px-4 py-3">클릭 수</th>
                  <th className="px-4 py-3">구매 수</th>
                  <th className="px-4 py-3">환불 수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {productLeaderboard.map((product) => (
                  <tr key={product.product}>
                    <td className="px-4 py-4 text-gray-900">
                      {product.product}
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-900">
                      {numberFormatter.format(product.clicks)}
                    </td>
                    <td className="px-4 py-4 font-semibold text-emerald-600">
                      {numberFormatter.format(product.purchases)}
                    </td>
                    <td className="px-4 py-4 font-semibold text-rose-500">
                      {numberFormatter.format(product.refunds)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                환불 사유 요약
              </h2>
              <p className="text-sm text-gray-500">주요 이슈 모니터링</p>
            </div>
            <span className="text-xs text-gray-400">전일 대비 -1건</span>
          </div>
          <div className="mt-6 space-y-4">
            {refundReasons.map((item) => (
              <div
                key={item.reason}
                className="rounded-2xl border border-gray-100 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-gray-900">
                    {item.reason}
                  </p>
                  <span className="text-sm font-medium text-gray-500">
                    {item.ratio}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                  <p>건수</p>
                  <p className="font-semibold text-gray-900">
                    {numberFormatter.format(item.count)}건
                  </p>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-400 to-orange-300"
                    style={{ width: item.ratio }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
};

export default StatisticsPage;
