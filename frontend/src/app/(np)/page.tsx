import { Suspense } from "react";
import HomeBannerAd from "./components/ads/HomeBannerAd";
import NewsMasonry from "./components/news/NewsMasonry";

export default function Home() {
    return (
        <>
            {/* <HomeBannerAd /> */}

            <Suspense
                fallback={
                    <div className="p-8 text-center min-h-screen">
                        लोड हुँदै...
                    </div>
                }
            >
                {/* <FeedItemGrid /> */}
                <NewsMasonry />
            </Suspense>
        </>
    );
}
