import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { info } from "@/data/info";
import { newsCategories } from "@/data/news_categories";
import Link from "next/link";
import { FaEnvelope, FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-brand-blue-dark-1 text-gray-300 text-base md:text-lg mt-4">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-6 sm:py-8 xl:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-9 gap-6">
                    {/* About Section */}
                    <div className="space-y-4 md:col-span-2">
                        <div className="flex items-center space-x-3">
                            <img
                                src="/NotifyNepalLogo.jpg"
                                alt="नोटिफाई नेपाल लोगो"
                                width={36}
                                height={36}
                                className="rounded sm:w-10 sm:h-10"
                            />
                            <span className="text-lg sm:text-xl font-bold text-white">
                                नोटिफाई नेपाल
                            </span>
                        </div>
                        <p className="text-base">
                            नोटिफाई नेपालले तपाईंलाई नेपाल र विश्वभर भइरहेका
                            घटनाहरूको नवीनतम ताजा समाचार, विस्तृत रिपोर्टिङ र
                            विश्लेषण प्रदान गर्दछ।
                        </p>
                        <div className="space-y-2">
                            <p className="flex items-center space-x-2">
                                <FaEnvelope className="h-4 w-4 text-gray-400" />
                                <Link
                                    href={info.contactEmailLink}
                                    className="hover:text-brand-red text-base"
                                >
                                    {info.contactEmail}
                                </Link>
                            </p>
                            {/* <p className="flex items-center space-x-2">
                                <FaPhone className="h-4 w-4 text-gray-400" />
                                <Link
                                    href={info.phoneLink}
                                    className="hover:text-brand-red text-base"
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
                                <FaFacebook className="h-5 w-5 sm:h-6 sm:w-6 hover:text-blue-400" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-1">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                            छिटो लिङ्कहरू
                        </h3>
                        <ul className="space-y-2 text-base">
                            <li>
                                <Link href="/" className="hover:text-brand-red">
                                    गृहपृष्ठ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/news-sources"
                                    className="hover:text-brand-red"
                                >
                                    समाचार स्रोतहरू
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-brand-red"
                                >
                                    हाम्रो बारेमा
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-brand-red"
                                >
                                    सम्पर्क
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy-policy"
                                    className="hover:text-brand-red"
                                >
                                    गोपनीयता नीति
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms-of-service"
                                    className="hover:text-brand-red"
                                >
                                    सेवाका सर्तहरू
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* News Categories */}
                    <div className="md:col-span-4">
                        <h3 className="text-base sm:text-lg sm:text-center font-semibold text-white mb-3 sm:mb-4">
                            श्रेणीहरू
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-base">
                            {newsCategories.map((category: Categories) => (
                                <Link
                                    key={category.slug}
                                    href={`/news-categories/${category.slug}`}
                                    className="hover:text-brand-red"
                                >
                                    {category.name_nepali}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="space-y-4 md:col-span-2">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                            सदस्यता लिनुहोस्
                        </h3>
                        <p className="text-base mb-3 sm:mb-4">
                            हाम्रो नवीनतम समाचारहरूसँग अपडेट रहनुहोस्। हाम्रो
                            न्युजलेटरको सदस्यता लिनुहोस्।
                        </p>
                        <div className="space-y-3 sm:space-y-4">
                            <Input
                                type="email"
                                placeholder="तपाईंको इमेल"
                                className="w-full bg-gray-700 text-white border-gray-600 focus:border-brand-red focus:ring-brand-red text-base"
                                required
                            />
                            <Button
                                type="button"
                                className="w-full bg-brand-red hover:bg-red-700 text-white transition duration-200 text-base"
                            >
                                सदस्यता लिनुहोस्
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="bg-brand-blue-dark-2 py-4">
                <div className="container mx-auto px-4 xl:px-0 flex flex-col sm:flex-row justify-between items-center text-base">
                    <div className="text-gray-400">
                        © {new Date().getFullYear()} नोटिफाई नेपाल। सर्वाधिकार
                        सुरक्षित।
                    </div>
                    <div className="text-gray-400 mt-2 sm:mt-0">
                        विकासकर्ता:{" "}
                        <Link
                            href="https://lipipoint.com/"
                            target="_blank"
                            className="text-brand-red hover:underline"
                        >
                            लिपि पोइन्ट
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
