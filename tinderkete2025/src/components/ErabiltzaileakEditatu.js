// Resto de las importaciones
import React, { useState, useEffect } from "react";
import EventCard from "./EventCard";
import Nav from "./Navbar.js";
import Footer from "./Footer.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ErabiltzaileaEditatu() {
  const { id } = useParams(); // Obtener el ID del torneo desde la URL
  const navigate = useNavigate(); // Para redirigir después de actualizar
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    argazkia: "",
    herria: "",
    telephone: "",
    jaiotze_data: "",
    admin: false,
  });
  const [error, setError] = useState(""); // Para manejar errores
  const [locations, setLocations] = useState([]); // Lista de ubicaciones

  // Obtener los datos iniciales del torneo
  useEffect(() => {
    const fetchErabiltzaile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getUser/${id}`
        );
        const Erabiltzaile = response.data.data;
        setFormData({
          name: Erabiltzaile.name,
          surname: Erabiltzaile.surname,
          email: Erabiltzaile.email,
          argazkia: Erabiltzaile.img,
          hometown: Erabiltzaile.hometown,
          telephone: Erabiltzaile.telephone,
          birth_date: Erabiltzaile.birth_date,
          admin: Erabiltzaile.admin,
        });
      } catch (err) {
        console.error("Error fetching Erabiltzaile:", err);
        setError("No se pudieron cargar los datos del torneo.");
      }
    };

    fetchErabiltzaile();
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

    const updatedErabiltzaile = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        argazkia: formData.argazkia,
        hometown: formData.hometown,
        telephone: formData.telephone,
        birth_date: formData.birth_date,
        admin: formData.admin,
      };

    try {
      await axios.put(
        `http://localhost:8000/api/user/${id}`,
        formData
        
      );
      alert("Erabiltzailea ongi eguneratu da!")
    } catch (err) {
      console.error("Error updating Erabiltzaile:", err);
      setError(err.response?.data?.message || "Error al actualizar el torneo.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="container mx-auto flex-grow px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            Erabiltzailea Editatu
          </h1>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap -mx-4">
          {/* Formulario */}
          <div className="w-full lg:w-2/3 px-4 mb-8">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6 h-full">
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
              >
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Izena</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Aldatu name"
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
                    placeholder="Aldatu abizena"
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
                    placeholder="Aldatu email-a"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Argazkia</label>
                  <input
                    type="text"
                    name="argazkia"
                    value={formData.argazkia}
                    onChange={handleInputChange}
                    placeholder="Aldatu argazkia"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Herria</label>
                  <input
                    type="text"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleInputChange}
                    placeholder="Aldatu herria"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Telefonoa</label>
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="Aldatu Telefonoa"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">
                    Jaiotze data
                  </label>
                  <input
                    type="text"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                    placeholder="Aldatu jaiotza-data"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">
                    Admin
                  </label>
                  <input
                    type="text"
                    name="admin"
                    value={formData.admin}
                    onChange={handleInputChange}
                    placeholder="Aldatu admin"
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
              {error && (<div className="mt-4 text-center text-red-500">{error}</div>)}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ErabiltzaileaEditatu;
