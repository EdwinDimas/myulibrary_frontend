import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setBooks } from "../slices/bookSlice";

export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
    endpoints: (builder) => ({
        getGenres: builder.query({
            query: () => "books/genres",
        }),
        getAuthors: builder.query({
            query: () => "books/authors",
        }),
        getBooks: builder.query({
            query: () => "books/",
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setBooks(data)); // Actualiza el store con los libros obtenidos
                } catch (error) {
                    console.error("Error al obtener los libros:", error);
                }
            },
        }),
        getFilteredBooks: builder.query({
            query: (filters, path = "books/search") => {
                const params = new URLSearchParams();
                if (filters.name) params.append("name", filters.name);
                if (filters.genres) filters.genres.forEach((genre: any) => params.append("genre", genre));
                if (filters.authors) filters.authors.forEach((author: any) => params.append("author", author));

                return `${path}/?${params.toString()}`;
            },
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled; // data returned from the query
                    dispatch(setBooks(data)); // Dispatch action to update Redux store with the fetched data
                } catch (error) {
                    console.error("Error fetching filtered books:", error);
                }
            },
        }),
    }),
});

export const { useGetGenresQuery, useGetAuthorsQuery, useGetBooksQuery, useGetFilteredBooksQuery } = booksApi;
export default booksApi;