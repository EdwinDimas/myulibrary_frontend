import { useState } from "react";
import BookList from "../components/book-list"
import SearchBar from "../components/search-bar"
import { useGetFilteredBooksQuery } from "../store/endpoints/booksApi";

const Homepage = () => {

    const [filters, setFilters] = useState<any>({});
    const { data: books = [], error, isLoading  } = useGetFilteredBooksQuery(filters);

    const setNewFilters = (newFilters:any) => {
        return setFilters(newFilters);  // Usamos setState de manera correcta
    };

    return (
        <div className="flex flex-col">
            <div>
                <SearchBar setNewFilters={setNewFilters} />
            </div>
            <div>
                <BookList  books={books} error={error} isLoading={isLoading}  />
            </div>
        </div>
    )
}

export default Homepage