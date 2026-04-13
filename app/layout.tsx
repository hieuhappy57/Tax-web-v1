import type {Metadata} from 'next';
import { Be_Vietnam_Pro, Inter } from 'next/font/google';
import './globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-be-vietnam',
});

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Sovereign Tax - Tối ưu Thuế & An tâm Quản trị cho SME',
  description: 'Dịch vụ Kế toán Thuế chuyên sâu, Quyết toán thuế và Đào tạo quản trị dành riêng cho chủ doanh nghiệp SME tại Việt Nam. Cam kết bảo mật và trách nhiệm pháp lý.',
  keywords: ['kế toán thuế', 'quyết toán thuế', 'đào tạo quản trị', 'SME', 'Sovereign Tax', 'tư vấn thuế'],
  openGraph: {
    title: 'Sovereign Tax - Tối ưu Thuế & An tâm Quản trị',
    description: 'Dịch vụ Kế toán Thuế chuyên sâu và Đào tạo quản trị dành riêng cho chủ doanh nghiệp SME tại Việt Nam.',
    url: 'https://sovereigntax.vn',
    siteName: 'Sovereign Tax',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sovereign Tax - Tối ưu Thuế & An tâm Quản trị',
    description: 'Dịch vụ Kế toán Thuế chuyên sâu và Đào tạo quản trị dành riêng cho chủ doanh nghiệp SME tại Việt Nam.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="font-inter antialiased">{children}</body>
    </html>
  );
}
