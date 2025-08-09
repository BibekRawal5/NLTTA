"use client";
import { HotLinkFeedSlugList } from "@/data/constants";
import { timeAgo } from "@/lib/utils";
import { useRouter } from "next/navigation";
import HotlinkImage from "../../HotLinkImage";

type TrendingNewsCardProps = {
    news: NewsFeedItem;
};

export default function TrendingNewsCard({ news }: TrendingNewsCardProps) {
    const router = useRouter();

    return (
        <div
            className="border-b-1 p-2 cursor-pointer hover:shadow-sm transition-shadow bg-white"
            onClick={() => router.push(`/news/${news.slug}`)}
        >
            <div className="flex gap-2 items-center">
                <div className="flex-1">
                    <span className="text-brand-blue/70 text-xs font-semibold uppercase">
                        {news.category?.name_nepali || "वर्गीकृत नगरिएको"}
                    </span>
                    <h2 className="text-gray-900 text-lg leading-7 mt-1 line-clamp-3 tracking-wider">
                        {news.title}
                    </h2>
                </div>
                {HotLinkFeedSlugList.includes(news.feed.slug) ? (
                    <>
                        <HotlinkImage
                            src={news.image_url}
                            alt={news.title}
                            classname="object-cover w-25 h-20"
                        />
                    </>
                ) : (
                    <div className="relative w-25">
                        <img
                            src={news.image_url}
                            alt={news.title}
                            className="object-cover w-full h-20"
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
            <div className="flex gap-1 text-xs text-muted-foreground">
                <span>{news.feed.name_nepali}</span>
                <span className="font-bold">·</span>
                <span>{timeAgo(news.published_at)}</span>
            </div>
        </div>
    );
}
