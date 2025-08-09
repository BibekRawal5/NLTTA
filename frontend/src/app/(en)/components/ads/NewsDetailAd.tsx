"use client";

import { useEffect, useRef } from "react";

export default function NewsDetailAd() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;

        // Create intersection observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Video is visible, play it
                        video.play().catch((error) => {
                            console.warn("Video play failed:", error);
                        });
                    } else {
                        // Video is not visible, pause it
                        if (!video.paused) {
                            video.pause();
                        }
                    }
                });
            },
            {
                // Trigger when at least 50% of the video is visible
                threshold: 0.5,
                // Add some margin to trigger slightly before/after the element enters/leaves viewport
                rootMargin: "0px 0px -50px 0px",
            }
        );

        // Start observing the container
        observer.observe(container);

        // Cleanup
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="w-full my-2" ref={containerRef}>
            <div className="flex flex-col lg:flex-row justify-between gap-4 mx-auto">
                {/* Video Section */}
                <div className="w-full lg:w-2/3">
                    <div className="relative w-full aspect-video">
                        <video
                            ref={videoRef}
                            src="/ads/himalaya.mp4"
                            className="absolute inset-0 w-full h-full object-cover"
                            controls
                            playsInline
                        />
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full lg:w-1/3">
                    <a
                        href="https://everestcanvas.com/canvas-prints/landscape"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full"
                    >
                        <div className="relative w-full h-60 md:h-100 lg:h-full min-h-60 bg-gray-100">
                            <img
                                src="/ads/EverestCanvas.png"
                                alt="Everest Canvas - Landscape Canvas Prints"
                                className="absolute inset-0 w-full h-full object-contain object-center"
                                loading="lazy"
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
