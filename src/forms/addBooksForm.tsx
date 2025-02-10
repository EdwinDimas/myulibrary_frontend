import React, { useState } from "react";
import { Button, Input, Label, Select, Textarea } from "./ui/formElements";
import { useGetAuthorsQuery, useGetGenresQuery, useRegisterBookMutation } from "../store/endpoints/booksApi";
import ImageUploadButton from "./ui/uploadImages";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";


const AddBooksForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        genre: "",
        author: "",
        description: "",
        publishedYear: "",
        stock: "",
        image: null as File | null
    });

    const { data: authors = [] } = useGetAuthorsQuery({});
    const { data: genres = [] } = useGetGenresQuery({});
    const [registerBook, { isLoading }] = useRegisterBookMutation();
    const MySwal = withReactContent(Swal);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        MySwal.fire({
            title: `¿Are you sure?, You are about register a new book.`,
            showCancelButton: true,
            confirmButtonText: "YES",
        }).then(async (result) => {
            if (result.isConfirmed) {

                const formDataToSend = new FormData();
                formDataToSend.append("name", formData.name);
                formDataToSend.append("genre", formData.genre);
                formDataToSend.append("author", formData.author);
                formDataToSend.append("description", formData.description);
                formDataToSend.append("publishedYear", formData.publishedYear);
                formDataToSend.append("stock", formData.stock);
                if (formData.image) {
                    formDataToSend.append("image", formData.image);
                }
                const result = await registerBook(formDataToSend);

                if (result?.data) {
                    Swal.fire({
                        title: "Info!",
                        text: "The new book can now be requested by all the students!",
                        icon: "success",
                        timer: 3000, // Espera 3 segundos
                        showConfirmButton: false,
                      }).then(() => {
                        navigate("/"); // Cambia "/somepage" por la ruta de destino
                      });
                }
                if (result?.error) Swal.fire("Error!", "Unexpected Error!", "error");
            }
        });


    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />

            <Label>Genre</Label>
            <Select name="genre" value={formData.genre} onChange={handleChange} required>
                <option value="">Select Genre</option>
                {genres.map((g: any) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                ))}
            </Select>

            <Label>Author</Label>
            <Select name="author" value={formData.author} onChange={handleChange} required>
                <option value="">Select Author</option>
                {authors.map((a: any) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                ))}
            </Select>

            <Label>Description</Label>
            <Textarea name="description" value={formData.description} onChange={handleChange} required />

            <Label>Published Year</Label>
            <Input type="number" name="publishedYear" value={formData.publishedYear} onChange={handleChange} min="1000" max="9999" required />

            <Label>Stock</Label>
            <Input type="number" name="stock" value={formData.stock} onChange={handleChange} required />

            <Label>Cover Image</Label>
            <ImageUploadButton onChange={handleFileUpload} required />

            <div className="flex justify-between">
                <span></span>
                <Button type="submit" disabled={isLoading}
                    className="h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 rounded-lg focus:shadow-outline hover:bg-green-800"
                >
                    Register Book</Button>
            </div>
        </form>
    );
};

export default AddBooksForm;
