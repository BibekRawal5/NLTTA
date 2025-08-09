import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { info } from "@/data/info";
import { Clock, Mail, Phone } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import ContactUsForm from "./ContactForm";

export const metadata: Metadata = {
    title: "Contact Us – Notify Nepal",
    description:
        "Have questions or news tips? Reach out to Notify Nepal’s team today!",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold sm:text-5xl">
                        Contact Us
                    </h1>
                    <p className="mt-3 text-lg text-gray-700 max-w-2xl mx-auto">
                        Have questions, news tips, or feedback? Our team at
                        Notify Nepal is here to assist you. Reach out today!
                    </p>
                </div>

                {/* Main Content: Two Columns */}
                <div className="flex flex-col md:flex-row justify-center gap-8">
                    {/* Contact Information Section */}
                    <div className="bg-gray-200 p-6 w-full rounded-2xl md:w-1/2">
                        <div className="space-y-8">
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">
                                    Contact Information
                                </h2>
                                <div className="space-y-4">
                                    {/* <div className="flex items-center">
                                        <Phone className="h-5 w-5 text-brand-blue/90 mr-2" />
                                        <a
                                            href={info.phoneLink}
                                            className="hover:text-brand-blue/90"
                                        >
                                            {info.phone}
                                        </a>
                                    </div> */}
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 text-brand-blue/90 mr-2" />
                                        <a
                                            href={info.contactEmailLink}
                                            className="hover:text-brand-blue/90"
                                        >
                                            {info.contactEmail}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Support Hours */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">
                                    Support Hours
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-brand-blue/90 mr-2" />
                                        <p>24/7 via email</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-brand-blue/90 mr-2" />
                                        <p>Phone: Sun-Fri, 9 AM - 5 PM NPT</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div>
                                <h2 className="text-2xl font-semibold mb-4">
                                    Follow Us
                                </h2>
                                <div className="flex space-x-4">
                                    <Link
                                        href={info.socialMedia.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-brand-blue/90"
                                    >
                                        <FaFacebook className="h-6 w-6" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <Card className="w-full md:w-1/2">
                        <CardHeader>
                            <CardTitle>Send Us a Message</CardTitle>
                            <CardDescription className="text-gray-500">
                                Share your news tips, questions, or feedback.
                                We’ll respond within 24 hours.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ContactUsForm />
                        </CardContent>
                    </Card>
                </div>

                {/* Footer Quote */}
                <div className="text-center">
                    <p className="text-gray-500 italic text-sm">
                        “Delivering the news that matters to you, when it
                        matters most.”
                    </p>
                </div>
            </div>
        </div>
    );
}
