import React, { Suspense } from "react";
import Masonry from "./Masonry";

export default function page() {
    return (
        <Suspense fallback={<div className="p-4">Loading news...</div>}>
            <Masonry />
        </Suspense>
    );
}
