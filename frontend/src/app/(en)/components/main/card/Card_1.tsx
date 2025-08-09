import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HotLinkFeedSlugList } from "@/data/constants";
import Link from "next/link";
import ContentWithImages from "../../ContentWithImages";
import HotlinkImage from "../../HotLinkImage";

export default function Card_1({ newsDetail }: { newsDetail: FeedItem }) {
    return (
        <div>
            <Card className="p-3 sm:p-4 md:p-6 overflow-hidden rounded-none gap-3 md:gap-5">
                <Link href={`${newsDetail.link}`} target="_blank">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold hover:text-brand-red">
                        {newsDetail.title}
                    </h1>
                </Link>

                {HotLinkFeedSlugList.includes(newsDetail.feed.slug) ? (
                    <>
                        <HotlinkImage
                            src={newsDetail.image_url}
                            alt={newsDetail.title}
                            classname="object-cover w-full h-48 md:my-2"
                        />
                    </>
                ) : (
                    <div className="relative w-full">
                        <img
                            src={newsDetail.image_url}
                            alt={newsDetail.title}
                            className="object-cover"
                            loading="lazy"
                        />
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 bg-gray-50 p-3 rounded-lg transition-all hover:bg-gray-100 hover:shadow-sm">
                    {/* Publication and author info */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 flex items-center justify-center mr-2">
                                <img
                                    src={newsDetail.feed.logo_url || ""}
                                    height={40}
                                    width={40}
                                    alt={newsDetail.feed.name}
                                />
                            </div>
                            <Link
                                href={`/en/news-sources/${newsDetail.feed.slug}`}
                                className="text-black font-medium text-sm sm:text-base hover:text-brand-red transition-colors"
                            >
                                {newsDetail.feed?.name}
                            </Link>
                        </div>

                        {/* Divider dot for visual separation */}
                        <div className="hidden sm:block text-gray-400">•</div>

                        {/* Authors */}
                        {newsDetail.authors &&
                            newsDetail.authors.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <span className="text-xs sm:text-sm text-gray-600">
                                        By
                                    </span>
                                    <span className="text-xs sm:text-sm text-gray-800 font-medium hover:text-brand-red transition-colors">
                                        {newsDetail.authors
                                            .map((author) => author.name)
                                            .join(", ")}
                                    </span>
                                </div>
                            )}

                        {/* Divider dot */}
                        <div className="hidden sm:block text-gray-400">•</div>

                        {/* Publication date */}
                        <div className="text-xs sm:text-sm text-gray-500 group relative">
                            <span className="hover:text-gray-800 transition-colors">
                                {new Date(
                                    newsDetail.published_at
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </span>
                        </div>
                    </div>

                    {/* View counter with animation */}
                    {/* {newsDetail.visit_count > 0 && (
                        <div className="text-gray-500">
                            <span className="text-sm sm:text-base font-medium">
                                {newsDetail.visit_count * 3} views
                            </span>
                        </div>
                    )} */}
                </div>

                {/* <div
                    className="prose prose-sm md:prose max-w-none text-base sm:text-lg md:text-2xl text-gray-600 leading-6 sm:leading-7 md:leading-8"
                    dangerouslySetInnerHTML={{
                        __html: newsDetail.content || newsDetail.summary,
                    }}
                /> */}

                {/* Content section with image handling */}
                <ContentWithImages
                    html={newsDetail.content || newsDetail.summary}
                    className="prose prose-sm md:prose max-w-none text-base sm:text-lg md:text-2xl text-gray-600 tracking-wide md:tracking-wider leading-7 sm:leading-8 md:leading-10"
                />

                <div className="mt-2 md:mt-4">
                    <Button className="bg-red-100">
                        <Link
                            target="_blank"
                            href={`${newsDetail.link}`}
                            className={`text-brand-red text-sm md:text-lg inline-flex items-center gap-1`}
                        >
                            <span>Read More</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4"
                            >
                                <path d="M7 7h10v10" />
                                <path d="M7 17 17 7" />
                            </svg>
                        </Link>
                    </Button>
                </div>
            </Card>
        </div>
    );
}
