import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useNewRequestMutation } from '../store/endpoints/booksApi'

const BookModal = ({ book, isOpen, setIsOpen }: any) => {

    const [newRequest, { isLoading }] = useNewRequestMutation()

    const handleNewRequest = (book: any) => {
        newRequest(book.id)
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-100/0 backdrop-blur-[2px] z-10'>
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="border border-gray-400 w-full max-w-200 h-100 rounded-xl bg-white/50 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium text-black ">
                                {book.name}
                            </DialogTitle>
                            <div className='flex flex-row  w-full h-60'>
                                <div className='w-50'>
                                    <div className="w-full h-60 overflow-hidden">
                                        <img
                                            src={book.url}
                                            alt={book.name}
                                            className="h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className='w-135 mt-10 text-sm/6 text-black/90'>
                                    <p>{book.description}</p>
                                    <br />
                                    <p>Stock: {book.stock}</p>
                                </div>


                            </div>

                            <div className="mt-4">
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-900 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={() => {
                                        setIsOpen(false)
                                        handleNewRequest(book)
                                    }}
                                >
                                    Request Checkout
                                </Button>
                                &nbsp;
                                <Button
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default BookModal