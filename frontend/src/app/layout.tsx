import {ReactQueryProvider} from "@/app/providers/react-query-provider";
import type {Metadata} from "next";
import {Geist, Geist_Mono, Mukta} from "next/font/google";
import "./globals.css";

import GoogleAnalytics from "@/components/GoogleAnalytics";

// Font definitions
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const mukta = Mukta({
    variable: "--font-mukta",
    subsets: ["devanagari", "latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Notify Nepal",
    description:
        "Notify Nepal - Latest news and updates from Nepal in English and Nepali",
    openGraph: {
        type: "website",
        locale: "ne_NP",
        alternateLocale: "en_US",
        title: "Notify Nepal - Latest News Portal",
        description:
            "Stay updated with the latest news and events from Nepal in both English and Nepali languages",
        siteName: "Notify Nepal",
        url: "https://notifynepal.com",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Notify Nepal News Portal",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Notify Nepal - Latest News Portal",
        description:
            "Stay updated with the latest news and events from Nepal in both English and Nepali languages",
        images: ["/og-image.jpg"],
    },

    keywords:
        "nepal, news, nepali news, english news, nepal updates, nepal latest",
    metadataBase: new URL("https://notifynepal.com"),
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
        <body
            className={`${geistSans.variable} ${geistMono.variable} ${mukta.variable} antialiased bg-gray-100`}
        >
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <GoogleAnalytics/>

        </body>
        </html>
    );
}
