"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsCategories } from "@/data/news_categories";
import Link from "next/link";
import { useState } from "react";

interface NewsCategoriesProps {
    setOpenSheet: (open: boolean) => void;
}

export default function NewsCategories({ setOpenSheet }: NewsCategoriesProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = newsCategories.filter(
        (category: Categories) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.name_nepali
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            {/* Search Input */}
            <Input
                type="text"
                placeholder="श्रेणीहरू खोज्नुहोस्..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white text-gray-800"
            />
            {/* Categories List */}
            <ul className="space-y-2">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((category: Categories) => (
                        <li key={category.slug} className="pb-1">
                            <Link href={`/news-categories/${category.slug}`}>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-left text-lg font-medium text-gray-800 hover:bg-gray-100 hover:cursor-pointer"
                                    onClick={() => setOpenSheet(false)}
                                >
                                    {category.name_nepali}
                                </Button>
                            </Link>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500 text-center">
                        कुनै श्रेणी फेला परेन।
                    </li>
                )}
            </ul>
        </div>
    );
}
