import SearchList from "../components/SearchList";

type SearchParams = Promise<{ [key: string]: string }>;

export default async function SearchPage(props: {
    searchParams: SearchParams;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams.q;

    if (!query) {
        return (
            <div className="container mx-auto sm:py-8">
                <h1 className="text-3xl font-bold sm:mb-6">
                    समाचार खोज्नुहोस्
                </h1>
                <p className="text-gray-600 my-4">
                    कृपया समाचार लेखहरू फेला पार्न खोज शब्द प्रविष्ट गर्नुहोस्।
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto md:py-8">
            <h1 className="text-2xl md:text-3xl mb-4 sm:mb-6 text-gray-700">
                "{query}" को लागि खोज परिणामहरू
            </h1>
            <SearchList query={query} />
        </div>
    );
}
