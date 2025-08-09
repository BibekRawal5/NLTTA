"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchItemCard from "./SearchItemCard";

// Fetch function: uses GET request with query param
export async function fetchLocalNews(query: string) {
    const finalUrl = `http://127.0.0.1:8000/api/feed-items/search?q=${query}`;

    try {
        const res = await fetch(finalUrl, {
            next: { revalidate: 300 }, // Cache for 5 minutes (optional)
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

export default function SearchList({ query }: { query: string }) {
    const {
        data: newsLocalData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["localNews", query],
        queryFn: () => fetchLocalNews(query),
        enabled: !!query, // Only run query if query is not empty
    });
    console.log(SearchList)
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    if (isLoading) {
        return <p className="text-gray-600">लोड हुँदैछ...</p>;
    }

    if (error) {
        return (
            <p className="text-gray-600">
                त्रुटि भयो: {(error as Error).message}
            </p>
        );
    }
    console.log(newsLocalData)
    if (!newsLocalData?.results?.length) {
        return (
            <p className="text-gray-600">
                "{query}" को लागि कुनै परिणाम फेला परेन।
            </p>
        );
    }

    return (
        <div className="space-y-4 max-w-4xl">
            {newsLocalData.results.map((newsItem) => (
                <SearchItemCard key={newsItem.slug} newsDetail={newsItem} />
            ))}

            {/* Load more feature placeholder */}
            <div ref={loadMoreRef} className="h-10"></div>
        </div>
    );
}
