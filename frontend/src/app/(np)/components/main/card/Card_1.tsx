import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HotLinkFeedSlugList } from "@/data/constants";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import NepaliDate from "nepali-date-converter";
import Link from "next/link";
import ContentWithImages from "../../ContentWithImages";
import HotlinkImage from "../../HotLinkImage";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Card_1({ newsDetail }: { newsDetail: FeedItem }) {
    const convertToNepaliDigits = (num: number | string) => {
        const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
        return num
            .toString()
            .split("")
            .map((digit) =>
                isNaN(parseInt(digit)) ? digit : nepaliDigits[parseInt(digit)]
            )
            .join("");
    };

    const nepaliDays = {
        Sunday: "आइतबार",
        Monday: "सोमबार",
        Tuesday: "मङ्गलबार",
        Wednesday: "बुधबार",
        Thursday: "बिहीबार",
        Friday: "शुक्रबार",
        Saturday: "शनिबार",
    };

    const getNepaliFormattedDate = (dateString: string): string => {
        try {
            const date = dayjs(dateString);
            if (!date.isValid()) {
                throw new Error("Invalid date");
            }

            const nptDate = date.tz("Asia/Kathmandu");
            const jsDate = nptDate.toDate();
            const nepaliDate = new NepaliDate(jsDate);

            // Format date without day name
            const partialDate = nepaliDate.format("DD MMMM YYYY", "np");
            // Get English day name and map to Nepali
            const englishDay = nptDate.format("dddd");
            const nepaliDay = nepaliDays[englishDay as keyof typeof nepaliDays];
            const formattedDate = `${nepaliDay}, ${partialDate}`;

            const hours = nptDate.hour();
            const minutes = nptDate.minute();
            const period = hours >= 12 ? "अपराह्न" : "पूर्वाह्न";

            const adjustedHours = hours % 12 || 12;

            const nepaliTime = `${convertToNepaliDigits(
                adjustedHours
            )}:${convertToNepaliDigits(
                minutes.toString().padStart(2, "0")
            )} ${period}`;

            return `${formattedDate}, ${nepaliTime}`;
        } catch (error) {
            console.error("Error converting date:", error);
            return "—";
        }
    };

    return (
        <div>
            <Card className="p-3 sm:p-4 md:p-6 overflow-hidden rounded-none gap-3 md:gap-5">
                <Link href={`${newsDetail.link}`} target="_blank">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 hover:text-brand-red">
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
                            className="object-cover w-full h-full"
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
                                    alt={newsDetail.feed.name_nepali}
                                />
                            </div>
                            <Link
                                href={`/news-sources/${newsDetail.feed.slug}`}
                                className="text-black font-medium text-base sm:text-lg hover:text-brand-red transition-colors"
                            >
                                {newsDetail.feed?.name_nepali}
                            </Link>
                        </div>

                        {/* Divider dot for visual separation */}
                        <div className="hidden sm:block text-gray-400">•</div>

                        {/* Authors */}
                        {newsDetail.authors &&
                            newsDetail.authors.length > 0 && (
                                <div className="flex items-center gap-1">
                                    <span className="text-sm sm:text-base text-gray-600">
                                        By
                                    </span>
                                    <span className="text-sm sm:text-base text-gray-800 font-medium hover:text-brand-red transition-colors">
                                        {newsDetail.authors
                                            .map((author) => author.name)
                                            .join(", ")}
                                    </span>
                                </div>
                            )}

                        {/* Divider dot */}
                        <div className="hidden sm:block text-gray-400">•</div>

                        {/* Publication date */}
                        <div className="text-sm sm:text-base text-gray-500 group relative">
                            <span className="hover:text-gray-800 transition-colors">
                                {getNepaliFormattedDate(
                                    newsDetail.published_at
                                )}
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
                    className="prose prose-sm md:prose max-w-none text-base sm:text-lg md:text-2xl text-gray-600 tracking-wide md:tracking-wider leading-7 sm:leading-8 md:leading-10"
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
                            className={`text-brand-red text-sm md:text-xl inline-flex items-center gap-1`}
                        >
                            <span>थप पढ्नुहोस्</span>
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
