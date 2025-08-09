import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { newsSources } from "@/data/news_source";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "समाचार स्रोतहरू - शीर्ष प्रकाशकहरूबाट नवीनतम शीर्षकहरू",
    description:
        "प्रमुख राष्ट्रिय र अन्तर्राष्ट्रिय स्रोतहरूबाट समाचार ब्राउज गर्नुहोस्। विश्वसनीय प्रकाशकहरूबाट नवीनतम कथाहरूको साथमा अपडेट रहनुहोस्।",
};

export default function NewsSourcesPage() {
    const sources = newsSources.filter((source) => source.is_active);

    return (
        <div className="container mx-auto px-4 py-4 sm:py-8 pb-24">
            <div className="flex items-center mb-6">
                <Link href={"/"} className="mr-2 md:hidden">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold">
                    समाचार स्रोतहरू
                </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {sources.map((source) => (
                    <Link
                        key={source.slug}
                        href={`${source.detail_url}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="p-4">
                            <div className="h-16 flex items-center justify-center mb-3">
                                {source.logo_url ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={source.logo_url}
                                            alt={source.name}
                                            className="rounded-md object-contain w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-md">
                                        <span className="text-gray-500 font-medium">
                                            {source.name_nepali}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <h3 className="font-medium text-center">
                                {source.name_nepali}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
