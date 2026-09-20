import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const display = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trung Hieu Guitar Center",
  description:
    "Chuyên guitar điện, acoustic và phụ kiện chính hãng. Xem đàn ở chế độ 3D: xoay, phóng to và khám phá từng chi tiết.",
  openGraph: {
    title: "Trung Hieu Guitar Center",
    description:
      "Chuyên guitar điện, acoustic và phụ kiện chính hãng. Xem đàn ở chế độ 3D.",
    type: "website",
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  themeColor: "#dfe9e4",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${sans.variable} ${display.variable} h-full`}>
      <body className="min-h-full bg-void text-bone">{children}</body>
    </html>
  );
}
