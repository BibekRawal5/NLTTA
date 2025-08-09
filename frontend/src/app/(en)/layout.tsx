import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileFooterNavigation from "./components/MobileFooterNav";

export const metadata: Metadata = {
    title: "Notify Nepal - English",
    description: "Notify Nepal - Latest news and updates in English",
};

export default function EnglishLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="main mx-auto">{children}</main>
            <Footer />
            <MobileFooterNavigation />
        </>
    );
}
