"use client";
import { fetchNews } from "@/app/actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { HotLinkFeedSlugList } from "@/data/constants";
import { stripHtmlTags, timeAgo } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HotlinkImage from "../HotLinkImage";

export default function NewsMasonry() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isNepali = true;
    const [allItems, setAllItems] = useState<FeedItem[]>([]);

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

    // Update allItems when data changes
    useEffect(() => {
        if (data?.pages) {
            const items = data.pages.flatMap((page) => page.results);
            setAllItems(items);
        }
    }, [data]);

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
        return <div className="p-8 text-center min-h-screen">लोड हुँदै...</div>;
    if (error)
        return <div className="p-4 text-red-500">समाचार लोड गर्न त्रुटि।</div>;

    // Split items into 3 columns manually for better control
    const columnCount =
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    const columns: FeedItem[][] = Array.from(
        { length: columnCount },
        () => [] as FeedItem[]
    );

    // Distribute items across columns in a way that preserves order
    allItems.forEach((item, index) => {
        const columnIndex = index % columnCount;
        columns[columnIndex].push(item);
    });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:my-8">
            {columns.map((columnItems, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-2">
                    {columnItems.map((item: FeedItem, index) => (
                        <Card
                            className="p-5 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 rounded-none cursor-pointer gap-1 group"
                            key={item.uuid}
                            onClick={() => router.push(`/news/${item.slug}`)}
                        >
                            <CardContent className="p-0">
                                <h1 className="font-semibold text-2xl leading-snug group-hover:text-brand-red transition-colors duration-200">
                                    {item.title}
                                </h1>
                            </CardContent>
                            {HotLinkFeedSlugList.includes(item.feed.slug) ? (
                                <>
                                    <HotlinkImage
                                        src={item.image_url}
                                        alt={item.title}
                                        classname="object-cover w-full h-48 md:my-2"
                                    />
                                    {item.summary && (
                                        <p className="line-clamp-1 text-muted-foreground">
                                            {stripHtmlTags(item.summary)}
                                        </p>
                                    )}
                                </>
                            ) : (
                                <div className="relative w-full h-48 md:my-2">
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="object-cover h-full w-full"
                                        loading="lazy"
                                    />
                                </div>
                            )}

                            <CardFooter className="text-sm text-gray-600 p-0 gap-2 pt-1">
                                <span>{item.feed.name}</span>
                                <span className="font-bold">·</span>
                                <span>{timeAgo(item.published_at)}</span>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ))}

            {hasNextPage && (
                <div
                    ref={loadMoreRef}
                    className="col-span-full text-center py-4 text-sm text-muted-foreground"
                >
                    {isFetchingNextPage
                        ? "थप लोड हुँदै..."
                        : "थप लोड गर्न स्क्रोल गर्नुहोस्..."}
                </div>
            )}
        </div>
    );
}
