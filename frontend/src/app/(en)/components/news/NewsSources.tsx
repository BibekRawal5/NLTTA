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

    // Filter for English language and active sources only
    const englishSources = newsSources.filter(
        (source) => source.language === "English" && source.is_active
    );

    const currentSlug = pathname.split("/").pop();
    const [selectedSource, setSelectedSource] = useState(
        currentSlug &&
            englishSources.some((source) => source.slug === currentSlug)
            ? currentSlug
            : ""
    );
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const newSlug = pathname.split("/").pop();
        if (
            newSlug &&
            englishSources.some((source) => source.slug === newSlug) &&
            newSlug !== selectedSource
        ) {
            setSelectedSource(newSlug);
        } else if (
            !newSlug ||
            !englishSources.some((source) => source.slug === newSlug)
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
        router.push("/en");
    };

    const navigateToSource = (slug: string) => {
        if (slug) {
            router.push(`/en/news-sources/${slug}`, { scroll: false });
        }
    };

    const selectedSourceData = englishSources.find(
        (source) => source.slug === selectedSource
    );
    const selectedSourceName = selectedSourceData?.name || "Select News Source";
    const selectedSourceLogo = selectedSourceData?.logo_url || null;

    return (
        <div className="relative flex w-[250px]">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-full bg-white text-gray-800 justify-start py-5"
                    >
                        {selectedSource && selectedSourceLogo && (
                            <div className="mr-2 flex items-center">
                                <img
                                    src={selectedSourceLogo}
                                    alt={`${selectedSourceName} logo`}
                                    width={16}
                                    height={16}
                                    className="rounded-sm"
                                />
                            </div>
                        )}
                        {selectedSource
                            ? selectedSourceName
                            : "Select News Source"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                    <Command
                        filter={(value, search) => {
                            const source = englishSources.find(
                                (s) => s.slug === value
                            );
                            if (!source) return 0;

                            const nameMatch = source.name
                                .toLowerCase()
                                .includes(search.toLowerCase());

                            const slugMatch = source.slug
                                .toLowerCase()
                                .includes(search.toLowerCase());

                            return nameMatch || slugMatch ? 1 : 0;
                        }}
                    >
                        <CommandInput
                            placeholder="Search news source..."
                            className="h-9"
                        />
                        <CommandList>
                            <CommandEmpty>No news sources found.</CommandEmpty>
                            <CommandGroup>
                                {englishSources.map((source) => (
                                    <CommandItem
                                        key={source.slug}
                                        value={source.slug}
                                        onSelect={() =>
                                            handleSourceChange(source.slug)
                                        }
                                        className="text-sm flex items-center"
                                    >
                                        {source.logo_url && (
                                            <div className="mr-2 flex items-center justify-center">
                                                <img
                                                    src={source.logo_url}
                                                    alt={`${source.name} logo`}
                                                    width={16}
                                                    height={16}
                                                    className="rounded-sm"
                                                />
                                            </div>
                                        )}
                                        {source.name}
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
