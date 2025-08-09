"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function SearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const currentPath = usePathname();

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const isClearedRef = useRef(false); // Track if search was recently cleared

    // Sync search term with URL when searchParams change
    useEffect(() => {
        if (!searchParams) return;
        const urlSearchTerm = searchParams.get("q") || "";
        setSearchTerm(urlSearchTerm);
    }, [searchParams]);

    // Update URL when debounced search term changes, only on /en/search
    useEffect(() => {
        if (
            currentPath === "/en/search" &&
            !isClearedRef.current &&
            debouncedSearchTerm === searchTerm // Only update if debounced value matches current searchTerm
        ) {
            const params = new URLSearchParams(searchParams);

            if (debouncedSearchTerm.length >= 3 || debouncedSearchTerm === "") {
                if (debouncedSearchTerm.length) {
                    params.set("q", debouncedSearchTerm);
                } else {
                    params.delete("q");
                }
                const newUrl = `/en/search${
                    params.toString() ? `?${params.toString()}` : ""
                }`;

                router.replace(newUrl, { scroll: false });
            }
        }
    }, [debouncedSearchTerm, searchTerm, router, searchParams, currentPath]);

    // Handle direct Enter key submission
    const handleSearch = () => {
        isClearedRef.current = false; // Reset clear flag
        const params = new URLSearchParams(searchParams);
        if (searchTerm.length >= 3) {
            params.set("q", searchTerm);
            const newUrl = `/en/search${
                params.toString() ? `?${params.toString()}` : ""
            }`;
            router.push(newUrl);
        } else if (searchTerm === "") {
            params.delete("q");
            const newUrl = `/en/search`;
            router.push(newUrl);
        }
    };

    // Clear search term and update URL
    const handleClear = () => {
        isClearedRef.current = true; // Block debounce effect
        setSearchTerm("");
        if (currentPath === "/en/search") {
            const params = new URLSearchParams(searchParams);
            params.delete("q");
            const newUrl = `/en/search`;
            router.replace(newUrl, { scroll: false });
            // Reset clear flag after debounce delay
            setTimeout(() => {
                isClearedRef.current = false;
            }, 500);
        }
    };

    return (
        <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-800 mt-0.5" />
            <Input
                placeholder="Search news by title, descriptions..."
                className="pl-8 w-full md:w-[350px] bg-white text-gray-800 py-5"
                value={searchTerm}
                onChange={(e) => {
                    isClearedRef.current = false;
                    setSearchTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
            {searchTerm && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-800"
                    onClick={handleClear}
                    type="button"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear search</span>
                </Button>
            )}
        </div>
    );
}
