"use client";
import { fetchNews } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HotLinkFeedSlugList } from "@/data/constants";
import { stripHtmlTags, timeAgo } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HotlinkImage from "../../HotLinkImage";

export default function FeedItemList() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isNepali = true;

    const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>(
        {}
    );

    const handleImageError = (itemId: string) => {
        setImageErrorMap((prev) => ({
            ...prev,
            [itemId]: true,
        }));
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ["news", searchParams.toString()],
        queryFn: ({ pageParam }) =>
            fetchNews({ pageParam, isNepali, searchParams }),
        getNextPageParam: (lastPage) => lastPage.next ?? undefined,
        initialPageParam: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/news/`,
    });

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!loadMoreRef.current || !hasNextPage) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );
        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading)
        return <div className="p-4 text-center min-h-screen">लोड हुँदै...</div>;
    if (error)
        return (
            <div className="p-4 text-center text-red-500">
                समाचार लोड गर्न त्रुटि।
            </div>
        );

    return (
        <div className="md:my-8 space-y-8 mx-auto max-w-5xl sm:px-6 lg:px-8">
            {data?.pages.map((page, i) =>
                page.results.map((item: FeedItem) => (
                    <div
                        className="border-b-2 last:border-b-0 cursor-pointer transition-shadow md:bg-white rounded-lg md:shadow-sm md:hover:shadow-md"
                        key={item.uuid}
                        onClick={() => router.push(`/news/${item.slug}`)}
                    >
                        <div className="px-4 py-1 sm:p-6">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-6 tracking-wider hover:text-brand-red">
                                {item.title}
                            </h1>

                            {HotLinkFeedSlugList.includes(item.feed.slug) ? (
                                <HotlinkImage
                                    src={item.image_url}
                                    alt={item.title}
                                    classname="object-cover w-full h-48 sm:h-64 md:h-80 lg:h-96 md:my-2"
                                    onError={() => handleImageError(item.uuid)}
                                />
                            ) : (
                                <Link
                                    href={`/news/${item.slug}`}
                                    className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-4"
                                >
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="object-cover rounded-lg w-full h-full"
                                        loading="lazy"
                                        onError={() =>
                                            handleImageError(item.uuid)
                                        }
                                    />
                                </Link>
                            )}

                            {imageErrorMap[item.uuid] && (
                                <p className="line-clamp-4">
                                    {stripHtmlTags(item.summary)}
                                </p>
                            )}

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm my-4">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline">
                                        {item.feed.name_nepali}
                                    </Badge>
                                    <span className="text-muted-foreground">
                                        {timeAgo(item.published_at)}
                                    </span>
                                </div>
                                <Button
                                    className="border-brand-red bg-red-100"
                                    size="sm"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Link
                                        href={`/news/${item.slug}`}
                                        className="text-lg text-brand-red font-semibold line"
                                    >
                                        थप पढ्नुहोस्
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {hasNextPage && (
                <div
                    ref={loadMoreRef}
                    className="text-center py-4 text-sm text-muted-foreground"
                >
                    {isFetchingNextPage
                        ? "थप लोड हुँदै..."
                        : "थप लोड गर्न स्क्रोल गर्नुहोस्..."}
                </div>
            )}
        </div>
    );
}
