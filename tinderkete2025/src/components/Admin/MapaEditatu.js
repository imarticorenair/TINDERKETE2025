import React, { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin.js";
import Footer from "../Layout/Footer";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
const ipBack = process.env.REACT_APP_BASE_URL;


function MapaEditatu() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        type: "",
        iframe: "",
        url: "",
        img: "",
    });
    const [error, setError] = useState("");
    const [locations, setLocations] = useState([]);


    useEffect(() => {
        const fetchMapa = async () => {
            try {
                const response = await axios.get(
                    `${ipBack}/api/getMap/${id}`
                );
                const Mapa = response.data.data;
                setFormData({
                    name: Mapa.name,
                    type: Mapa.type,
                    iframe: Mapa.iframe,
                    url: Mapa.url,
                    img: Mapa.img,
                });
            } catch (err) {
                console.error("Error fetching Mapa:", err);
                setError("No se pudieron cargar los datos del torneo.");
            }
        };

        fetchMapa();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `${ipBack}/api/mapak/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Mapa ongi eguneratu da!");
            navigate('/mapakudeatu');
        } catch (err) {
            console.error("Error updating Mapa:", err);
            setError(err.response?.data?.message || "Error al actualizar el mapa.");
        }
    };


    return (
        <div>
            <NavbarAdmin />
            <div className="container mx-auto px-4 py-10">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-600">Mapa Editatu</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">

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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                            Mota
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value=" "> </option>
                            <option value="frontoiak">{t('mapak.frontoiak')}</option>
                            <option value="trinketeak">{t('mapak.trinketeak')}</option>
                        </select>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="iframe" className="block text-gray-700 font-bold mb-2">
                            Iframe
                        </label>
                        <textarea
                            id="iframe"
                            name="iframe"
                            value={formData.iframe}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                            rows="4"
                            required
                        ></textarea>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="url" className="block text-gray-700 font-bold mb-2">
                            URL
                        </label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>


                    <div className="mb-4">
                        <label htmlFor="img" className="block text-gray-700 font-bold mb-2">
                            IRUDIA
                        </label>
                        <input
                            type="file"
                            id="img"
                            name="img"
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>


                    <div className="text-center">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Eguneratu
                        </button>
                    </div>
                </form>

                {error && <div className="mt-4 text-center text-red-500">{error}</div>}
            </div>
            <Footer />
        </div>
    );

}

export default MapaEditatu;
