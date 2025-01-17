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
            const response = await axios.post(`${ipBack}/userStore`, formDataToSend, {
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
        <div className="flex flex-col min-h-screen">
            <NavbarAdmin />
            <div className="container mx-auto flex-grow px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">Erabiltzailea Sortu</h1>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap -mx-4">
                    <div className="w-full lg:w-2/3 px-4 mb-8">
                        <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6 h-full">
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Izena</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Sartu erabiltzailearen "
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Abizena</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleInputChange}
                                        placeholder="Sartu erabiltzailearen "
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Sartu erabiltzailearen "
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Password</label>
                                    <input
                                        type="text"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Sartu erabiltzailearen "
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-1 text-gray-700">Herria</label>
                                    <input
                                        type="text"
                                        name="hometown"
                                        value={formData.hometown}
                                        onChange={handleInputChange}
                                        placeholder="Sartu erabiltzailearen "
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Telefonoa</label>
                                    <input
                                        type="number"
                                        name="telephone"
                                        value={formData.telephone}
                                        onChange={handleInputChange}
                                        placeholder="Sartu prezioa"
                                        maxLength="9"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Jaiotze-data</label>
                                    <input
                                        type="date"
                                        name="birth_date"
                                        value={formData.birth_date}
                                        onChange={handleInputChange}
                                        placeholder="Sartu gehienezko partehartzaile kopurua"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Admin</label>
                                    <input
                                        type="checkbox"
                                        name="admin"
                                        checked={formData.admin}
                                        onChange={(e) =>
                                            setFormData({ ...formData, admin: e.target.checked })
                                        }
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Irudia</label>
                                    <input
                                        type="file"
                                        name="img"
                                        onChange={(e) => setFormData({ ...formData, img: e.target.files[0] })}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Aktibatuta</label>
                                    <input
                                        type="checkbox"
                                        name="aktibatua"
                                        checked={formData.aktibatua}
                                        onChange={(e) =>
                                            setFormData({ ...formData, aktibatua: e.target.checked })
                                        }
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                                >Sortu
                                </button>
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
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default ErabiltzaileaSortu;