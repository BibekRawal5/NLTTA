"use client";
import { fetchNews } from "@/app/actions";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function FeedItemGrid() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isNepali = false;

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

    if (isLoading) return <div className="p-4">Loading...</div>;
    if (error)
        return <div className="p-4 text-red-500">Error loading news.</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:my-8">
            {data?.pages.map((page, i) =>
                page.results.map((item: FeedItem) => (
                    <Card
                        className="p-5 overflow-hidden shadow-sm rounded-none cursor-pointer gap-1"
                        key={item.uuid}
                        onClick={() => router.push(`/en/news/${item.slug}`)}
                    >
                        <CardContent className="p-0">
                            <h1 className="font-semibold text-2xl leading-snug">
                                {item.title}
                            </h1>
                        </CardContent>
                        <div className="relative w-full h-48 md:my-2">
                            <img
                                src={item.image_url}
                                alt={item.title}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <CardFooter className="text-xs text-muted-foreground p-0 gap-2">
                            <span>{item.feed.name}</span>
                            <span className="font-bold">·</span>
                            <span>{timeAgo(item.published_at)}</span>
                        </CardFooter>
                    </Card>
                ))
            )}

            {hasNextPage && (
                <div
                    ref={loadMoreRef}
                    className="col-span-full text-center py-4 text-sm text-muted-foreground"
                >
                    {isFetchingNextPage
                        ? "Loading more..."
                        : "Scroll to load more..."}
                </div>
            )}
        </div>
    );
}
