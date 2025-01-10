// Resto de las importaciones
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import NavbarAdmin from "./NavbarAdmin.js";
import Footer from "./Footer.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function TxapelketaEditatu() {
    const { id } = useParams(); // Obtener el ID del torneo desde la URL
    const navigate = useNavigate(); // Para redirigir después de actualizar
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        date: "",
        time: "",
        description: "",
        price: "",
        maxParticipants: "",
    });
    const [error, setError] = useState(""); // Para manejar errores
    const [locations, setLocations] = useState([]); // Lista de ubicaciones

    // Obtener los datos iniciales del torneo
    useEffect(() => {
        const fetchTournament = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/txapelketak-with-users/${id}`);
                const tournament = response.data.data;
                setFormData({
                    title: tournament.title,
                    location: tournament.location.id.toString(), // Usamos el ID como valor del formulario
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
                const response = await axios.get("http://localhost:8000/api/lokalekuak");
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
            await axios.put(`http://localhost:8000/api/txapelketak/${id}`, updatedTournament);
            setError(""); // Limpia errores si los hubo
        } catch (err) {
            console.error("Error updating tournament:", err);
            setError(err.response?.data?.message || "Error al actualizar el torneo.");
        }
        navigate('/TxapelketakAdmin');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavbarAdmin  />
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
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        list="locations-list"
                                        placeholder="Aukeratu kokalekua"
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <datalist id="locations-list">
                                        {locations.map((location) => (
                                            <option key={location.id} value={location.id}>{location.name}</option>
                                        ))}
                                    </datalist>
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

                    {/* Vista previa */}
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
                                image={"https://via.placeholder.com/150?text=Irudi+faltan"}
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
