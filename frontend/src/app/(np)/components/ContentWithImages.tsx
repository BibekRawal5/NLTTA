"use client";
import { useEffect, useRef } from "react";

interface ContentWithImagesProps {
    html: string;
    className?: string;
}

export default function ContentWithImages({
    html,
    className = "",
}: ContentWithImagesProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Process images in the rendered HTML content
        const handleImagesInContent = () => {
            if (!contentRef.current) return;

            // Find all images in the content
            const images = contentRef.current.querySelectorAll("img");

            // Process each image
            images.forEach((img) => {
                // Keep track of original display style
                const originalDisplay = img.style.display;

                // Handle image load error
                img.onerror = () => {
                    img.style.display = "none"; // Hide the image if it fails to load
                };

                // Set the image back to visible once loaded successfully
                img.onload = () => {
                    img.style.display = originalDisplay;
                };

                // Add additional useful attributes to images
                img.setAttribute("loading", "lazy");

                // If there's no alt text, set an empty one to improve accessibility
                if (!img.hasAttribute("alt")) {
                    img.setAttribute("alt", "");
                }
            });
        };

        handleImagesInContent();
    }, [html]);

    return (
        <div
            ref={contentRef}
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
