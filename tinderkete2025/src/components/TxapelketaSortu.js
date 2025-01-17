import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import NavbarAdmin from "./NavbarAdmin.js";
import Footer from "./Footer.js";
import axios from 'axios';
const ipBack = process.env.REACT_APP_BASE_URL;


function TxapelketaSortu() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    description: "",
    price: "",
    maxParticipants: "",
  });

  const [tournamentCreated, setTournamentCreated] = useState(null); // Estado para el torneo creado
  const [error, setError] = useState(""); // Estado para errores
  const [locations, setLocations] = useState([]); // Estado para guardar las ubicaciones

  // Realizamos la solicitud a la API para obtener las ubicaciones
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${ipBack}/api/lokalekuak`);
        const result = await response.json();

        // Verificamos si 'result.data' es un arreglo
        if (result.success && Array.isArray(result.data)) {
          setLocations(result.data); // Asignamos las ubicaciones al estado
        } else {
          console.error('La respuesta de la API no contiene un arreglo de ubicaciones:', result);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations(); // Llamamos a la función para obtener las ubicaciones
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    const tournamentData = {
      title: formData.title,
      location_id: parseInt(formData.location), // location_id si se refiere a un ID
      date: formData.date,
      time: formData.time,
      description: formData.description,
      price: parseFloat(formData.price),
      max_participants: parseInt(formData.maxParticipants),
    };

    try {
      const response = await axios.post(`${ipBack}/api/txapelketak`, tournamentData);

      console.log("Response:", response.data);
      setTournamentCreated(response.data.data);
      setError(""); // Limpia cualquier error previo
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
          <h1 className="text-3xl font-bold text-blue-600">Txapelketa Sortu</h1>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap -mx-4">
          {/* Formulario */}
          <div className="w-full lg:w-2/3 px-4 mb-8">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6 h-full">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
                {/* Título */}
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
                {/* Localización (Datalist) */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Kokalekua</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Sartu kokalekua"
                    list="locations-list" // Asociamos este input al datalist
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <datalist id="locations-list">
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </datalist>
                </div>
                {/* Fecha */}
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
                {/* Hora */}
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
                {/* Descripción */}
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
                {/* Precio */}
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
                {/* Máximo de participantes */}
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
                >Sortu
                </button>
              </form>
              {/* Mensaje de error o éxito */}
              {tournamentCreated && (
                <div className="mt-4 text-center text-green-500">
                  Tournament created: {tournamentCreated.title}
                </div>
              )}
              {error && (
                <div className="mt-4 text-center text-red-500">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Preview dinámico */}
          <div className="w-full lg:w-1/3 px-4">
            <div className="sticky top-4">
              <EventCard
                title={formData.title || "Txapelketaren izenburua"}
                location={locations.find(loc => loc.id.toString() === formData.location)?.name || "Kokalekua"}
                date={formData.date || "Data"}
                time={formData.time || "Ordua"}
                description={formData.description || "Deskribapena"}
                price={formData.price || "0"}
                participants={0} // Preview siempre muestra 0 participantes
                maxParticipants={formData.maxParticipants || "0"}
                image={
                  formData.image ||
                  "https://via.placeholder.com/150?text=Irudi+faltan"
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

export default TxapelketaSortu;
