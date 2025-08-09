import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Notify Nepal - English",
    description: "Notify Nepal - Latest news and updates in English",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main className="main mx-auto nepali-text">{children}</main>
        </>
    );
}
