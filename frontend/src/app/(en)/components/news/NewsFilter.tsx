"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FacetedFilter } from "./FacetedFilter";
import { newsSources } from "@/data/news_source";
import NewsCategories from "./NewsCategories";
import SearchBar from "../SearchBar";

interface NewsFiltersProps {
    setOpenSheet: (open: boolean) => void;
}

export default function NewsFilters({ setOpenSheet }: NewsFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Initialize states from URL parameters
    // const [publishedFrom, setPublishedFrom] = useState(
    //     searchParams.get("published_at__gte") || ""
    // );
    // const [publishedTo, setPublishedTo] = useState(
    //     searchParams.get("published_at__lte") || ""
    // );

    const [feedLanguage, setFeedLanguage] = useState(
        searchParams.get("feed__language") || ""
    );
    const [selectedFeeds, setSelectedFeeds] = useState<Set<string>>(
        new Set(searchParams.get("feed")?.split(",").filter(Boolean) || [])
    );

    // const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    // const [orderBy, setOrderBy] = useState(
    //     searchParams.get("ordering") || "published_at_descending"
    // );

    // const feedOptions = newsSources.map((source) => ({
    //     label: source.name,
    //     value: source.slug,
    // }));

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create new URLSearchParams object
        const params = new URLSearchParams();

        // Add parameters if they have values
        //if (publishedFrom) params.set("published_at__gte", publishedFrom);
        // if (publishedTo) params.set("published_at__lte", publishedTo);
        if (feedLanguage) params.set("feed__language", feedLanguage);
        if (selectedFeeds.size > 0) {
            const feeds = Array.from(selectedFeeds).filter((v) => v !== "");
            if (feeds.length > 0) params.set("feed", feeds.join(","));
        }
        // if (searchQuery) params.set("q", searchQuery);
        // if (orderBy) params.set("ordering", orderBy);

        // Navigate to the same page with updated query parameters
        router.push(`${pathname}?${params.toString()}`);
    };

    // Handle search form submission
    // const handleSearch = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     // Keep existing params but update the search query
    //     const params = new URLSearchParams(searchParams);
    //     if (searchQuery) {
    //         params.set("q", searchQuery);
    //     } else {
    //         params.delete("q");
    //     }

    //     router.push(
    //         `/en/search${params.toString() ? `?${params.toString()}` : ""}`
    //     );
    // };

    // Reset all filters
    // const resetFilters = () => {
    //     // setPublishedFrom("");
    //     // setPublishedTo("");
    //     // setFeedLanguage("");
    //     // setSelectedFeeds(new Set());
    //     //setSearchQuery("");
    //     // setOrderBy("published_at_descending");
    //     router.push("/en");
    // };

    return (
        <div className="space-y-8 text-xl mb-8">
            <div className="space-y-2 mt-4">
                <h3 className="font-medium">Search</h3>
                <SearchBar />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">
                    {/* <h3 className="font-medium">Filter Options</h3> */}

                    {/* News Categories */}
                    <div className="space-y-2">
                        <Label htmlFor="selectedFeed" className="text-xl">
                            News Categories
                        </Label>
                        <NewsCategories setOpenSheet={setOpenSheet} />
                    </div>

                    {/* Published after (date) */}
                    {/* <div className="space-y-2">
                        <Label htmlFor="publishedFrom">
                            Published after (date)
                        </Label>
                        <Input
                            id="publishedFrom"
                            type="date"
                            value={publishedFrom}
                            onChange={(e) => setPublishedFrom(e.target.value)}
                        />
                    </div> */}

                    {/* Published before (date) */}
                    {/* <div className="space-y-2">
                        <Label htmlFor="publishedTo">
                            Published before (date)
                        </Label>
                        <Input
                            id="publishedTo"
                            type="date"
                            value={publishedTo}
                            onChange={(e) => setPublishedTo(e.target.value)}
                        />
                    </div> */}

                    {/* News Source */}
                    {/* <div className="space-y-2">
                        <Label htmlFor="selectedFeed" className="text-xl">
                            News Source
                        </Label>
                        <FacetedFilter
                            title="News Source"
                            options={feedOptions}
                            selectedValues={selectedFeeds}
                            onChange={setSelectedFeeds}
                        />
                    </div> */}

                    {/* Sort by */}
                    {/* <div className="space-y-2">
                        <Label>
                            Sort by
                        </Label>
                        <RadioGroup
                            value={orderBy}
                            onValueChange={setOrderBy}
                            className="space-y-1"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="-published_at"
                                    id="newest"
                                />
                                <Label htmlFor="newest">
                                    Newest first
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="published_at"
                                    id="oldest"
                                />
                                <Label htmlFor="oldest">
                                    Oldest first
                                </Label>
                            </div>
                        </RadioGroup>
                    </div> */}
                </div>

                {/* <div className="flex justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={resetFilters}
                    >
                        Reset
                    </Button>
                    <Button type="submit">Apply Filters</Button>
                </div> */}
            </form>
        </div>
    );
}
