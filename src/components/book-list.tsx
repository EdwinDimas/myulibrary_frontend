import { useState } from "react"
import BookModal from "./book-modal"

const BookList = ({ books = [], error, isLoading  }:any) => {
    const [showModal, setShowModal] = useState(false)
    const [currentBook, setCurrentBook] = useState<any>({})
    

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>Error fetching data</p>

    return (
        <div>
            {showModal &&
                <BookModal
                    book={currentBook}
                    isOpen={showModal}
                    setIsOpen={setShowModal}
                ></BookModal>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4">
                {books.map((book : any) => (
                    <div
                        key={book.id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-100 hover:scale-110"

                        onClick={() => {
                            setShowModal(true)
                            setCurrentBook(book)
                            
                        }}
                    >
                        <div className="w-full h-60 overflow-hidden">
                            <img
                                src={book.url}
                                alt={book.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{book.name}</h3>
                            <p className="text-gray-600">{book.author.name}</p>
                            <span className="text-sm text-gray-500">{book.genre.name}</span>
                        </div>
                    </div>

                ))}
            </div >
        </div>
    )
}

export default BookList