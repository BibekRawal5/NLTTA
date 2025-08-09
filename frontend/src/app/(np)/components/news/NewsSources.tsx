"use client";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { newsSources } from "@/data/news_source";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NewsSources() {
    const pathname = usePathname();
    const router = useRouter();

    // Filter for Nepali language and active sources only
    const nepaliSources = newsSources.filter(
        (source) => source.language === "Nepali" && source.is_active
    );

    const currentSlug = pathname.split("/").pop();
    const [selectedSource, setSelectedSource] = useState(
        currentSlug &&
            nepaliSources.some((source) => source.slug === currentSlug)
            ? currentSlug
            : ""
    );
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const newSlug = pathname.split("/").pop();
        if (
            newSlug &&
            nepaliSources.some((source) => source.slug === newSlug) &&
            newSlug !== selectedSource
        ) {
            setSelectedSource(newSlug);
        } else if (
            !newSlug ||
            !nepaliSources.some((source) => source.slug === newSlug)
        ) {
            setSelectedSource("");
        }
    }, [pathname]);

    const handleSourceChange = (slug: string) => {
        setSelectedSource(slug);
        navigateToSource(slug);
        setOpen(false);
    };

    const handleClear = () => {
        setSelectedSource("");
        router.push("/");
    };

    const navigateToSource = (slug: string) => {
        if (slug) {
            router.push(`/news-sources/${slug}`, { scroll: false });
        }
    };

    const selectedSourceData = nepaliSources.find(
        (source) => source.slug === selectedSource
    );
    const selectedSourceName =
        selectedSourceData?.name_nepali || "समाचार स्रोत छान्नुहोस्";
    const selectedSourceLogo = selectedSourceData?.logo_url || null;

    return (
        <div className="relative flex w-[250px]">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full bg-white text-gray-800 justify-start text-lg py-5"
                    >
                        {selectedSource && selectedSourceLogo && (
                            <div className="mr-2 flex items-center">
                                <img
                                    src={selectedSourceLogo}
                                    alt={`${selectedSourceName} logo`}
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                />
                            </div>
                        )}
                        {selectedSource
                            ? selectedSourceName
                            : "समाचार स्रोत छान्नुहोस्"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                    <Command
                        filter={(value, search) => {
                            // Allow searching in both Nepali and English
                            const source = nepaliSources.find(
                                (s) => s.slug === value
                            );
                            if (!source) return 0;

                            // Check if search term exists in name_nepali or english_name (if available)
                            const nepaliMatch = source.name_nepali
                                .toLowerCase()
                                .includes(search.toLowerCase());

                            // Check if the source has an english_name property and it matches the search
                            const englishMatch = source.name
                                ? source.name
                                      .toLowerCase()
                                      .includes(search.toLowerCase())
                                : false;

                            // Also check if slug matches (which might contain English text)
                            const slugMatch = source.slug
                                .toLowerCase()
                                .includes(search.toLowerCase());

                            return nepaliMatch || englishMatch || slugMatch
                                ? 1
                                : 0;
                        }}
                    >
                        <CommandInput
                            placeholder="समाचार स्रोत खोज्नुहोस्..."
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>
                                कुनै समाचार स्रोत फेला परेन
                            </CommandEmpty>
                            <CommandGroup>
                                {nepaliSources.map((source) => (
                                    <CommandItem
                                        key={source.slug}
                                        value={source.slug}
                                        onSelect={() =>
                                            handleSourceChange(source.slug)
                                        }
                                        className="text-lg flex items-center"
                                    >
                                        {source.logo_url && (
                                            <div className="mr-2 flex items-center justify-center">
                                                <img
                                                    src={source.logo_url}
                                                    alt={`${source.name_nepali} logo`}
                                                    width={20}
                                                    height={20}
                                                    className="rounded-sm"
                                                />
                                            </div>
                                        )}
                                        {source.name_nepali}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {selectedSource && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-gray-800"
                    onClick={handleClear}
                    type="button"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear selection</span>
                </Button>
            )}
        </div>
    );
}
