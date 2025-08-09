import React from "react";
import { Metadata } from "next";
import { info } from "@/data/info";

export const metadata: Metadata = {
    title: "Terms of Service – Notify Nepal",
    description:
        "The legal terms and conditions governing your use of Notify Nepal's services.",
};

export default function TermsOfService() {
    return (
        <main className="text-justify bg-white py-6 sm:py-8 md:py-12">
            {/* Header Section */}
            <section className="w-full">
                <div className="mx-auto px-4 sm:px-6">
                    <div className="w-full text-brand-blue space-y-4 sm:space-y-6 max-w-4xl mx-auto text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                            Terms of{" "}
                            <span className="text-brand-red">Service</span>
                        </h1>
                        <p className="text-base sm:text-lg max-w-2xl mx-auto">
                            Please read these terms carefully before using our
                            platform.
                        </p>
                        <p className="text-xs sm:text-sm">
                            Last Updated: April 20, 2025
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-6 sm:py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto px-3 sm:px-5 md:px-8 py-4">
                        <div className="prose max-w-none">
                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4">
                                1. Agreement to Terms
                            </h2>
                            <p className="text-sm sm:text-base">
                                These Terms of Service ("Terms") constitute a
                                legally binding agreement between you ("User,"
                                "you," or "your") and Notify Nepal ("Company,"
                                "we," "us," or "our") governing your access to
                                and use of the Notify Nepal website, services,
                                and applications (collectively, the "Service").
                            </p>
                            <p className="text-sm sm:text-base">
                                By accessing or using our Service, you agree to
                                be bound by these Terms. If you do not agree to
                                these Terms, you may not access or use the
                                Service.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                2. Eligibility
                            </h2>
                            <p className="text-sm sm:text-base">
                                You must be at least 16 years of age to use our
                                Service. By using the Service, you represent and
                                warrant that you meet the eligibility
                                requirement. If you are using the Service on
                                behalf of a company or other entity, you
                                represent that you have the authority to bind
                                that entity to these Terms.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                3. User Accounts
                            </h2>
                            <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">
                                3.1 Account Creation
                            </h3>
                            <p className="text-sm sm:text-base">
                                To access certain features of the Service, such
                                as personalized news alerts or commenting, you
                                may be required to create an account. When
                                creating an account, you must provide accurate,
                                current, and complete information. You are
                                responsible for maintaining the confidentiality
                                of your account credentials and for all
                                activities that occur under your account.
                            </p>

                            <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">
                                3.2 Account Responsibilities
                            </h3>
                            <p className="text-sm sm:text-base">
                                You agree to:
                            </p>
                            <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                                <li>
                                    Create only one account for personal use.
                                </li>
                                <li>Not share your account with others.</li>
                                <li>
                                    Maintain accurate and up-to-date account
                                    information.
                                </li>
                                <li>
                                    Notify us immediately of any unauthorized
                                    use of your account.
                                </li>
                                <li>
                                    Log out from your account at the end of each
                                    session.
                                </li>
                            </ul>
                            <p className="text-sm sm:text-base">
                                We reserve the right to suspend or terminate
                                your account if we believe you have violated
                                these Terms or if your account shows suspicious
                                activity.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                4. Service Usage and Limitations
                            </h2>
                            <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">
                                4.1 Permitted Use
                            </h3>
                            <p className="text-sm sm:text-base">
                                You may use the Service for lawful purposes and
                                in accordance with these Terms. The Service is
                                intended for users to access news articles,
                                submit news tips, provide feedback, and engage
                                with content through comments or newsletters.
                            </p>

                            <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">
                                4.2 Prohibited Activities
                            </h3>
                            <p className="text-sm sm:text-base">
                                You agree not to:
                            </p>
                            <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                                <li>
                                    Use the Service in any way that violates
                                    applicable laws or regulations.
                                </li>
                                <li>Impersonate another person or entity.</li>
                                <li>
                                    Post false, misleading, defamatory, or
                                    harmful content.
                                </li>
                                <li>
                                    Attempt to bypass security measures or
                                    access unauthorized areas of the Service.
                                </li>
                                <li>
                                    Use the Service to transmit viruses,
                                    malware, or other malicious code.
                                </li>
                                <li>
                                    Scrape, crawl, or use automated methods to
                                    access or collect data from the Service
                                    without permission.
                                </li>
                                <li>
                                    Interfere with or disrupt the integrity or
                                    performance of the Service.
                                </li>
                                <li>
                                    Use the Service for commercial purposes
                                    without our prior consent.
                                </li>
                            </ul>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                5. User Content
                            </h2>
                            <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">
                                5.1 Content Ownership
                            </h3>
                            <p className="text-sm sm:text-base">
                                You retain all ownership rights to the content
                                you submit to the Service, including comments,
                                news tips, or feedback ("User Content"). By
                                submitting User Content, you grant us a
                                worldwide, non-exclusive, royalty-free license
                                to use, reproduce, modify, and display your User
                                Content for the purpose of providing and
                                improving the Service.
                            </p>

                            <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">
                                5.2 Content Responsibility
                            </h3>
                            <p className="text-sm sm:text-base">
                                You are solely responsible for your User
                                Content. You represent and warrant that:
                            </p>
                            <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2 text-sm sm:text-base">
                                <li>
                                    You own or have the necessary rights to
                                    share your User Content.
                                </li>
                                <li>
                                    Your User Content is accurate and not
                                    misleading.
                                </li>
                                <li>
                                    Your User Content does not violate these
                                    Terms, applicable laws, or the rights of
                                    others.
                                </li>
                            </ul>
                            <p className="text-sm sm:text-base">
                                We reserve the right to remove any User Content
                                that violates these Terms or that we find
                                objectionable, without prior notice.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                6. Intellectual Property Rights
                            </h2>
                            <p className="text-sm sm:text-base">
                                The Service and its original content (excluding
                                User Content), features, and functionality are
                                owned by Notify Nepal and are protected by
                                international copyright, trademark, patent,
                                trade secret, and other intellectual property
                                laws.
                            </p>
                            <p className="text-sm sm:text-base">
                                You may not copy, modify, distribute, sell, or
                                lease any part of the Service without our prior
                                written consent. You may not reverse engineer or
                                attempt to extract the source code of our
                                software.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                7. Disclaimers and Limitations of Liability
                            </h2>
                            <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">
                                7.1 Disclaimer of Warranties
                            </h3>
                            <p className="text-sm sm:text-base uppercase">
                                The service is provided "as is" and "as
                                available" without warranties of any kind,
                                either express or implied, including but not
                                limited to implied warranties of
                                merchantability, fitness for a particular
                                purpose, and non-infringement.
                            </p>
                            <p className="text-sm sm:text-base uppercase">
                                We do not warrant that the service will be
                                uninterrupted or error-free, that defects will
                                be corrected, or that the service is free of
                                viruses or other harmful components.
                            </p>

                            <h3 className="text-lg sm:text-xl font-semibold mt-3 sm:mt-4">
                                7.2 Limitation of Liability
                            </h3>
                            <p className="text-sm sm:text-base uppercase">
                                To the maximum extent permitted by law, notify
                                nepal and its affiliates, officers, employees,
                                agents, partners, and licensors shall not be
                                liable for any indirect, incidental, special,
                                consequential, or punitive damages, including
                                without limitation, loss of profits, data, use,
                                goodwill, or other intangible losses, resulting
                                from:
                            </p>
                            <ul className="list-disc ml-4 sm:ml-6 space-y-1 sm:space-y-2 text-sm sm:text-base uppercase">
                                <li>
                                    Your access to or use of or inability to
                                    access or use the Service.
                                </li>
                                <li>Any content obtained from the Service.</li>
                                <li>
                                    Unauthorized access, use, or alteration of
                                    your transmissions or content.
                                </li>
                            </ul>
                            <p className="text-sm sm:text-base uppercase">
                                In no event shall our total liability to you for
                                all claims exceed NPR 1,000.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                8. Indemnification
                            </h2>
                            <p className="text-sm sm:text-base">
                                You agree to defend, indemnify, and hold
                                harmless Notify Nepal and its affiliates,
                                officers, directors, employees, and agents from
                                and against any claims, liabilities, damages,
                                judgments, awards, losses, costs, expenses, or
                                fees (including reasonable attorneys' fees)
                                arising out of or relating to your violation of
                                these Terms or your use of the Service.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                9. Governing Law and Dispute Resolution
                            </h2>
                            <p className="text-sm sm:text-base">
                                These Terms shall be governed by and construed
                                in accordance with the laws of Nepal, without
                                regard to its conflict of law provisions.
                            </p>
                            <p className="text-sm sm:text-base">
                                Any dispute arising from or relating to these
                                Terms or the Service shall first be attempted to
                                be resolved through good-faith negotiations. If
                                such negotiations are unsuccessful, the dispute
                                shall be submitted to the exclusive jurisdiction
                                of the courts in Kathmandu, Nepal.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                10. Modifications to Terms
                            </h2>
                            <p className="text-sm sm:text-base">
                                We reserve the right to modify these Terms at
                                any time. We will provide notice of significant
                                changes by posting the updated Terms on this
                                page and updating the "Last Updated" date. Your
                                continued use of the Service after any such
                                changes constitutes your acceptance of the new
                                Terms.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                11. Termination
                            </h2>
                            <p className="text-sm sm:text-base">
                                We may terminate or suspend your account and
                                access to the Service immediately, without prior
                                notice or liability, for any reason, including
                                but not limited to a breach of these Terms.
                            </p>
                            <p className="text-sm sm:text-base">
                                Upon termination, your right to use the Service
                                will immediately cease. If you wish to terminate
                                your account, you may discontinue using the
                                Service or delete your account through the
                                account settings.
                            </p>

                            <h2 className="text-xl sm:text-2xl font-bold text-brand-blue mb-3 sm:mb-4 mt-6 sm:mt-8">
                                12. Contact Information
                            </h2>
                            <p className="text-sm sm:text-base">
                                If you have any questions about these Terms,
                                please contact us at:
                            </p>
                            <div className="my-3 sm:my-4 pl-3 sm:pl-6">
                                <p className="font-semibold text-sm sm:text-base">
                                    Email: {info.contactEmail}
                                </p>
                                {/* <p className="font-semibold text-sm sm:text-base">
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
