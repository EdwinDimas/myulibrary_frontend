import React, { useState } from "react";
import { Button, Input, Label} from "./ui/formElements";

import { EmailFormField } from "./ui/emailFormField";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "../store/endpoints/authApi";
import { useNavigate } from "react-router";



const LoginForm = () => {
    const [formData, setFormData] = useState({
        password: "",
        email: "",
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [LoginUser, { isLoading }] = useLoginMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("password", formData.password);
        formDataToSend.append("email", formData.email);

        await LoginUser(formDataToSend);
        
        navigate('/');

    };

    return (
        <>
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
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

            <div className="flex justify-between">
                <span></span>
                <Button type="submit" disabled={isLoading}
                    className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
                >
                    Login</Button>
            </div>
        </form>
        </>
    );
};

export default LoginForm;
