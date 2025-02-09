import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [], // Aquí almacenamos los libros, ya sea los filtrados o todos los libros
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload; // Reemplaza los libros en el estado
    },
  },
});

export const { setBooks } = booksSlice.actions; // Acción para actualizar los libros
export default booksSlice.reducer;