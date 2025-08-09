import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

dayjs.extend(relativeTime);

export function timeAgo(date: string | Date): string {
    return dayjs(date).fromNow();
}

export const stripHtmlTags = (html: string): string => {
    if (!html) return "";
    // Create a temporary div element to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    // Return the text content only
    return tempDiv.textContent || tempDiv.innerText || "";
};
