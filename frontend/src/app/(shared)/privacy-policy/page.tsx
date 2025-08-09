import React from "react";
import { Metadata } from "next";
import { info } from "@/data/info";

export const metadata: Metadata = {
    title: "Privacy Policy – Notify Nepal",
    description:
        "Learn how Notify Nepal collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
    return (
        <main className="bg-white py-6 sm:py-8 md:py-12">
            {/* Header Section */}
            <section className="w-full">
                <div className="mx-auto px-4 sm:px-6">
                    <div className="w-full text-brand-blue space-y-4 sm:space-y-6 max-w-4xl mx-auto text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                            Privacy{" "}
                            <span className="text-brand-red">Policy</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto px-2">
                            Your privacy matters to us. Learn how we collect,
                            use, and protect your personal information.
                        </p>
                        <p className="text-xs sm:text-sm">
                            Last Updated: April 20, 2025
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-6 sm:py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto px-3 sm:px-6 md:px-8 py-2 sm:py-4">
                        <div className="prose max-w-none text-sm sm:text-base">
                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4">
                                1. Introduction
                            </h2>
                            <p className="text-left sm:text-justify">
                                Welcome to Notify Nepal ("we," "our," or "us").
                                We are committed to protecting your privacy and
                                ensuring the security of your personal
                                information. This Privacy Policy explains how we
                                collect, use, disclose, and safeguard your
                                information when you visit our website and use
                                our services.
                            </p>
                            <p className="text-left sm:text-justify">
                                By accessing or using Notify Nepal, you agree to
                                the terms of this Privacy Policy. If you do not
                                agree with our policies and practices, please do
                                not use our services.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                2. Information We Collect
                            </h2>
                            <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">
                                2.1 Personal Information
                            </h3>
                            <p className="text-left sm:text-justify">
                                We may collect the following types of personal
                                information:
                            </p>
                            <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2">
                                <li>
                                    <span className="font-semibold">
                                        Contact Information:
                                    </span>{" "}
                                    Name, email address, and phone number when
                                    you submit a contact form, subscribe to our
                                    newsletter, or provide news tips.
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Account Information:
                                    </span>{" "}
                                    Username, password, and preferences if you
                                    create an account for personalized news
                                    alerts or comments.
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        User Submissions:
                                    </span>{" "}
                                    Feedback, news tips, or comments you provide
                                    through our website or other channels.
                                </li>
                            </ul>

                            <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">
                                2.2 Automatically Collected Information
                            </h3>
                            <p className="text-left sm:text-justify">
                                When you use our website, we may automatically
                                collect certain information, including:
                            </p>
                            <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2">
                                <li>
                                    <span className="font-semibold">
                                        Usage Data:
                                    </span>{" "}
                                    Information about your interactions with our
                                    website, including pages visited, time
                                    spent, and articles read.
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Device Information:
                                    </span>{" "}
                                    Information about your device, including IP
                                    address, browser type, operating system, and
                                    device identifiers.
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        Cookies and Tracking Technologies:
                                    </span>{" "}
                                    We use cookies and similar technologies to
                                    track activity on our website and maintain
                                    certain information.
                                </li>
                            </ul>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                3. How We Use Your Information
                            </h2>
                            <p className="text-left sm:text-justify">
                                We may use the information we collect for the
                                following purposes:
                            </p>
                            <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2">
                                <li>
                                    Provide, operate, and maintain our news
                                    services.
                                </li>
                                <li>
                                    Deliver personalized content, newsletters,
                                    and alerts.
                                </li>
                                <li>
                                    Respond to your inquiries, news tips, or
                                    feedback.
                                </li>
                                <li>
                                    Monitor and analyze usage patterns to
                                    improve user experience.
                                </li>
                                <li>
                                    Send promotional communications, such as new
                                    articles or features.
                                </li>
                                <li>
                                    Protect against, identify, and prevent fraud
                                    or illegal activities.
                                </li>
                                <li>
                                    Comply with legal obligations and protect
                                    our rights.
                                </li>
                            </ul>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                4. Information Sharing and Disclosure
                            </h2>
                            <p className="text-left sm:text-justify">
                                We may share your information in the following
                                situations:
                            </p>
                            <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2">
                                <li>
                                    <span className="font-semibold">
                                        With Service Providers:
                                    </span>{" "}
                                    Third-party vendors who assist with
                                    analytics, email services, or advertising,
                                    under strict confidentiality agreements.
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        For Legal Compliance:
                                    </span>{" "}
                                    When required by law or to protect our
                                    rights, privacy, safety, or property.
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        For Business Transfers:
                                    </span>{" "}
                                    In connection with a merger, sale of company
                                    assets, financing, or acquisition.
                                </li>
                                <li>
                                    <span className="font-semibold">
                                        With Your Consent:
                                    </span>{" "}
                                    With other parties if you provide explicit
                                    consent.
                                </li>
                            </ul>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                5. Data Security
                            </h2>
                            <p className="text-left sm:text-justify">
                                We have implemented appropriate technical and
                                organizational security measures, including
                                encryption and secure servers, to protect your
                                personal information from unauthorized access,
                                use, alteration, or disclosure. However, no
                                method of transmission over the Internet or
                                electronic storage is 100% secure.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                6. Your Data Rights
                            </h2>
                            <p className="text-left sm:text-justify">
                                Depending on your location, you may have the
                                following rights regarding your personal
                                information:
                            </p>
                            <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2">
                                <li>
                                    Access personal information we hold about
                                    you.
                                </li>
                                <li>
                                    Request correction of inaccurate or
                                    incomplete information.
                                </li>
                                <li>
                                    Request deletion of your personal
                                    information.
                                </li>
                                <li>
                                    Withdraw consent for processing your
                                    information.
                                </li>
                                <li>
                                    Object to certain processing activities.
                                </li>
                                <li>Data portability.</li>
                            </ul>
                            <p className="text-left sm:text-justify">
                                To exercise these rights, please contact us at{" "}
                                <a
                                    href={info.contactEmailLink}
                                    className="text-blue-600 hover:underline break-all"
                                >
                                    {info.contactEmail}
                                </a>
                                .
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                7. Cookies Policy
                            </h2>
                            <p className="text-left sm:text-justify">
                                Our website uses cookies and similar tracking
                                technologies to enhance your experience. Cookies
                                help us improve our website, deliver
                                personalized content, and analyze traffic.
                            </p>
                            <p className="text-left sm:text-justify">
                                You can set your browser to refuse cookies or
                                alert you when cookies are being sent. Note that
                                some parts of the site may not function properly
                                if cookies are disabled.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                8. Children's Privacy
                            </h2>
                            <p className="text-left sm:text-justify">
                                Our services are not intended for individuals
                                under the age of 16. We do not knowingly collect
                                personal information from children under 16. If
                                you are a parent or guardian and believe your
                                child has provided us with personal information,
                                please contact us at{" "}
                                <a
                                    href={info.contactEmailLink}
                                    className="text-blue-600 hover:underline break-all"
                                >
                                    {info.contactEmail}
                                </a>{" "}
                                so we can take appropriate action.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                9. Changes to This Privacy Policy
                            </h2>
                            <p className="text-left sm:text-justify">
                                We may update our Privacy Policy from time to
                                time. We will notify you of changes by posting
                                the new Privacy Policy on this page and updating
                                the "Last Updated" date. Please review this
                                Privacy Policy periodically for updates.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                10. Contact Us
                            </h2>
                            <p className="text-left sm:text-justify">
                                If you have any questions or concerns about this
                                Privacy Policy or our data practices, please
                                contact us at:
                            </p>
                            <div className="my-3 sm:my-4 pl-4 sm:pl-6">
                                <p className="font-semibold">
                                    Email:{" "}
                                    <span className="break-all">
                                        {info.contactEmail}
                                    </span>
                                </p>
                                {/* <p className="font-semibold">
                                    Phone: {info.phone}
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
