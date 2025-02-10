import React, { useState } from "react";
import { Button, Input, Label, Select } from "./ui/formElements";
import { useRegisterUserMutation } from "../store/endpoints/booksApi";
import { EmailFormField } from "./ui/emailFormField";
import { Eye, EyeOff } from "lucide-react";



const AddUsersForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        role: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("role", formData.role);

        await registerUser(formDataToSend);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
            <Label>First name</Label>
            <Input name="firstName" value={formData.firstName} onChange={handleChange} required />

            <Label>Last name</Label>
            <Input name="lastName" value={formData.lastName} onChange={handleChange} required />

            <Label>Email</Label>
            <EmailFormField name="email" value={formData.email} onChange={handleChange} required />

            <Label>Password</Label>
            <Input name="password" type={showPassword ? "text": "password"} value={formData.password} onChange={handleChange} required />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className=" top-1/2  transform -translate-y-8 translate-x-135"
            >
                {showPassword ? <EyeOff /> : <Eye />}
            </button>

            <Label>Role</Label>
            <Select name="role" value={formData.role} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option key={1} value={1}>Librarian</option>
                <option key={2} value={2}>Student</option>
            </Select>

            <div className="flex justify-between">
                <span></span>
                <Button type="submit" disabled={isLoading}
                    className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
                >
                    Register User</Button>
            </div>
        </form>
    );
};

export default AddUsersForm;
