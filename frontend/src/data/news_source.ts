import Feeds from './feeds.json';

export const OrgiNewsSources = Feeds

export const newsSources: NewsSource[] = OrgiNewsSources.map((source) => ({
    slug: source.slug,
    name: source.name,
    name_nepali: source.name_nepali,
    title: source.title,
    description: source.description || source.subtitle,
    language: source.language,
    logo_url: source.favicon_url,
    is_active: source.is_active,
    detail_url:
        source.language === "Nepali"
            ? `/news-sources/${source.slug}`
            : `/en/news-sources/${source.slug}`,
    seo_meta_title: source.seo_meta_title,
    seo_meta_description: source.seo_meta_description,
    seo_meta_keywords: source.seo_meta_keywords,
}));
