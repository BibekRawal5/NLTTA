import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import HotlinkImage from "./HotLinkImage";
import { HotLinkFeedSlugList } from "@/data/constants";

export default function SearchItemCard({
    newsDetail,
}: {
    newsDetail: FeedItem;
}) {
    console.log(newsDetail)
    const [imageLoaded, setImageLoaded] = useState(true);

    const handleImageError = () => {
        setImageLoaded(false);
    };

    return (
        <Card className="overflow-hidden rounded-lg flex flex-col md:flex-row md:h-40 p-0">
            {/* Top/Left Section: Image - Only show if image is loaded */}
            {imageLoaded && (
                <div className="relative h-48 md:h-40 md:w-60 flex-shrink-0">
                    <Link href={`/news/${newsDetail.slug}`} className="h-full">
                        {HotLinkFeedSlugList.includes(newsDetail.feed.slug) ? (
                            <HotlinkImage
                                src={newsDetail.image_url}
                                alt={newsDetail.title}
                                classname="object-cover w-full h-full"
                                onError={handleImageError}
                            />
                        ) : (
                            <img
                                src={newsDetail.image_url}
                                alt={newsDetail.title}
                                className="object-cover w-full h-full"
                                loading="lazy"
                                onError={handleImageError}
                            />
                        )}
                    </Link>
                </div>
            )}

            {/* Bottom/Right Section: Text Content - Full width when no image */}
            <div
                className={`flex flex-col justify-between p-4 flex-1 overflow-hidden ${
                    !imageLoaded ? "w-full" : "md:py-3 md:pr-4 md:pl-0"
                }`}
            >
                {/* Title */}
                <div>
                    <Link href={`/news/${newsDetail.slug}`}>
                        <h1 className="text-xl md:text-2xl font-semibold leading-tight hover:text-brand-red line-clamp-2">
                            {newsDetail.title}
                        </h1>
                    </Link>

                    {/* Source and Date */}
                    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mt-2">
                        <Badge variant="outline" className="text-xs">
                            {newsDetail.feed?.name_nepali}
                        </Badge>
                        <span>
                            {new Date(newsDetail.published_at).toLocaleString(
                                "ne-NP",
                                { dateStyle: "medium" }
                            )}
                        </span>
                    </div>

                    {/* Summary/Content */}
                    <div
                        className="prose prose-sm max-w-none text-sm text-gray-600 line-clamp-2 mt-2 text-justify"
                        dangerouslySetInnerHTML={{
                            __html: newsDetail.summary,
                        }}
                    />
                </div>
            </div>
        </Card>
    );
}
