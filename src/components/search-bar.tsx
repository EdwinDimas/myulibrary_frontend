import { useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { useGetAuthorsQuery, useGetGenresQuery } from "../store/endpoints/booksApi";

const SearchBar = ( {setNewFilters}:any ) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [filterSearch, setFilterSearch] = useState("");

    const { data: genres = [], error: genresError, isLoading: genresLoading } = useGetGenresQuery({});
    const { data: authors = [], error: authorsError, isLoading: authorsLoading } = useGetAuthorsQuery({});

    
    
  

    if (genresLoading || authorsLoading) return <p>Loading...</p>
    if (genresError || authorsError) return <p>Error fetching data</p>


    const search = () => {
        const authors = selectedAuthors.map((author:any)=>author.id)
        const genres = selectedGenres.map((genre:any)=>genre.id)
        setNewFilters({name: searchTerm, authors:authors, genres:genres});
    }

    const resetFilters = () => {
        setSelectedAuthors([])
        setSelectedGenres([])
    }

    const toggleFilterAuthor = (filter: any) => {
        setSelectedAuthors((prev: any) =>
            prev.includes(filter) ? prev.filter((f: any) => f !== filter) : [...prev, filter]
        );
    };

    const toggleFilterGenre = (filter: any) => {
        setSelectedGenres((prev: any) =>
            prev.includes(filter) ? prev.filter((f: any) => f !== filter) : [...prev, filter]
        );
    };

    const filteredAuthors = authors.filter((author: any) =>
        author?.name.toLowerCase().includes(filterSearch.toLowerCase())
    );

    const filteredGenres = genres.filter((genre: any) =>
        genre?.name.toLowerCase().includes(filterSearch.toLowerCase())
    );

    return (
        <div className="w-full flex flex-col items-center mb-6">
            {/* Search Input */}
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search for a book..."
                    className="w-full p-3 pl-10 border border-gray-300 rounded-full shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>
            <button
                className="h-10 mt-4 ml-5 bg-blue-900 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded-full"
                onClick={search}
            >
                Search
            </button>

            {/* Filter Button */}
            <div className="flex flex-row">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="mt-3 flex items-center gap-2 text-gray-700 bg-gray-100 px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition"
                >
                    <span>Filter by Author ({selectedAuthors.length})  / Genre ({selectedGenres.length}) </span>
                    <ChevronDown className="w-4 h-4" />
                </button>
                <button
                    className="h-10 mt-4 ml-5 bg-blue-900 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded-full"
                    onClick={resetFilters}
                >
                    Clear filters
                </button>
            </div>


            {/* Filter Dropdown */}
            {showFilters && (
                <div className="mt-2 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                    {/* Search Filters */}
                    <div className="relative mb-3">
                        <input
                            type="text"
                            placeholder="Search authors or genres..."
                            className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            value={filterSearch}
                            onChange={(e) => setFilterSearch(e.target.value)}
                        />
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    </div>

                    {/* Authors List */}
                    <p className="text-sm font-semibold text-gray-600">Authors</p>
                    <div className="max-h-32 overflow-y-auto mb-2 border-b pb-2">
                        {filteredAuthors.length > 0 ? (
                            filteredAuthors.map((author: any) => (
                                <div
                                    key={author.id}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                    onClick={() => toggleFilterAuthor(author)}
                                >
                                    <Check
                                        className={`w-4 h-4 ${selectedAuthors.includes(author) ? "text-blue-500" : "text-gray-300"
                                            }`}
                                    />
                                    <span className="text-sm">{author.name}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 p-2">No authors found</p>
                        )}
                    </div>

                    {/* Genres List */}
                    <p className="text-sm font-semibold text-gray-600 mt-2">Genres</p>
                    <div className="max-h-32 overflow-y-auto">
                        {filteredGenres.length > 0 ? (
                            filteredGenres.map((genre: any) => (
                                <div
                                    key={genre.id}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                    onClick={() => toggleFilterGenre(genre)}
                                >
                                    <Check
                                        className={`w-4 h-4 ${selectedGenres.includes(genre) ? "text-blue-500" : "text-gray-300"
                                            }`}
                                    />
                                    <span className="text-sm">{genre.name}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 p-2">No genres found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
