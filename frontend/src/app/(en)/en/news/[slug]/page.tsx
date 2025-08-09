import NewsDetailAd from "@/app/(en)/components/ads/NewsDetailAd";
import Card_1 from "@/app/(en)/components/main/card/Card_1";
import TrendingNewsCard from "@/app/(en)/components/right_sidebar/card/TrendingNewsCard";
import { getFeedItems, getNewsDetail } from "@/app/actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const isNepali = false;

    const newsDetail = await getNewsDetail(slug);

    if (!newsDetail) {
        return {
            title: "News Not Found",
            description: `No news article found for the slug: ${slug}`,
        };
    }

    const articleTitle = newsDetail.title || "Untitled Article";
    const description =
        newsDetail.summary ||
        `Read the latest on "${articleTitle}" at Notify Nepal, a premier news portal delivering in-depth stories and insights from Nepal and beyond.`;
    const imageUrl =
        newsDetail.image_url || newsDetail.feed.logo_url || "/og-image.jpg";

    return {
        title: `${articleTitle} | Notify Nepal`,
        description,
        openGraph: {
            title: `${articleTitle} | Notify Nepal`,
            description,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${articleTitle} Image`,
                },
            ],
            type: "article",
            publishedTime: newsDetail.published_at,
            authors:
                newsDetail.authors?.map((author) => author.name) || undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: `${articleTitle} | Notify Nepal`,
            description,
            images: [imageUrl],
        },
    };
}

export default async function EnNewsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const isNepali = false;
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
