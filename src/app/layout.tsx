import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mochamad Wildani Azizi | Interactive Portfolio & CV",
  description:
    "Website Curriculum Vitae interaktif Mochamad Wildani Azizi. Menampilkan keahlian, pengalaman, dan proyek web development dengan antarmuka modern, responsif, dan dinamis.",
  keywords: ["web developer", "portfolio", "CV", "fullstack", "Next.js", "React"],
  authors: [{ name: "Mochamad Wildani Azizi" }],
  openGraph: {
    title: "Mochamad Wildani Azizi | Interactive Portfolio & CV",
    description: "Full-Stack Web Developer — Malang, Indonesia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="dark" data-accent="indigo" suppressHydrationWarning>
      <body className={`${outfit.variable} ${plusJakartaSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
