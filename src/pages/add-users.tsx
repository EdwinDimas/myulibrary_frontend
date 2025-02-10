import AddUsersForm from "../forms/addUsersForm"


const AddUsers = () => {
    return (
        <div>
            <div className="max-w-2xl min-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Register New Users</h2>
                <p className="text-gray-600 mb-4">Please fill the data for new new user.</p>
                <div className="space-y-6">
                    <AddUsersForm />
                </div>
            </div>
        </div>
    )
}

export default AddUsers