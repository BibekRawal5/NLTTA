"use client";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { navbar_categories } from "@/data/news_categories";
import { Menu } from "lucide-react";
import NepaliDate from "nepali-date-converter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import NewsFilters from "./news/NewsFilter";
import NewsSources from "./news/NewsSources";
import SearchBar from "./SearchBar";

export default function Navbar() {
    const [isSticky, setIsSticky] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const router = useRouter();
    const [openSheet, setOpenSheet] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector(".header-top") as HTMLElement;
            if (header) {
                const headerHeight = header.offsetHeight;
                if (window.scrollY > headerHeight) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // Convert to Nepali digits
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

    // Format time in Nepali
    const getFormattedTime = () => {
        const hours = currentTime.getHours().toString().padStart(2, "0");
        const minutes = currentTime.getMinutes().toString().padStart(2, "0");
        const seconds = currentTime.getSeconds().toString().padStart(2, "0");
        return convertToNepaliDigits(`${hours}:${minutes}:${seconds}`);
    };

    // Format date in Nepali
    const getFormattedDate = () => {
        try {
            const nepaliDate = new NepaliDate(currentTime);
            return nepaliDate.format("ddd, DD MMMM YYYY", "np");
        } catch (error) {
            console.error("Error converting date:", error);
            return "—";
        }
    };

    return (
        <header className="relative w-full text-xl">
            <div className="text-base md:hidden flex-col items-end text-center py-2">
                <span>{getFormattedDate()}</span>
            </div>
            {/* Main navbar */}
            <div className="header-top md:bg-brand-blue/90 md:text-white md:py-8">
                <div className="main mx-auto flex items-center justify-between">
                    {/* Logo section */}
                    <Link href="/">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/NotifyNepalLogo.jpg"
                                alt="Notify Nepal Logo"
                                width={40}
                                height={40}
                                className="rounded w-10 h-10 md:w-[60px] md:h-[60px]"
                            />
                            <div className="text-center font-semibold sm:hidden">
                                नोटिफाई नेपाल
                            </div>
                            <span className="text-xl md:text-3xl font-bold hidden sm:block">
                                नोटिफाई नेपाल
                            </span>
                        </div>
                    </Link>

                    {/* Current Time, Date, and Day */}
                    <div className="font-medium hidden md:flex flex-col items-end">
                        <span>{getFormattedDate()}</span>
                        <span>{getFormattedTime()}</span>
                    </div>

                    <Button
                        onClick={() => router.push("/en")}
                        variant="ghost"
                        size="lg"
                        className="font-medium text-lg md:hidden"
                    >
                        EN
                    </Button>
                </div>

                {/* Mobile category links - Only visible on small screens */}
                <div className="flex justify-center items-center mt-4 md:hidden px-4 border-b-3 pb-2">
                    <Menu
                        className="w-5 h-5 mr-4"
                        onClick={() => setOpenSheet(true)}
                    />
                    <div className="flex gap-4 w-full overflow-x-auto scrollbar-hide">
                        {navbar_categories.map((category) => (
                            <Link
                                href={`/news-categories/${category.slug}`}
                                key={category.slug}
                            >
                                {category.name_nepali}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Navbar Section */}
            <div
                className={`bg-gray-100 shadow-md transition-all duration-300 ease-in-out hidden md:block ${
                    isSticky
                        ? "fixed top-0 left-0 right-0 z-50 shadow-md transform-none w-full"
                        : ""
                }`}
            >
                {/*Logo, Search and Source Select Component */}
                <div className="w-full px-4 xl:px-0">
                    <div className="flex items-center justify-between main mx-auto mt-4">
                        {/* Logo linked to homepage */}
                        {isSticky && (
                            <Link href="/" className="flex items-center gap-2">
                                <img
                                    src="/NotifyNepalLogo.jpg"
                                    alt="Notify Nepal Logo"
                                    width={32}
                                    height={32}
                                    className="rounded"
                                />
                                <span className="font-semibold text-xl hidden md:inline">
                                    नोटिफाई नेपाल
                                </span>
                            </Link>
                        )}

                        {/* Search and Source Select */}
                        <div className="hidden md:flex items-center space-x-2 mx-auto">
                            <Suspense
                                fallback={
                                    <div className="p-4">
                                        Loading search bar...
                                    </div>
                                }
                            >
                                <SearchBar />
                            </Suspense>
                            <NewsSources />
                        </div>
                    </div>
                </div>

                {/* Navigation links */}
                <div className="main mx-auto">
                    <nav className="flex justify-between items-center px-4 xl:px-0 py-2 text-gray-700">
                        <div className="flex items-center gap-8">
                            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                                <SheetTrigger>
                                    <Menu className="size-5 md:size-6" />
                                </SheetTrigger>
                                <SheetContent
                                    side="left"
                                    className="overflow-y-auto"
                                >
                                    <SheetHeader>
                                        <SheetTitle>
                                            <Link href="/">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="/NotifyNepalLogo.jpg"
                                                        alt="Notify Nepal Logo"
                                                        width={50}
                                                        height={50}
                                                        className="rounded"
                                                    />
                                                    <span className="text-xl md:text-3xl font-bold">
                                                        नोटिफाई नेपाल
                                                    </span>
                                                </div>
                                            </Link>
                                        </SheetTitle>
                                        <Suspense
                                            fallback={
                                                <div className="p-4">
                                                    Loading filters...
                                                </div>
                                            }
                                        >
                                            <NewsFilters
                                                setOpenSheet={setOpenSheet}
                                            />
                                        </Suspense>
                                    </SheetHeader>
                                </SheetContent>
                            </Sheet>
                            {/* News-Categories */}
                            <div className="flex items-center gap-8">
                                <Link
                                    href="/news-categories/politics"
                                    className="hover:text-brand-red"
                                >
                                    राजनीति
                                </Link>
                                <Link
                                    href="/news-categories/technology"
                                    className="hover:text-brand-red"
                                >
                                    प्रविधि
                                </Link>
                                <Link
                                    href="/news-categories/entertainment"
                                    className="hover:text-brand-red"
                                >
                                    मनोरञ्जन
                                </Link>
                                <Link
                                    href="/news-categories/opinion"
                                    className="hover:text-brand-red"
                                >
                                    विचार
                                </Link>
                                <Link
                                    href="/news-categories/business"
                                    className="hover:text-brand-red"
                                >
                                    व्यापार
                                </Link>
                                <Link
                                    href="/news-categories/sports"
                                    className="hover:text-brand-red"
                                >
                                    खेलकुद
                                </Link>
                                <Link
                                    href="/news-categories/health"
                                    className="hover:text-brand-red"
                                >
                                    स्वास्थ्य
                                </Link>
                                <Link
                                    href="/news-categories/education"
                                    className="hover:text-brand-red"
                                >
                                    शिक्षा
                                </Link>
                                <Link
                                    href="/news-categories/global"
                                    className="hover:text-brand-red"
                                >
                                    अन्तर्राष्ट्रिय
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Button
                                onClick={() => router.push("/en")}
                                variant="ghost"
                                size="lg"
                                className="font-medium text-lg"
                            >
                                English
                            </Button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Spacer div to prevent content jump when nav becomes sticky */}
            {isSticky && <div className="h-30 hidden md:block"></div>}
        </header>
    );
}
