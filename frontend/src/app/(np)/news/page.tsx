import React, { Suspense } from "react";
import NewsList from "../components/main/news_list/NewsList";
import { Metadata } from "next";
import NewsList_2 from "../components/main/news_list/NewsList_2";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "नवीनतम समाचार | नोटिफाइ नेपाल",
        description:
            "नोटिफाइ नेपाल, एक प्रमुख समाचार पोर्टल, मा नेपाल र विश्वभरका नवीनतम समाचारहरू अन्वेषण गर्नुहोस्, जसले विभिन्न श्रेणीहरूमा शीर्ष कथाहरू, अन्तर्दृष्टिहरू र अपडेटहरू प्रदान गर्दछ।",
    };
}

export default function NpNewsPage() {
    return (
        <Suspense
            fallback={
                <div className="p-8 min-h-screen text-center">लोड हुँदै...</div>
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
