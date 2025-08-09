import { getFeedItems, getNewsDetail } from "@/app/actions";
import { notFound } from "next/navigation";
import TrendingNewsCard from "../../components/right_sidebar/card/TrendingNewsCard";
import { Metadata } from "next";
import Card_1 from "../../components/main/card/Card_1";
import NewsDetailAd from "../../components/ads/NewsDetailAd";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const isNepali = true;

    const newsDetail = await getNewsDetail(slug);

    if (!newsDetail) {
        return {
            title: "समाचार फेला परेन",
            description: `यो स्लगको लागि कुनै समाचार फेला परेन: ${slug}`,
        };
    }

    const articleTitle = newsDetail.title || "शीर्षकविहीन समाचार";
    const description =
        newsDetail.summary ||
        `नोटिफाइ नेपाल, एक प्रमुख समाचार पोर्टल, मा "${articleTitle}" को नवीनतम समाचार पढ्नुहोस्, जसले नेपाल र विश्वभरका गहन कथाहरू र अन्तर्दृष्टिहरू प्रदान गर्दछ।`;
    const imageUrl =
        newsDetail.image_url || newsDetail.feed.logo_url || "/og-image.jpg";

    return {
        title: `${articleTitle} | नोटिफाइ नेपाल`,
        description,
        openGraph: {
            title: `${articleTitle} | नोटिफाइ नेपाल`,
            description,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${articleTitle} तस्वीर`,
                },
            ],
            type: "article",
            publishedTime: newsDetail.published_at,
            authors: (newsDetail?.authors || []).map((author) => author.name),
        },
        twitter: {
            card: "summary_large_image",
            title: `${articleTitle} | नोटिफाइ नेपाल`,
            description,
            images: [imageUrl],
        },
    };
}

export default async function NpNewsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const isNepali = true;
    const news = await getFeedItems({ isNepali });
    const newsDetail = await getNewsDetail(slug);

    if (!newsDetail) return notFound();

    return (
        <div className="sm:my-8">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                <div className="md:col-span-5 text-justify">
                    <Card_1 newsDetail={newsDetail} />
                    {/* <NewsDetailAd /> */}
                </div>
                <div className="md:col-span-2 space-y-2 hidden md:block">
                    {news?.map((news: NewsFeedItem) => (
                        <TrendingNewsCard news={news} key={news.uuid} />
                    ))}
                </div>
            </div>
        </div>
    );
}
