"use client";
import { fetchNewsByFeedSlug } from "@/app/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Card_2 from "../card/Card_2";
import Card_3 from "../card/Card_3";

export default function SourcesList({
    slug,
    isNepali,
}: {
    slug: string;
    isNepali: boolean;
}) {
    const searchParams = useSearchParams();

    const {
        data: newsData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ["newsBySources", slug, searchParams.toString()],
        queryFn: ({ pageParam }) =>
            fetchNewsByFeedSlug({
                feed_slug: slug,
                isNepali,
                searchParams,
                pageParam,
            }),
        getNextPageParam: (lastPage) => lastPage.next ?? undefined,
        initialPageParam: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feeds/${slug}/news/`,
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

    if (isLoading) {
        return <div className="text-center my-20">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center my-20 text-red-600">
                Error: {(error as Error).message}
            </div>
        );
    }

    return (
        <div>
            {newsData?.pages.map((page, i) => (
                <div key={i} className="space-y-4">
                    {page.results.map((newsItem) => (
                        <div key={newsItem.uuid}>
                            <div className="hidden md:block">
                                <Card_2
                                    key={newsItem.uuid}
                                    newsDetail={newsItem}
                                />
                            </div>
                            <div className="md:hidden">
                                <Card_3 key={newsItem.uuid} news={newsItem} />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            <div ref={loadMoreRef} className="h-10" />
            {isFetchingNextPage && <div>Loading more...</div>}
        </div>
    );
}
