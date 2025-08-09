import { Suspense } from "react";
import NewsList from "../../components/main/news_list/NewsList";
import { Metadata } from "next";
import NewsList_2 from "../../components/main/news_list/NewsList_2";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Latest News | Notify Nepal",
        description:
            "Explore the latest news from Nepal and beyond on Notify Nepal, a premier news portal delivering top stories, insights, and updates across various categories.",
    };
}

export default function EnNewsPage() {
    return (
        <Suspense
            fallback={
                <div className="p-4 text-center min-h-screen">
                    Loading news...
                </div>
            }
        >
            <div className="hidden md:block">
                <NewsList />
            </div>
            <div className="md:hidden">
                <NewsList_2 />
            </div>
        </Suspense>
    );
}
