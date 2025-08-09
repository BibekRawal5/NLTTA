"use client";
import { fetchNews } from "@/app/actions";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Card_3 from "../card/Card_3";

export default function NewsList_2() {
    const searchParams = useSearchParams();
    const isNepali = true;

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
        return <div className="p-4 text-center">समाचार लोड हुँदै...</div>;
    if (error)
        return (
            <div className="p-4 text-center text-red-500">
                समाचार लोड गर्न त्रुटि। कृपया पुन: प्रयास गर्नुहोस्।
            </div>
        );

    return (
        <div className="my-2 md:my-8 mx-auto max-w-5xl sm:px-6 lg:px-8">
            {data?.pages.map((page, i) =>
                page.results.map((item: FeedItem) => (
                    <Card_3 news={item} key={item.uuid} />
                ))
            )}

            {hasNextPage && (
                <div
                    ref={loadMoreRef}
                    className="text-center py-4 text-sm text-muted-foreground"
                >
                    {isFetchingNextPage
                        ? "समाचार लोड हुँदै..."
                        : "थप लोड गर्न स्क्रोल गर्नुहोस्..."}
                </div>
            )}
        </div>
    );
}
