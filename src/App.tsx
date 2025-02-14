import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import NavBar from './components/navbar'
import NotFound from './pages/404-not-found'
import AddBooks from './pages/add-books'
import AddUsers from './pages/add-users'
import BookRequest from './pages/book-request'
import Homepage from './pages/homepage'
import Login from './pages/login'

import ProtectedLayout from './components/protected-layout'
import Logout from './pages/logout'

function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/book-request" element={<BookRequest />} />
            <Route path="/add-users" element={<AddUsers />} />
            <Route path="/add-books" element={<AddBooks />} />
          </Route>
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
