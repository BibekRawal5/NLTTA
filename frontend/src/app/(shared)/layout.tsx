import { Metadata } from "next";
import Footer from "../(en)/components/Footer";
import Navbar from "../(en)/components/Navbar";

export const metadata: Metadata = {
    title: {
        template: "Notify Nepal",
        default: "Notify Nepal",
    },
    description:
        "Explore the latest news, insights, and services from Nepal and beyond on Notify Nepal, a premier news portal.",
};

export default function SharedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="main mx-auto">{children}</main>
            <Footer />
        </>
    );
}
