import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({ 
            baseUrl: "http://localhost:8000/api/", 
            credentials: 'include',  
        }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        getGenres: builder.query({
            query: () => "books/genres",
        }),
        getAuthors: builder.query({
            query: () => "books/authors",
        }),
        getBooks: builder.query({
            query: () => "books/",
            providesTags: ['Books'],
        }),
        getFilteredBooks: builder.query({
            query: (filters, path = "books/search") => {
                const params = new URLSearchParams();
                if (filters.name) params.append("name", filters.name);
                if (filters.genres) filters.genres.forEach((genre: any) => params.append("genre", genre));
                if (filters.authors) filters.authors.forEach((author: any) => params.append("author", author));

                return `${path}/?${params.toString()}`;
            },
            providesTags: ['Books'],
        }),
        registerBook: builder.mutation<void, FormData>({
            query: (book) => ({
                url: 'books/create/',
                method: 'POST',
                body: book,
            }),
            invalidatesTags: ['Books'],
        }),
        registerUser: builder.mutation<void, FormData>({
            query: (user) => ({
                url: 'users/create/',
                method: 'POST',
                body: user,
            }),
        }),
        newRequest: builder.mutation<void, {book_id:number|string}>({
            query: (book_id) => ({
                url: 'requests/create/',
                method: 'POST',
                body: {book:book_id},
            }),
            invalidatesTags: ['Books'],
        }),


    }),
});

export const { 
    useGetGenresQuery, 
    useGetAuthorsQuery, 
    useGetBooksQuery, 
    useGetFilteredBooksQuery, 
    useRegisterBookMutation,
    useRegisterUserMutation,
    useNewRequestMutation
 } = booksApi;
export default booksApi;