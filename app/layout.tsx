import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import AppOverlays from "@/components/shared/AppOverlays";
import {
  getCopy,
  LOCALE_COOKIE_NAME,
  resolveLocale,
} from "@/lib/i18n/translations";
import { PERSONAL_INFO } from "@/lib/constants";
import "./globals.css";

// Display Font - Bricolage Grotesque for headings
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body Font - DM Sans for body text
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Monospace Font - JetBrains Mono for code snippets
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get(LOCALE_COOKIE_NAME)?.value);
  const copy = getCopy(locale);

  return {
    metadataBase: new URL("https://tarek.dev"),
    title: copy.metadata.title,
    description: copy.metadata.description,
    keywords: [
      "Tarek Alam Bhuiyan",
      "2ManyFaces",
      "Machine Learning",
      "Data Science",
      "NLP",
      "Python",
      "BRAC University",
      "Bangladesh",
      "Software Engineering",
      "Full-stack Developer",
    ],
    authors: [
      { name: "Tarek Alam Bhuiyan", url: "https://github.com/2ManyFaces" },
    ],
    creator: "Tarek Alam Bhuiyan",
    openGraph: {
      type: "website",
      locale: locale === "bn" ? "bn_BD" : "en_US",
      url: "https://tarek.dev",
      title: copy.metadata.title,
      description: copy.metadata.ogDescription,
      siteName: "Tarek's Portfolio",
      images: [
        {
          url: PERSONAL_INFO.profileImageUrl,
          width: 1200,
          height: 1200,
          alt: "Tarek Alam Bhuiyan Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadata.title,
      description: copy.metadata.ogDescription,
      images: [PERSONAL_INFO.profileImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale = resolveLocale(
    cookieStore.get(LOCALE_COOKIE_NAME)?.value,
  );

  return (
    <html
      lang={initialLocale}
      suppressHydrationWarning
      className={`${bricolage.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${initialLocale === "bn" ? "locale-bn" : ""}`}
    >
      <body className={`${dmSans.className} antialiased`}>
        <ThemeProvider>
          <LanguageProvider initialLocale={initialLocale}>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <AppOverlays />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}



