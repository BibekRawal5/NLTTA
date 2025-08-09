import SourcesList from "@/app/(en)/components/main/news_list/SourcesList";
import TrendingNewsCard from "@/app/(en)/components/right_sidebar/card/TrendingNewsCard";
import { fetchNewsByFeedSlug } from "@/app/actions";
import { SearchX } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const isNepali = false;

    try {
        const newsData = await fetchNewsByFeedSlug({
            feed_slug: slug,
            isNepali,
        });

        if (
            !newsData.feed ||
            !newsData.results ||
            newsData.results.length === 0
        ) {
            return {
                title: "News Not Found",
                description: `No news found for the slug: ${slug}`,
            };
        }

        const { feed } = newsData;
        const title = feed.seo_meta_title;
        const description = feed.seo_meta_description;
        const keywords = feed.seo_meta_keywords;
        const imageUrl = feed.seo_meta_image_url || "/og-image.jpg";

        return {
            title: `${title} | Notify Nepal`,
            description,
            keywords,
            openGraph: {
                title: `${title} | Notify Nepal`,
                description,
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: `${feed.name} Logo`,
                    },
                ],
            },
        };
    } catch (error) {
        return {
            title: "Error",
            description: `Failed to load news for the slug: ${slug}`,
        };
    }
}

export default async function EnNewsSourceDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const isNepali = false;

    let newsData;

    try {
        newsData = await fetchNewsByFeedSlug({ feed_slug: slug, isNepali });
    } catch (error) {
        return (
            <div className="flex flex-col items-center justify-center my-20 text-center">
                <SearchX className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Error Loading News
                </h2>
                <p className="text-lg text-gray-600 max-w-md">
                    We encountered an issue while fetching news for "
                    <span className="font-medium">{slug}</span>". Please try
                    again later.
                </p>
            </div>
        );
    }

    if (!newsData.feed || !newsData.results || newsData.results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center my-20 text-center">
                <SearchX className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    No News Found
                </h2>
                <p className="text-lg text-gray-600 max-w-md">
                    We couldn't find any news for "
                    <span className="font-medium">{slug}</span>". Try a
                    different news source.
                </p>
            </div>
        );
    }

    const { feed, results: news } = newsData;
    const sourceName = feed.name;
    const logoUrl = feed.favicon_url;

    return (
        <div className="my-4 sm:my-8">
            <div className="flex items-center gap-4 mb-6">
                {logoUrl && (
                    <div className="flex-shrink-0 bg-white rounded-full">
                        <img
                            src={logoUrl}
                            alt={`${sourceName} logo`}
                            width={64}
                            height={64}
                            className="rounded-full object-contain"
                        />
                    </div>
                )}
                <h1 className="text-3xl md:text-5xl font-bold">{sourceName}</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {/* Left */}
                <div className="col-span-5">
                    <SourcesList slug={slug} isNepali={isNepali} />
                </div>
                {/* Right */}
                <div className="md:col-span-2 space-y-2 hidden md:block">
                    {news?.map((news) => (
                        <TrendingNewsCard key={news.uuid} news={news} />
                    ))}
                </div>
            </div>
        </div>
    );
}
