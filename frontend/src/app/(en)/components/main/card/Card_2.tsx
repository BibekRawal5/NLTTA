import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

export default function Card_2({ newsDetail }: { newsDetail: FeedItem }) {
    return (
        <Card className="p-6 overflow-hidden rounded-none flex flex-col md:flex-row gap-6 md:h-[280px]">
            {/* Left Section: Image */}
            <div className="relative w-full md:w-1/2 h-60 md:h-full">
                <Link href={`/en/news/${newsDetail.slug}`}>
                    <img
                        src={newsDetail.image_url}
                        alt={newsDetail.title}
                        className="object-cover rounded-lg w-full h-full"
                    />
                </Link>
            </div>

            {/* Right Section: Text Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
                {/* Title */}
                <Link href={`/en/news/${newsDetail.slug}`}>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight hover:text-brand-red line-clamp-3">
                        {newsDetail.title}
                    </h1>
                </Link>

                {/* Source and Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline">{newsDetail.feed?.name}</Badge>
                    <span>
                        {newsDetail.published_at
                            ? timeAgo(newsDetail.published_at)
                            : ""}
                    </span>
                </div>

                {/* Summary/Content */}
                <div
                    className="prose prose-sm max-w-none text-base text-gray-600 line-clamp-3 mb-auto"
                    dangerouslySetInnerHTML={{
                        __html: newsDetail.summary,
                    }}
                />

                {/* Read More - Now aligned to the right */}
                <div className="mt-4 flex justify-end">
                    <Button className="bg-red-100">
                        <Link
                            href={`/en/news/${newsDetail.slug}`}
                            className="text-brand-red text-base inline-flex items-center gap-1"
                        >
                            <span>Read More</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>
    );
}
