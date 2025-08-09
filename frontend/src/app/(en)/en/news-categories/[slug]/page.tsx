import CategoriesList from "@/app/(en)/components/main/news_list/CategoriesList";
import TrendingNewsCard from "@/app/(en)/components/right_sidebar/card/TrendingNewsCard";
import { fetchNewsByCategory, getFeedItems } from "@/app/actions";
import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const isNepali = false;

    const newsData = await fetchNewsByCategory({
        category_slug: slug,
        isNepali,
    });

    if (!newsData.results || newsData.results.length === 0) {
        return {
            title: "Category Not Found",
            description: `No news found for the category slug: ${slug}`,
        };
    }

    const categoryData = newsData.news_category;

    return {
        title: categoryData?.seo_meta_title,
        description: categoryData?.seo_meta_description,
        keywords: categoryData?.seo_meta_keywords,
        openGraph: {
            title: categoryData?.seo_meta_title,
            description: categoryData?.seo_meta_description,
            type: "website",
            images: categoryData?.seo_meta_image_url
                ? [
                      {
                          url: categoryData?.seo_meta_image_url,
                          width: 1200,
                          height: 630,
                          alt: `${categoryData?.name} Category Image`,
                      },
                  ]
                : [],
        },
    };
}

export default async function EnNewsCategoriesDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const isNepali = false;

    const news = await getFeedItems({ isNepali });

    const newsData = await fetchNewsByCategory({
        category_slug: slug,
        isNepali,
    });

    const categoryData = newsData.news_category;
    const sourceName = categoryData ? categoryData.name : "Unknown Source";

    return (
        <div className="my-4 sm:my-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {sourceName}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {/* Left */}
                <div className="col-span-5">
                    <CategoriesList slug={slug} isNepali={isNepali} />
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
