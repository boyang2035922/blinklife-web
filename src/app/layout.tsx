import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlinkLife — 一次按压，捕捉永恒",
  description:
    "BLE 毫秒级打点，运动视频一键剪辑。告别繁琐后期，用 BlinkLife 捕捉每一个精彩瞬间。",
  keywords: ["BlinkLife", "运动视频", "BLE打点", "智能剪辑", "高光时刻"],
  openGraph: {
    title: "BlinkLife — 一次按压，捕捉永恒",
    description: "BLE 毫秒级打点，运动视频一键剪辑",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
