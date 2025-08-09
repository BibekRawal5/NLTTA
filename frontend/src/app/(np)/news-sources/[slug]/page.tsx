import { fetchNewsByFeedSlug } from "@/app/actions";
import { SearchX } from "lucide-react";
import { Metadata } from "next";
import SourcesList from "../../components/main/news_list/SourcesList";
import TrendingNewsCard from "../../components/right_sidebar/card/TrendingNewsCard";

interface NewsSourcePageParams {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: NewsSourcePageParams): Promise<Metadata> {
    const { slug } = await params;
    const isNepali = true;

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
                title: "समाचार फेला परेन",
                description: `यो स्लगको लागि कुनै समाचार फेला परेन: ${slug}`,
            };
        }

        const { feed } = newsData;
        const title = feed.seo_meta_title_nepali;
        const description = feed.seo_meta_description_nepali;
        const keywords = feed.seo_meta_keywords_nepali;
        const imageUrl = feed.seo_meta_image_url || "/og-image.jpg";

        return {
            title: `${title} | नोटिफाइ नेपाल`,
            description,
            keywords,
            openGraph: {
                title: `${title} | नोटिफाइ नेपाल`,
                description,
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: `${feed.name_nepali} लोगो`,
                    },
                ],
            },
        };
    } catch (error) {
        return {
            title: "त्रुटि",
            description: `यो स्लगको लागि समाचार लोड गर्न असफल: ${slug}`,
        };
    }
}

export default async function NpNewsSourceDetailPage({
    params,
}: NewsSourcePageParams) {
    const { slug } = await params;
    const isNepali = true;

    let newsData;
    try {
        newsData = await fetchNewsByFeedSlug({ feed_slug: slug, isNepali });
    } catch (error) {
        return (
            <div className="flex flex-col items-center justify-center my-20 text-center">
                <SearchX className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    समाचार लोड गर्दा त्रुटि
                </h2>
                <p className="text-lg text-gray-600 max-w-md">
                    हामीले "<span className="font-medium">{slug}</span>" को लागि
                    समाचार लोड गर्दा समस्या भयो। कृपया पछि पुन: प्रयास
                    गर्नुहोस्।
                </p>
            </div>
        );
    }

    if (!newsData.feed || !newsData.results || newsData.results.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center my-20 text-center">
                <SearchX className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    कुनै समाचार फेला परेन
                </h2>
                <p className="text-lg text-gray-600 max-w-md">
                    हामीले "<span className="font-medium">{slug}</span>" को लागि
                    कुनै समाचार फेला पार्न सकेनौं। कृपया फरक समाचार स्रोत प्रयोग
                    गर्नुहोस्।
                </p>
            </div>
        );
    }

    const { feed, results: news } = newsData;
    const sourceName = feed.name_nepali;
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
                {/* Left: News List */}
                <div className="col-span-5">
                    <SourcesList slug={slug} isNepali={isNepali} />
                </div>
                {/* Right: Trending News */}
                <div className="md:col-span-2 space-y-2 hidden md:block">
                    {news.map((newsItem) => (
                        <TrendingNewsCard key={newsItem.uuid} news={newsItem} />
                    ))}
                </div>
            </div>
        </div>
    );
}
