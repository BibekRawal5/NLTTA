import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center mt-20 gap-4 min-h-screen">
            <Loader2 className="h-12 w-12 animate-spin text-brand-blue/70" />
            <p className="text-lg font-medium text-gray-700">लोड हुँदै...</p>
        </div>
    );
}
