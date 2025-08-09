import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileFooterNavigation from "./components/MobileFooterNav";

export const metadata: Metadata = {
    title: "नोटिफाई नेपाल",
    description: "नेपालको ताजा समाचार र अपडेटहरू",
};

export default function NepaliLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="nepali-text">
            <Navbar />
            <main className="main mx-auto">{children}</main>
            <Footer />
            <MobileFooterNavigation />
        </div>
    );
}
