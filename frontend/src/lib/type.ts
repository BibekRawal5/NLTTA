type FeedItem = {
    uuid: string;
    raw_category: string;
    slug: string;
    link: string;
    title: string;
    summary: string;
    content: string;
    image_url: string;
    published_at: string;
    published_raw_nepali_date: string;
    fetched_at: string;
    updated_at: string;
    seo_meta_title: string;
    seo_meta_title_nepali: string;
    seo_meta_keywords: string;
    seo_meta_description: string;
    visit_count: number;
    feed: {
        language: string;
        name: string;
        name_nepali: string;
        slug: string;
        website: string;
        logo_url: string;
    };
    authors: {
        name: string;
        slug: string;
    }[];
    categories: unknown[];
    topics: unknown[];
    category?: {
        name: string;
        name_nepali: string;
        slug: string;
    };
};

type NewsApiResponse = {
    results: FeedItem[];
    next: string | null;
    previous: string | null;
    count: number;
    page: number;
    pages: number;
    page_size: number;
};

type NewsSource = {
    slug: string;
    name: string;
    name_nepali: string;
    title: string;
    description: string | null;
    language: string;
    logo_url: string | null;
    is_active: boolean;
    detail_url: string;
    seo_meta_title: string;
    seo_meta_description: string;
    seo_meta_keywords: string;
};
type Categories = {
    seo_meta_title: string;
    seo_meta_description: string;
    seo_meta_title_nepali: string;
    seo_meta_description_nepali: string;
    seo_meta_image: string | null;
    seo_meta_image_url: string | null;
    seo_meta_keywords: string;
    seo_meta_keywords_nepali: string;
    slug: string;
    name: string;
    name_nepali: string;
};

type NewsCategories = {
    uuid: string;
    created_at: string;
    modified_at: string | null;
    seo_meta_title: string;
    seo_meta_description: string;
    seo_meta_title_nepali: string;
    seo_meta_description_nepali: string;
    seo_meta_image: string | null;
    seo_meta_image_url: string | null;
    seo_meta_keywords: string;
    seo_meta_keywords_nepali: string;
    visit_count: number;
    slug: string;
    name: string;
    name_nepali: string;
    logo_url: string | null;
    website: string;
    description: string;
    is_active: boolean;
    language: string;
    title: string;
    subtitle: string;
    updated_at: string;
};

type NewsFeedItem = {
    uuid: string;
    raw_category: string;
    slug: string;
    link: string;
    title: string;
    summary: string;
    content: string;
    image_url: string;
    published_at: string;
    published_raw_nepali_date: string;
    fetched_at: string;
    updated_at: string;
    seo_meta_title: string;
    seo_meta_title_nepali: string;
    seo_meta_keywords: string;
    seo_meta_description: string;
    visit_count: number;
    feed: {
        language: string;
        name: string;
        name_nepali: string;
        slug: string;
        website: string;
        logo_url: string;
    };
    authors: {
        name: string;
        slug: string;
    }[];
    categories: unknown[];
    topics: unknown[];
    category?: {
        name: string;
        name_nepali: string;
        slug: string;
    };
};

type NewsFeedSource = {
    uuid: string;
    created_at: string;
    modified_at: string | null;
    seo_meta_title: string;
    seo_meta_description: string;
    seo_meta_title_nepali: string;
    seo_meta_description_nepali: string;
    seo_meta_image: string | null;
    seo_meta_image_url: string | null;
    seo_meta_keywords: string;
    seo_meta_keywords_nepali: string;
    visit_count: number;
    slug: string;
    name: string;
    name_nepali: string;
    logo_url: string | null;
    favicon_url: string | null;
    website: string;
    description: string;
    is_active: boolean;
    language: string;
    title: string;
    subtitle: string;
    updated_at: string;
};

type NewsFeedApiResponse = {
    next: string | null;
    previous: string | null;
    count: number;
    page: number;
    pages: number;
    page_size: number;
    results: FeedItem[];
    feed: NewsFeedSource;
};

type NewsCategoriesApiResponse = {
    next: string | null;
    previous: string | null;
    count: number;
    page: number;
    pages: number;
    page_size: number;
    results: FeedItem[];
    news_category: NewsCategories;
};
