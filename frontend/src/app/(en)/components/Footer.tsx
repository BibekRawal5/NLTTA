import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { info } from "@/data/info";
import { newsCategories } from "@/data/news_categories";
import Link from "next/link";
import { FaEnvelope, FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-brand-blue-dark-1 text-gray-300 px-4 lg:px-0 mt-4">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-9">
                    {/* About Section */}
                    <div className="space-y-4 lg:col-span-2">
                        <div className="flex items-center space-x-3">
                            <img
                                src="/NotifyNepalLogo.jpg"
                                alt="Notify Nepal Logo"
                                width={40}
                                height={40}
                                className="rounded"
                            />
                            <span className="text-xl font-bold text-white">
                                NOTIFY NEPAL
                            </span>
                        </div>
                        <p className="text-sm">
                            Notify Nepal brings you the latest breaking news,
                            in-depth reporting, and analysis on events happening
                            in Nepal and around the world.
                        </p>
                        <div className="text-sm space-y-2">
                            <p className="flex items-center space-x-2">
                                <FaEnvelope className="h-4 w-4 text-gray-400" />
                                <Link
                                    href={info.contactEmailLink}
                                    className="hover:text-brand-red"
                                >
                                    {info.contactEmail}
                                </Link>
                            </p>
                            {/* <p className="flex items-center space-x-2">
                                <FaPhone className="h-4 w-4 text-gray-400" />
                                <Link
                                    href={info.phoneLink}
                                    className="hover:text-brand-red"
                                >
                                    {info.phone}
                                </Link>
                            </p> */}
                        </div>
                        <div className="flex space-x-4 pt-2">
                            <Link
                                target="_blank"
                                href={info.socialMedia.facebook}
                            >
                                <FaFacebook className="h-6 w-6 hover:text-blue-400" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-brand-red text-sm"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/en/news-sources"
                                    className="hover:text-brand-red text-sm"
                                >
                                    News Sources
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-brand-red text-sm"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-brand-red text-sm"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="hover:text-brand-red text-sm"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="hover:text-brand-red text-sm"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* News Categories */}
                    <div className="lg:col-span-3">
                        <h3 className="text-lg sm:text-center font-semibold text-white mb-4">
                            Categories
                        </h3>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {newsCategories.map((category: Categories) => (
                                <Link
                                    key={category.slug}
                                    href={`/en/news-categories/${category.slug}`}
                                    className="hover:text-brand-red text-sm"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="space-y-4 lg:col-span-2">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Subscribe
                        </h3>
                        <p className="text-sm mb-4">
                            Stay updated with our latest news. Subscribe to our
                            newsletter.
                        </p>
                        <form className="space-y-4">
                            <Input
                                type="email"
                                placeholder="Your Email"
                                className="w-full bg-gray-700 text-white border-gray-600 focus:border-brand-red focus:ring-brand-red text-sm"
                                required
                            />
                            <Button
                                type="submit"
                                className="w-full bg-brand-red hover:bg-red-700 text-white transition duration-200"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="bg-brand-blue-dark-2 py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="text-sm text-gray-400 text-center sm:text-left">
                        © {new Date().getFullYear()} Notify Nepal. All rights
                        reserved.
                    </div>
                    <div className="text-sm text-gray-400 text-center sm:text-right">
                        Developed by:{" "}
                        <Link
                            href="https://lipipoint.com/"
                            target="_blank"
                            className="text-brand-red hover:underline"
                        >
                            Lipi Point
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
