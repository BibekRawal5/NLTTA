"use client";
import { Filter, Grid, Home, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileFooterNavigation() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        // For other paths, check if pathname matches exactly or is a subpath
        return pathname === path || pathname.startsWith(`${path}/`);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-brand-blue border-t border-gray-200 md:hidden z-50">
            <div className="flex items-center justify-around h-16">
                {/* Home Button */}
                <Link
                    href="/"
                    className="flex flex-col items-center justify-center w-1/4 h-full"
                >
                    <div
                        className={`flex flex-col items-center justify-center ${
                            isActive("/") && pathname === "/"
                                ? "text-cyan-500"
                                : "text-gray-400"
                        }`}
                    >
                        <Home className="w-5 h-5" />
                        <span className="mt-1 text-sm">होम</span>
                    </div>
                </Link>

                {/* News Button */}
                <Link
                    href="/news"
                    className="flex flex-col items-center justify-center w-1/4 h-full"
                >
                    <div
                        className={`flex flex-col items-center justify-center ${
                            isActive("/news")
                                ? "text-cyan-500"
                                : "text-gray-400"
                        }`}
                    >
                        <Newspaper className="w-5 h-5" />
                        <span className="mt-1 text-sm">समाचार</span>
                    </div>
                </Link>

                {/* News Categories Button */}
                <Link
                    href="/news-categories"
                    className="flex flex-col items-center justify-center w-1/4 h-full"
                >
                    <div
                        className={`flex flex-col items-center justify-center ${
                            isActive("/news-categories")
                                ? "text-cyan-500"
                                : "text-gray-400"
                        }`}
                    >
                        <Grid className="w-5 h-5" />
                        <span className="mt-1 text-sm">श्रेणीहरू</span>
                    </div>
                </Link>

                {/* Sources Button */}
                <Link
                    href="/news-sources"
                    className="flex flex-col items-center justify-center w-1/4 h-full"
                >
                    <div
                        className={`flex flex-col items-center justify-center ${
                            isActive("/news-sources")
                                ? "text-cyan-500"
                                : "text-gray-400"
                        }`}
                    >
                        <Filter className="w-5 h-5" />
                        <span className="mt-1 text-sm">स्रोतहरू</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
