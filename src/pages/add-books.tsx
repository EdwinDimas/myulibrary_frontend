import AddBooksForm from "../forms/addBooksForm"


const AddBooks = () => {
    return (
        <div>
            <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Register New Books</h2>
                <p className="text-gray-600 mb-4">Please fill out the details for this book.</p>
                <div className="space-y-6">
                    <AddBooksForm />
                </div>
            </div>
        </div>
    )
}

export default AddBooks