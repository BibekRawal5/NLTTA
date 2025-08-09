interface FetchNewsParams {
    pageParam?: string;
    isNepali?: boolean;
    searchParams?: URLSearchParams;
    feed_slug?: string;
    category_slug?: string;
}

interface FetchNewsBySlugParams {
    feed_slug?: string;
    category_slug?: string;
    isNepali?: boolean;
    searchParams?: URLSearchParams;
    pageParam?: string;
}

export async function fetchNews({
    pageParam = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/`,
    isNepali = true,
    searchParams = new URLSearchParams(),
    feed_slug,
    category_slug,
}: FetchNewsParams): Promise<NewsApiResponse> {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        throw new Error("API base URL is not defined");
    }

    const url = new URL(pageParam);
    const existingParams = new URLSearchParams(url.search);

    const params = new URLSearchParams({
        ...Object.fromEntries(existingParams),
        ...Object.fromEntries(searchParams),
    });

    if (!params.has("feed__language")) {
        params.set("feed__language", isNepali ? "Nepali" : "English");
    }

    if (feed_slug) {
        params.set("feed__slug", feed_slug);
    }

    if (category_slug) {
        params.set("category__slug", category_slug);
    }

    const finalUrl = `${url.origin}${url.pathname}?${params.toString()}`;

    try {
        const res = await fetch(finalUrl, {
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        const data: NewsApiResponse = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function _fetchNewsByFeedSlug({
    feed_slug,
    isNepali = true,
    searchParams = new URLSearchParams(),
    pageParam = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/`,
}: FetchNewsBySlugParams): Promise<NewsApiResponse> {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        throw new Error("API base URL is not defined");
    }

    const url = new URL(pageParam);

    const params = new URLSearchParams(url.search);

    if (!params.has("feed__language")) {
        params.set("feed__language", isNepali ? "Nepali" : "English");
    }

    if (feed_slug) {
        params.set("feed__slug", feed_slug);
    }

    searchParams.forEach((value, key) => {
        params.set(key, value);
    });

    url.search = params.toString();

    try {
        const res = await fetch(url, {
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        const data: NewsApiResponse = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchNewsByCategory({
    category_slug,
    isNepali = true,
    searchParams = new URLSearchParams(),
    pageParam = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/`,
}: FetchNewsBySlugParams): Promise<NewsCategoriesApiResponse> {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        throw new Error("API base URL is not defined");
    }
    const url = new URL(pageParam);

    const params = new URLSearchParams(url.search);

    if (!params.has("feed__language")) {
        params.set("feed__language", isNepali ? "Nepali" : "English");
    }

    if (category_slug) {
        params.set("category__slug", category_slug);
    }

    searchParams.forEach((value, key) => {
        params.set(key, value);
    });

    url.search = params.toString();

    try {
        const res = await fetch(url, {
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        const data: NewsCategoriesApiResponse = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getFeedItems({
    isNepali = true,
}: {
    isNepali?: boolean;
} = {}): Promise<NewsFeedItem[] | null> {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        throw new Error("API base URL is not defined");
    }

    const languageParam = `feed__language=${isNepali ? "Nepali" : "English"}`;
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/trending?${languageParam}`;

    try {
        const res = await fetch(url, {
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        return null;
    }
}

export async function getNewsDetail(slug: string): Promise<FeedItem | null> {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        throw new Error("API base URL is not defined");
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/${slug}/`;

    try {
        const res = await fetch(url, {
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!res.ok) {
            if (res.status === 404) {
                console.log(`News item not found with slug: ${slug}`);
                return null;
            }
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        return res.json();
    } catch (error) {
        return null;
    }
}

export async function fetchNewsByFeedSlug({
    feed_slug,
    isNepali = true,
    searchParams = new URLSearchParams(),
    pageParam = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feeds/${feed_slug}/news/`,
}: FetchNewsBySlugParams): Promise<NewsFeedApiResponse> {
    if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
        throw new Error("API base URL is not defined");
    }

    const url = new URL(pageParam);

    const params = new URLSearchParams(url.search);

    if (!params.has("feed__language")) {
        params.set("feed__language", isNepali ? "Nepali" : "English");
    }

    searchParams.forEach((value, key) => {
        params.set(key, value);
    });

    url.search = params.toString();

    try {
        const res = await fetch(url, {
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        const data: NewsFeedApiResponse = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}
