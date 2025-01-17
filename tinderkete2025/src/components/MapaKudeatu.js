import React, { useEffect, useState } from 'react';
import NavbarAdmin from './NavbarAdmin.js';
import Footer from './Footer.js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import axios from 'axios';
const ipBack = process.env.REACT_APP_BASE_URL;


function MapaKudeatu() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaps = async () => {
            try {
                const response = await fetch(`${ipBack}/lokalekuak`);

                console.log("Server Response:", response); // Log completo de la respuesta

                if (!response.ok) {
                    throw new Error(`Errorea: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                console.log("Result JSON:", result); // Log del JSON recibido
                setMaps(result.data || []);
            } catch (err) {
                console.error("Fetch Error:", err.message); // Log del error
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMaps();
    }, []);

    const handleSortu = () => {
        navigate('/mapalistasortu');
    };

    const handleEdit = (id) => {
        navigate(`/mapaeditatu/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${ipBack}/lokalekuakDelete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Errorea mapa ezabatzerakoan.");
            }

            // Update state only after ensuring the API call is successful
            setMaps((prevMaps) => {
                const updatedMaps = prevMaps.filter((map) => map.id !== id);
                console.log("Updated maps state:", updatedMaps);
                return updatedMaps;
            });
        } catch (err) {
            alert(`Errorea mapa ezabatzerakoan: ${err.message}`);
        }
    };

    if (loading) {
        return <p className="text-center text-xl font-semibold">Loading maps...</p>;
    }

    if (error !== null) {  // Check if error is not null (string or other value)
        return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;
    }

    return (
        <div>
            <NavbarAdmin />
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">{t('mapakSortu.header')}</h1>
                    <p className="text-xl mt-2 text-gray-600">{t('mapakSortu.subHeader')}</p>
                </div>
                <div>
                    <button
                        onClick={() => handleSortu()}
                        className="flex justify-center mx-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Sortu
                    </button>
                </div>
                <div className="overflow-x-auto shadow-md rounded-lg my-4">
                    <table className="min-w-full bg-white table-auto border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-4 py-2">Editatu</th>
                                <th className="px-4 py-2">Ezabatu</th>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Izena</th>
                                <th className="px-4 py-2">Mota</th>
                                <th className="px-4 py-2">Iframe</th>
                                <th className="px-4 py-2">Url</th>
                                <th className="px-4 py-2">Img</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maps.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-4 text-gray-600">No maps found.</td>
                                </tr>
                            ) : (
                                maps.map((map) => (
                                    <tr key={map.id} className="border-b hover:bg-gray-100">
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleEdit(map.id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(map.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                                            >
                                                Ezabatu
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 text-center">{map.id}</td>
                                        <td className="px-4 py-2">{map.name}</td>
                                        <td className="px-4 py-2">{map.type}</td>
                                        <td className="px-4 py-2">{map.iframe}</td>
                                        <td className="px-4 py-2">{map.url}</td>
                                        <td className="px-4 py-2">{map.img}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default MapaKudeatu;
