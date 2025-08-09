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

    // Format time in English
    const getFormattedTime = () => {
        return currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    // Format date in English
    const getFormattedDate = () => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return `${days[currentTime.getDay()]}, ${currentTime.getDate()} ${
            months[currentTime.getMonth()]
        } ${currentTime.getFullYear()}`;
    };

    return (
        <header className="relative w-full">
            <div className="text-sm md:hidden flex-col items-end text-center py-2">
                <span>{getFormattedDate()}</span>
            </div>
            {/* Main navbar */}
            <div className="header-top md:bg-brand-blue/90 md:text-white md:py-8">
                <div className="main mx-auto flex items-center justify-between">
                    {/* Logo section */}
                    <Link href="/en">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/NotifyNepalLogo.jpg"
                                alt="Notify Nepal Logo"
                                width={40}
                                height={40}
                                className="rounded w-10 h-10 md:w-[60px] md:h-[60px]"
                            />
                            <div className="text-center text-lg font-semibold sm:hidden">
                                Notify Nepal
                            </div>
                            <span className="text-xl md:text-3xl font-bold hidden sm:block">
                                NOTIFY NEPAL
                            </span>
                        </div>
                    </Link>

                    {/* Current Time, Date, and Day */}
                    <div className="text-lg font-medium hidden md:flex flex-col items-end">
                        <span>{getFormattedDate()}</span>
                        <span>{getFormattedTime()}</span>
                    </div>

                    <Button
                        onClick={() => router.push("/")}
                        variant="ghost"
                        size="lg"
                        className="font-medium text-lg md:hidden"
                    >
                        NP
                    </Button>
                </div>

                {/* Mobile category links - Only visible on small screens */}
                <div className="flex justify-center items-center gap-2 mt-4 md:hidden px-4 border-b-3 pb-2">
                    <Menu
                        className="w-5 h-5 mr-2"
                        onClick={() => setOpenSheet(true)}
                    />
                    <div className="flex gap-4 w-full overflow-x-auto scrollbar-hide">
                        {navbar_categories.map((category) => (
                            <Link
                                href={`/en/news-categories/${category.slug}`}
                                key={category.slug}
                            >
                                {category.name}
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
                                    Notify Nepal
                                </span>
                            </Link>
                        )}

                        {/* Search and Source Select */}
                        <div className="hidden md:flex items-center space-x-2 mx-auto">
                            <Suspense
                                fallback={
                                    <div className="p-4">
                                        Loading Search Bar...
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
                                            <Link href="/en">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src="/NotifyNepalLogo.jpg"
                                                        alt="Notify Nepal Logo"
                                                        width={50}
                                                        height={50}
                                                        className="rounded"
                                                    />
                                                    <span className="text-xl md:text-3xl font-bold">
                                                        NOTIFY NEPAL
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
                                    href="/en/news-categories/politics"
                                    className="hover:text-brand-red"
                                >
                                    Politics
                                </Link>
                                <Link
                                    href="/en/news-categories/technology"
                                    className="hover:text-brand-red"
                                >
                                    Technology
                                </Link>
                                <Link
                                    href="/en/news-categories/entertainment"
                                    className="hover:text-brand-red"
                                >
                                    Entertainment
                                </Link>
                                <Link
                                    href="/en/news-categories/opinion"
                                    className="hover:text-brand-red"
                                >
                                    Opinion
                                </Link>
                                <Link
                                    href="/en/news-categories/business"
                                    className="hover:text-brand-red"
                                >
                                    Business
                                </Link>
                                <Link
                                    href="/en/news-categories/sports"
                                    className="hover:text-brand-red"
                                >
                                    Sports
                                </Link>
                                <Link
                                    href="/en/news-categories/health"
                                    className="hover:text-brand-red"
                                >
                                    Health
                                </Link>
                                <Link
                                    href="/en/news-categories/education"
                                    className="hover:text-brand-red"
                                >
                                    Education
                                </Link>
                                <Link
                                    href="/en/news-categories/global"
                                    className="hover:text-brand-red"
                                >
                                    Global
                                </Link>
                            </div>
                        </div>
                        <div>
                            <Button
                                onClick={() => router.push("/")}
                                variant="ghost"
                                size="lg"
                                className="font-medium text-lg nepali-text"
                            >
                                नेपाली
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
