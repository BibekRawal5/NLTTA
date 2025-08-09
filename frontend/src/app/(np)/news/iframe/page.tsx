"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

function NewsIframeContent() {
    const params = useSearchParams();
    const url = params.get("url");
    const decodedUrl = url ? decodeURIComponent(url) : null;
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [loadFailed, setLoadFailed] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Handle redirect to original source
    const handleRedirect = useCallback(() => {
        if (decodedUrl) {
            window.open(decodedUrl, "_blank");
            window.history.back();
        }
    }, [decodedUrl]);

    // effect for iframe load/error detection
    useEffect(() => {
        if (!decodedUrl) return;

        const iframe = iframeRef.current;
        if (!iframe) return;

        const timeoutId = setTimeout(() => {
            if (!iframeLoaded) {
                setLoadFailed(true);
                setTimeout(handleRedirect, 1000);
            }
        }, 3000);

        const handleIframeError = () => {
            setLoadFailed(true);
            setTimeout(handleRedirect, 1000);
        };

        // Check for CORS or X-Frame-Options restrictions
        const checkIframeContent = setTimeout(() => {
            try {
                if (iframe.contentWindow?.document) {
                    // Content accessible, no action needed
                }
            } catch {
                setLoadFailed(true);
                setTimeout(handleRedirect, 1000);
            }
        }, 1500);

        iframe.addEventListener("error", handleIframeError);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(checkIframeContent);
            iframe.removeEventListener("error", handleIframeError);
        };
    }, [decodedUrl, iframeLoaded, handleRedirect]);

    if (!decodedUrl) {
        return <p className="text-center p-4 text-red-500">अमान्य URL</p>;
    }

    if (loadFailed) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-center p-4">
                    यो सामग्री iframe मा प्रदर्शन गर्न सकिँदैन। मूल स्रोतमा
                    रिडिरेक्ट गर्दै...
                </p>
                <div className="mt-4 w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="w-full h-screen">
            <iframe
                ref={iframeRef}
                src={decodedUrl}
                className="w-full h-full border-none"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                onLoad={() => setIframeLoaded(true)}
                onError={handleRedirect}
            />
        </div>
    );
}

export default function NewsIframePage() {
    return (
        <Suspense
            fallback={<div className="p-4 text-center">लोड हुँदै...</div>}
        >
            <NewsIframeContent />
        </Suspense>
    );
}
