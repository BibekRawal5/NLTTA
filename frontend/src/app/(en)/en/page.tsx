import { Suspense } from "react";
import FeedItemGrid from "../components/news/FeedItemGrid";
import NewsMasonry from "../components/news/NewsMasonry";
import HomeBannerAd from "../components/ads/HomeBannerAd";

export default function EnHomePage() {
    return (
        <>
            {/* <HomeBannerAd /> */}

            <Suspense
                fallback={
                    <div className="p-8 text-center min-h-screen">
                        Loading news...
                    </div>
                }
            >
                {/* <FeedItemGrid /> */}
                <NewsMasonry />
            </Suspense>
        </>
    );
}
