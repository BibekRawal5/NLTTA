"use client";
import { useState, useEffect } from "react";

interface HotlinkImageProps {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    classname?: string;
    fallback?: string;
    onError?: () => void;
}

export default function HotlinkImage({
    src,
    alt = "News Image",
    width = 400,
    height = 192,
    classname,
    fallback,
    onError,
}: HotlinkImageProps) {
    const [isValid, setIsValid] = useState<boolean>(false);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Reset states when src changes
        setIsLoading(true);
        setIsValid(false);

        // Check if src is null or empty
        if (!src) {
            setIsLoading(false);
            setImgSrc(fallback || null);
            return;
        }

        setImgSrc(src);
    }, [src, fallback]);

    const handleImageLoad = () => {
        setIsValid(true);
        setIsLoading(false);
    };

    const handleImageError = () => {
        setIsValid(false);
        setIsLoading(false);

        if (onError) {
            onError();
        }
        // Use fallback if available
        if (fallback) {
            setImgSrc(fallback);
        }
    };

    if (!imgSrc && !fallback) {
        return null;
    }

    return (
        <>
            {isLoading && <div>Loading...</div>}

            <img
                src={imgSrc || ""}
                alt={alt}
                width={width}
                height={height}
                className={classname}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                    display: isValid ? "block" : "none",
                    maxWidth: "100%",
                    height: "auto",
                }}
            />
        </>
    );
}
