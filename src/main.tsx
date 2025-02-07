import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router"; 
import Homepage from './pages/homepage'
import AddUsers from './pages/add-users';
import BookRequest from './pages/book-request';
import AddBooks from './pages/add-books';
import NotFound from './pages/404-not-found';
import NavBar from './components/navbar';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element={<NavBar/>}>
        <Route path="/" element={<Homepage />} />
        <Route path="/book-request" element={<BookRequest />} />
        <Route path="/add-users" element={<AddUsers />} />
        <Route path="/add-books" element={<AddBooks />} />
      </Route>
      <Route path="/404-not-found" element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
