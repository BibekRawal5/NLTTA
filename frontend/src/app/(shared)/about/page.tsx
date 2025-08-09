import { info } from "@/data/info";
import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import {
    FaEnvelope,
    FaFacebookF,
    FaHistory,
    FaRegLightbulb,
    FaRegNewspaper,
    FaUsers,
} from "react-icons/fa";

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export const metadata: Metadata = {
    title: "About Us – Notify Nepal",
    description:
        "Learn more about Notify Nepal, your trusted source for curated news, in-depth reporting, and analysis in Nepal and beyond.",
};

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mb-3 sm:mb-0 sm:mr-4">
                    {icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center sm:text-left">
                    {title}
                </h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">{description}</p>
        </div>
    );
};

export default function AboutUsPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b bg-white md:my-12">
                {/* Hero Section */}
                <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-90 z-0">
                        <div className="absolute inset-0 bg-[url('/nepal-map-pattern.jpg')] opacity-10 bg-repeat"></div>
                    </div>

                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center space-y-4 sm:space-y-6">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-blue">
                                About{" "}
                                <span className="text-brand-red">
                                    {info.name}
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-2 text-brand-blue/70">
                                {info.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-8 md:py-12 lg:py-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 md:gap-12 items-center">
                            <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    Our Story
                                </h2>
                                <div className="w-16 h-1 bg-blue-600"></div>
                                <p className="text-base sm:text-lg text-gray-600">
                                    Founded in 2025, Notify Nepal started as a
                                    platform dedicated to curating and sharing
                                    reliable news from trusted news portals
                                    across Nepal and beyond.
                                </p>
                                <p className="text-base sm:text-lg text-gray-600">
                                    We aggregate high-quality reporting,
                                    covering everything from breaking political
                                    developments to cultural events and
                                    international affairs, making it accessible
                                    to our readers in one place.
                                </p>
                                <p className="text-base sm:text-lg text-gray-600">
                                    Today, Notify Nepal is a go-to source for
                                    comprehensive and timely news, ensuring our
                                    audience stays informed with the most
                                    relevant stories from reputable sources.
                                </p>
                            </div>

                            {/* <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-xl order-1 md:order-2">
                                <img
                                    src="/api/placeholder/600/500"
                                    alt="Notify Nepal curated news"
                                    className="object-cover rounded-xl w-full h-full"
                                />
                            </div> */}
                        </div>
                    </div>
                </section>

                {/* Our Mission & Values Section */}
                <section className="py-12 md:py-16 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8 sm:mb-12 md:mb-16">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Our Mission & Values
                            </h2>
                            <div className="w-16 h-1 bg-blue-600 mx-auto mt-3 sm:mt-4 mb-4 sm:mb-6"></div>
                            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
                                At Notify Nepal, we are committed to curating
                                trustworthy news from reputable sources, guided
                                by principles that ensure accessibility and
                                reliability for our readers.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            <FeatureCard
                                icon={
                                    <FaRegNewspaper className="text-blue-600 text-xl" />
                                }
                                title="Integrity"
                                description="We curate news from trusted sources, ensuring every story we share is credible and presented with honesty."
                            />

                            <FeatureCard
                                icon={
                                    <FaRegLightbulb className="text-blue-600 text-xl" />
                                }
                                title="Independence"
                                description="Our platform remains free from biases, focusing on delivering curated news that informs without agenda."
                            />

                            <FeatureCard
                                icon={
                                    <FaUsers className="text-blue-600 text-xl" />
                                }
                                title="Community"
                                description="We aim to empower informed communities by providing easy access to reliable news that fosters positive dialogue."
                            />

                            <FeatureCard
                                icon={
                                    <FaHistory className="text-blue-600 text-xl" />
                                }
                                title="Timeliness"
                                description="We deliver curated news updates promptly, ensuring you stay informed with the latest developments as they happen."
                            />
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-12 md:py-16 bg-blue-900 text-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className="space-y-4 sm:space-y-6">
                                <h2 className="text-2xl sm:text-3xl font-bold">
                                    Get in Touch
                                </h2>
                                <div className="w-16 h-1 bg-yellow-400"></div>
                                <p className="text-base sm:text-lg text-gray-200">
                                    Have feedback or suggestions? Interested in
                                    partnering with us? We'd love to hear from
                                    you.
                                </p>

                                <div className="space-y-4">
                                    {/* <div className="flex items-center">
                                        <FaPhoneAlt className="text-yellow-400 mr-3 sm:mr-4 text-lg sm:text-xl" />
                                        <a
                                            href={info.phoneLink}
                                            className="text-sm sm:text-base hover:text-yellow-400 transition"
                                        >
                                            {info.phone}
                                        </a>
                                    </div> */}

                                    <div className="flex items-center">
                                        <FaEnvelope className="text-yellow-400 mr-3 sm:mr-4 text-lg sm:text-xl" />
                                        <a
                                            href={info.contactEmailLink}
                                            className="text-sm sm:text-base hover:text-yellow-400 transition break-all"
                                        >
                                            {info.contactEmail}
                                        </a>
                                    </div>

                                    <div className="flex items-center">
                                        <FaFacebookF className="text-yellow-400 mr-3 sm:mr-4 text-lg sm:text-xl" />
                                        <a
                                            href={info.socialMedia.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm sm:text-base hover:text-yellow-400 transition"
                                        >
                                            Follow us on Facebook
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-lg text-center">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                                    Send Us a Message
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Visit our dedicated contact page for a
                                    complete contact form and more ways to reach
                                    us with your feedback or partnership
                                    proposals.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-block bg-brand-blue text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 transition duration-300 ease-in-out text-sm sm:text-base"
                                >
                                    Go to Contact Page
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-8 sm:py-12 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Stay Informed with Notify Nepal
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                            Join thousands of readers who rely on us for
                            curated, reliable news from trusted sources.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="bg-brand-blue text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-md transition text-sm sm:text-base"
                            >
                                Subscribe to Our Newsletter
                            </Link>
                            <Link
                                href="/news"
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-md transition mt-3 sm:mt-0 text-sm sm:text-base"
                            >
                                Read Latest News
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
