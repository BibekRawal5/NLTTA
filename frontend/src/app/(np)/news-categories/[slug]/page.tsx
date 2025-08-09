import { fetchNewsByCategory, getFeedItems } from "@/app/actions";
import { Metadata } from "next";
import CategoriesList from "../../components/main/news_list/CategoriesList";
import TrendingNewsCard from "../../components/right_sidebar/card/TrendingNewsCard";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const isNepali = true;

    const newsData = await fetchNewsByCategory({
        category_slug: slug,
        isNepali,
    });

    if (!newsData.results || newsData.results.length === 0) {
        return {
            title: "श्रेणी फेला परेन",
            description: `श्रेणी स्लग "${slug}" को लागि कुनै समाचार फेला परेन`,
        };
    }

    const categoryData = newsData.news_category;

    return {
        title: categoryData?.seo_meta_title_nepali,
        description: categoryData?.seo_meta_description_nepali,
        keywords: categoryData?.seo_meta_keywords_nepali,
        openGraph: {
            title: categoryData?.seo_meta_title_nepali,
            description: categoryData?.seo_meta_description_nepali,
            type: "website",
            images: categoryData?.seo_meta_image_url
                ? [
                      {
                          url: categoryData?.seo_meta_image_url,
                          width: 1200,
                          height: 630,
                          alt: `${categoryData?.name_nepali} श्रेणीको चित्र`,
                      },
                  ]
                : [],
        },
    };
}

export default async function NpNewsCategoriesDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const isNepali = true;

    const news = await getFeedItems({ isNepali });

    const newsData = await fetchNewsByCategory({
        category_slug: slug,
        isNepali,
    });

    const categoryData = newsData.news_category;
    const sourceName = categoryData
        ? categoryData.name_nepali
        : "अज्ञात श्रेणी";

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
