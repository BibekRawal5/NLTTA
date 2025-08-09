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

    const initialSearchTerm = searchParams.get("q") || "";
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const isClearedRef = useRef(false); //Clear flag

    // Sync search term when URL changes
    useEffect(() => {
        if (!searchParams) return;
        const urlSearchTerm = searchParams.get("q") || "";
        setSearchTerm(urlSearchTerm);
    }, [searchParams]);

    // Update URL when debounced search term changes only on /search
    useEffect(() => {
        if (
            currentPath === "/search" &&
            !isClearedRef.current &&
            debouncedSearchTerm === searchTerm // Only update if debounced value matches current searchTerm
        ) {
            const params = new URLSearchParams(searchParams);

            if (debouncedSearchTerm.length >= 3 || debouncedSearchTerm === "") {
                if (debouncedSearchTerm) {
                    params.set("q", debouncedSearchTerm);
                } else {
                    params.delete("q");
                }
                router.replace(
                    `/search${
                        params.toString() ? `?${params.toString()}` : ""
                    }`,
                    {
                        scroll: false,
                    }
                );
            }
        }
    }, [debouncedSearchTerm, router, searchParams, currentPath, searchTerm]);

    // Handle direct Enter key submission
    const handleSearch = () => {
        isClearedRef.current = false;
        const params = new URLSearchParams(searchParams);
        if (searchTerm.length >= 3) {
            params.set("q", searchTerm);
            const newUrl = `/search${
                params.toString() ? `?${params.toString()}` : ""
            }`;
            router.push(newUrl);
        } else if (searchTerm === "") {
            params.delete("q");
            const newUrl = `/search`;
            router.push(newUrl);
        }
    };

    // Clear search term and update URL
    const handleClear = () => {
        isClearedRef.current = true; //block debounced effect
        setSearchTerm("");
        if (currentPath === "/search") {
            const params = new URLSearchParams(searchParams);
            params.delete("q");
            const newUrl = `/search`;
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
                placeholder="शीर्षक वा विवरणमार्फत समाचार खोज्नुहोस्..."
                className="pl-8 w-full md:w-[350px] bg-white text-gray-800 placeholder:text-lg py-5"
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
