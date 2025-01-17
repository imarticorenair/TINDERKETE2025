import React, { useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import Footer from "./Footer";
const ipBack = process.env.REACT_APP_BASE_URL;


function ErabiltzaileaSortu() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        hometown: "",
        telephone: "",
        birth_date: "",
        admin: "",
        img: "",
        aktibatua: "",
    });

    const [userCreated, setUserCreated] = useState(null);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formDataToSend = new FormData();
    
        // Añadir todos los campos al FormData
        formDataToSend.append("name", formData.name);
        formDataToSend.append("surname", formData.surname);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("hometown", formData.hometown);
        formDataToSend.append("telephone", formData.telephone);
        formDataToSend.append("birth_date", formData.birth_date);
        formDataToSend.append("admin", formData.admin ? 1 : 0);
        formDataToSend.append("aktibatua", formData.aktibatua ? 1 : 0);
    
        // Solo añadir el archivo si existe
        if (formData.img) {
            formDataToSend.append("img", formData.img);
        }
        try {
            const response = await axios.post(`${ipBack}/api/userStore`, formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            console.log("Response:", response.data);
            setUserCreated(response.data.data);
            setError("");
        } catch (error) {
            setError(error.response?.data?.message || "Error al enviar los datos a la API");
            console.error("Error:", error.response?.data || error.message);
        }
    };
    

    return (
<div>
    <NavbarAdmin />
    <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600">Erabiltzailea Sortu</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-2 gap-5">
                {/* Izena */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Izena
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Sartu erabiltzailearen izena"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Abizena */}
            <div className="mb-4">
                <label htmlFor="surname" className="block text-gray-700 font-bold mb-2">
                    Abizena
                </label>
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    placeholder="Sartu erabiltzailearen abizena"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            </div>
            
            <div className="grid grid-cols-2 gap-5">
                {/* Email */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Sartu erabiltzailearen email-a"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Password */}
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                    Pasahitza
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Sartu erabiltzailearen pasahitza"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            </div>        
            <div className="grid grid-cols-2 gap-5">
            {/* Herria */}
            <div className="mb-4">
                <label htmlFor="hometown" className="block text-gray-700 font-bold mb-2">
                    Herria
                </label>
                <input
                    type="text"
                    id="hometown"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleInputChange}
                    placeholder="Sartu erabiltzailearen herria"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Telefonoa */}
            <div className="mb-4">
                <label htmlFor="telephone" className="block text-gray-700 font-bold mb-2">
                    Telefonoa
                </label>
                <input
                    type="tel"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="Sartu erabiltzailearen telefonoa"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
            {/* Jaiotze-data */}
            <div className="mb-4">
                <label htmlFor="birth_date" className="block text-gray-700 font-bold mb-2">
                    Jaiotze-data
                </label>
                <input
                    type="date"
                    id="birth_date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            <div className="grid grid-cols-2 gap-5">
            {/* Admin */}
            <div className="mb-4">
                <label htmlFor="admin" className="block text-gray-700 font-bold mb-2">
                    Admin
                </label>
                <input
                    type="checkbox"
                    id="admin"
                    name="admin"
                    checked={formData.admin}
                    onChange={(e) => setFormData({ ...formData, admin: e.target.checked })}
                    className="mr-2"
                />
                Administratzailea da?
            </div>

                        {/* Aktibatuta */}
                        <div className="mb-4">
                <label htmlFor="aktibatua" className="block text-gray-700 font-bold mb-2">
                    Aktibatuta
                </label>
                <input
                    type="checkbox"
                    id="aktibatua"
                    name="aktibatua"
                    checked={formData.aktibatua}
                    onChange={(e) => setFormData({ ...formData, aktibatua: e.target.checked })}
                    className="mr-2"
                />
                Aktibatuta dago?
            </div>
            </div>
            </div>
            {/* Irudia */}
            <div className="mb-4">
                <label htmlFor="img" className="block text-gray-700 font-bold mb-2">
                    Irudia
                </label>
                <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={(e) => setFormData({ ...formData, img: e.target.files[0] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>

            {/* Botón de enviar */}
            <div className="text-center">
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Sortu
                </button>
            </div>
        </form>

        {/* Mensaje de error o éxito */}
        {userCreated && (
            <div className="mt-4 text-center text-green-500">
                User created: {userCreated.title}
            </div>
        )}
        {error && (
            <div className="mt-4 text-center text-red-500">
                {error}
            </div>
        )}
    </div>
    <Footer />
</div>

    );
}
export default ErabiltzaileaSortu;