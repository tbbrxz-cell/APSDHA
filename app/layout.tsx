import type { Metadata } from "next";
import { Inter, Space_Grotesk, Syne } from "next/font/google";
import AdminGate from "@/components/admin/AdminGate";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Providers } from "@/components/shared/Providers";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { SITE_URL } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} ${spaceGrotesk.variable} ${syne.variable} min-h-screen antialiased bg-[#030305]`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden">
            {/* Premium Multi-layered Dark Background */}
            <div className="fixed inset-0 z-[-2] bg-[#030305]" />
            <div className="fixed inset-0 z-[-2] opacity-40" 
              style={{ background: "radial-gradient(circle at center, #0b0b0f 0%, #030305 100%)" }} 
            />
            
            {/* High-end Glowing Ambient Light Orbs */}
            <div className="bg-blur-orb left-[-5%] top-[10%] h-[500px] w-[500px] opacity-40 animate-pulse" />
            <div className="bg-blur-orb right-[-10%] top-[40%] h-[600px] w-[600px] opacity-30 animate-float-slow" />
            <div className="bg-blur-orb left-[15%] bottom-[5%] h-[450px] w-[450px] opacity-25 animate-float-slower" />
            
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </div>
          <AdminGate />
        </Providers>
      </body>
    </html>
  );
}
