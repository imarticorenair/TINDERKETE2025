import React, { useState, useEffect } from "react";
import EventCard from "../Txapelketa/EventCard.js";
import NavbarAdmin from "./NavbarAdmin.js";
import Footer from "../Layout/Footer";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const ipBack = process.env.REACT_APP_BASE_URL;

function TxapelketaEditatu() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        date: "",
        time: "",
        description: "",
        price: "",
        maxParticipants: "",
    });
    const [error, setError] = useState("");
    const [locations, setLocations] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const response = await axios.get(`${ipBack}/api/txapelketak-with-users/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const tournament = response.data.data;
                setFormData({
                    title: tournament.title,
                    location: tournament.location.id.toString(),
                    date: tournament.date,
                    time: tournament.time,
                    description: tournament.description,
                    price: tournament.price.toString(),
                    maxParticipants: tournament.max_participants.toString(),
                });
            } catch (err) {
                console.error("Error fetching tournament:", err);
                setError("No se pudieron cargar los datos del torneo.");
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await axios.get(`${ipBack}/api/lokalekuak`);
                setLocations(response.data.data);
            } catch (err) {
                console.error("Error fetching locations:", err);
                setError("No se pudieron cargar las ubicaciones.");
            }
        };

        fetchLocations();
        fetchTournament();
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

        const updatedTournament = {
            title: formData.title,
            location_id: parseInt(formData.location),
            date: formData.date,
            time: formData.time,
            description: formData.description,
            price: parseFloat(formData.price),
            max_participants: parseInt(formData.maxParticipants),
        };

        try {
            await axios.put(`${ipBack}/api/txapelketak/${id}`, updatedTournament, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setError("");
        } catch (err) {
            console.error("Error updating tournament:", err);
            setError(err.response?.data?.message || "Error al actualizar el torneo.");
        }
        navigate('/TxapelketakAdmin');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarAdmin />
            <div className="container mx-auto flex-grow px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600">Txapelketa Editatu</h1>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap -mx-4">
                    {/* Formulario */}
                    <div className="w-full lg:w-2/3 px-4 mb-8">
                        <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6 h-full">
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Izenburua</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Sartu txapelketaren izenburua"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Kokalekua</label>
                                    <select
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Sartu kokalekua"
                                        list="locations-list"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="">{"---"}</option>{" "}
                                        {locations.map((location) => (
                                            <option key={location.id} value={location.id}>
                                                {location.name} - {location.type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Data</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Ordua</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-1 text-gray-700">Deskribapena</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Sartu deskribapena"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Prezioa (€)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="Sartu prezioa"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block mb-1 text-gray-700">Gehieneko Partehartzaileak</label>
                                    <input
                                        type="number"
                                        name="maxParticipants"
                                        value={formData.maxParticipants}
                                        onChange={handleInputChange}
                                        placeholder="Sartu gehienezko partehartzaile kopurua"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                                >
                                    Eguneratu
                                </button>
                            </form>
                            {error && <div className="mt-4 text-center text-red-500">{error}</div>}
                        </div>
                    </div>


                    <div className="w-full lg:w-1/3 px-4">
                        <div className="sticky top-4">
                            <EventCard
                                title={formData.title || "Txapelketaren izenburua"}
                                location={locations.find((loc) => loc.id.toString() === formData.location)?.name || "Kokalekua"}
                                date={formData.date || "Data"}
                                time={formData.time || "Ordua"}
                                description={formData.description || "Deskribapena"}
                                price={formData.price || "0"}
                                participants={0}
                                maxParticipants={formData.maxParticipants || "0"}
                                image={
                                    locations.find(
                                        (loc) => loc.id.toString() === formData.location
                                    )?.img
                                        ? `${ipBack}/${locations.find(
                                            (loc) => loc.id.toString() === formData.location
                                        )?.img
                                        }`
                                        : "https://via.placeholder.com/150?text=Irudi+faltan"
                                }
                                participantImages={[]}

                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TxapelketaEditatu;
