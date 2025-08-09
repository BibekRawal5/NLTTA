import { newsCategories } from "@/data/news_categories";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "News Categories - Browse All News Topics",
    description:
        "Explore all news categories and topics. Find the latest updates in politics, business, sports, entertainment, technology, health and more.",
};

export default function NewsCategoriesPage() {
    return (
        <div className="container mx-auto px-4 py-4 sm:py-8 pb-24">
            <div className="flex items-center mb-4">
                <Link href={"/en"} className="mr-2 md:hidden">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold">
                    News Categories
                </h1>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <ul className="divide-y divide-gray-200">
                    {newsCategories.map((category) => (
                        <li key={category.slug}>
                            <Link
                                href={`/en/news-categories/${category.slug}`}
                                className="flex items-center justify-between p-4 hover:bg-gray-50"
                            >
                                <span className="font-medium">
                                    {category.name}
                                </span>
                                <span className="text-gray-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
