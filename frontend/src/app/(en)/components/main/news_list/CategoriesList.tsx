"use client";
import { fetchNewsByCategory } from "@/app/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Card_2 from "../card/Card_2";
import Card_3 from "../card/Card_3";

export default function CategoriesList({
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
        queryKey: ["newsByCategory", slug, searchParams.toString()],
        queryFn: ({ pageParam }) =>
            fetchNewsByCategory({
                category_slug: slug,
                isNepali,
                searchParams,
                pageParam,
            }),
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
        return <div className="text-center my-20">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center my-20 text-red-600">
                Error: {(error as Error).message}
            </div>
        );
    }

    const hasNoResults = newsData?.pages.every(
        (page) => !page.results || page.results.length === 0
    );

    if (hasNoResults) {
        return (
            <div className="flex flex-col items-center justify-center my-20 text-center">
                <SearchX className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    No News Found
                </h2>
                <p className="text-lg text-gray-600 max-w-md">
                    We couldn't find any news for "
                    <span className="font-medium">{slug}</span>". Try a
                    different search term.
                </p>
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
