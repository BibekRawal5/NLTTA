import SearchList from "../../components/SearchList";

type SearchParams = Promise<{ [key: string]: string }>;

export default async function SearchPage(props: {
    searchParams: SearchParams;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams.q;

    if (!query) {
        return (
            <div className="container mx-auto sm:py-8">
                <h1 className="text-3xl font-bold sm:mb-6">Search News</h1>
                <p className="text-gray-600 my-4">
                    Please enter a search term to find news articles.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto md:py-8">
            <h1 className="text-3xl mb-6 text-gray-700">
                Search Results for "{query}"
            </h1>
            <SearchList query={query} />
        </div>
    );
}
