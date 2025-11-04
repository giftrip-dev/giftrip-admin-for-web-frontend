import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  SERVICE_DESCRIPTION,
  SERVICE_NAME,
  SERVICE_URL,
} from "@/constants/service";

const FAVICON_URL = "/ico/favicon.ico";
const OG_IMAGE_URL = "/png/metadata/og.png";

const pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL(SERVICE_URL),
  title: SERVICE_NAME,
  description: SERVICE_DESCRIPTION,
  icons: {
    icon: FAVICON_URL,
    shortcut: FAVICON_URL,
    apple: FAVICON_URL,
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SERVICE_URL,
    siteName: SERVICE_NAME,
    title: SERVICE_NAME,
    description: SERVICE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 800,
        height: 600,
        alt: SERVICE_NAME,
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} w-screen min-w-full overflow-x-hidden bg-white font-pretendard antialiased`}
      >
        <div className="relative min-h-screen">{children}</div>
      </body>
    </html>
  );
}
