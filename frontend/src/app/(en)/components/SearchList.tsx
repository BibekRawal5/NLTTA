"use client";

import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchNews } from "@/app/actions";
import SearchItemCard from "./SearchItemCard";

export default function SearchList({ query }: { query: string }) {
    const searchParams = new URLSearchParams({ search: query });
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

    if (isLoading) {
        return <p className="text-gray-600">Loading...</p>;
    }

    if (error) {
        return (
            <p className="text-gray-600">
                An error occurred: {(error as Error).message}
            </p>
        );
    }

    if (!data?.pages.flatMap((page) => page.results).length) {
        return <p className="text-gray-600">No results found for "{query}".</p>;
    }

    return (
        <div className="space-y-4 max-w-4xl">
            {data?.pages.map((page) =>
                page.results.map((newsItem) => (
                    <SearchItemCard key={newsItem.slug} newsDetail={newsItem} />
                ))
            )}
            <div ref={loadMoreRef} className="h-10">
                {isFetchingNextPage && (
                    <p className="text-gray-600">Loading more...</p>
                )}
            </div>
        </div>
    );
}
