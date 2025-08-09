"use client";
import { Card } from "@/components/ui/card";
import { HotLinkFeedSlugList } from "@/data/constants";
import { stripHtmlTags, timeAgo } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import HotlinkImage from "../../HotLinkImage";

type Card_3Props = {
    news: FeedItem;
};

export default function Card_3({ news }: Card_3Props) {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <Card className="bg-gray-100 overflow-hidden rounded-none flex flex-row items-center p-0 h-29 gap-4 border-0 border-b-2">
            {/* Left Section: Image - Only show if no error */}
            {!imageError && (
                <div className="relative w-28 h-20 pl-2 flex-shrink-0">
                    {HotLinkFeedSlugList.includes(news.feed.slug) ? (
                        <HotlinkImage
                            src={news.image_url}
                            alt={news.title}
                            classname="object-cover w-full h-20 md:my-2"
                            onError={handleImageError}
                        />
                    ) : (
                        <Link
                            href={`/news/${news.slug}`}
                            className="relative w-full aspect-video"
                        >
                            <img
                                src={news.image_url}
                                alt={news.title}
                                className="object-cover w-full h-full"
                                loading="lazy"
                                onError={handleImageError}
                            />
                        </Link>
                    )}
                </div>
            )}

            {/* Right Section: Text Content - Takes full width when image fails */}
            <div
                className={`flex flex-col justify-between py-2 ${
                    imageError
                        ? "pl-4 w-full space-y-0.5"
                        : "flex-grow space-y-2"
                } `}
            >
                {/* Title */}
                <Link href={`/news/${news.slug}`}>
                    <h1 className="text-lg font-semibold hover:text-brand-red line-clamp-2">
                        {news.title}
                    </h1>
                </Link>

                {imageError && (
                    <p className="line-clamp-1">
                        {stripHtmlTags(news.summary)}
                    </p>
                )}

                {/* Source and Date */}
                <div className="flex flex-col space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                            {news.feed?.name_nepali}
                        </div>
                        <div className="text-sm text-muted-foreground">|</div>
                        <span className="text-muted-foreground text-xs">
                            {timeAgo(news.published_at)}
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
