import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Nav from './Navbar.js';
import Footer from './Footer.js';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Erreserbak() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "", // Mantener solo la hora sin los minutos
    location_id: "",
  });
  const [reservationCreated, setReservationCreated] = useState(null);
  const [error, setError] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginMessage(true);
    }

    // Fetch locations
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/lokalekuak/');
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setLocations(result.data);
        } else {
          console.error('Unexpected API response:', result);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    const fetchReservationUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/reservation/reservationUser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = response.data;
        if (result.success && Array.isArray(result.data)) {
          setReservations(result.data); // Guardar las reservas en el estado
        } else {
          console.error('Unexpected API response:', result);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    fetchLocations();
    fetchReservationUser();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "time") {
      // Asegurarse de que los minutos sean siempre 00
      const timeWithZeroMinutes = value.slice(0, 2) + ":00"; // Ajustar minutos a 00
      setFormData((prev) => ({ ...prev, [name]: timeWithZeroMinutes }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!formData.date || !formData.time || !formData.location_id) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/reservations", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Si la reserva es creada correctamente
      setReservationCreated(response.data.data);
      setFormData({ date: "", time: "", location_id: "" });
      setError(""); // Limpiar errores
      window.location.reload();
    } catch (error) {
      // Manejo de errores
      setError(error.response?.data?.message || "Error al enviar los datos a la API");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleLoginRedirect = () => navigate("/login");

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="container mx-auto flex-grow px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('erreserbak.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('erreserbak.description')}</p>
        </div>
        <div className="flex flex-wrap -mx-4">
          {/* Formulario */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6">
              <h5 className="text-xl font-bold mb-6 text-center">{t('erreserbak.header')}</h5>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700">{t('erreserbak.location')}</label>
                  <select
                    name="location_id"
                    value={formData.location_id}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="" disabled>---</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">{t('erreserbak.date')}</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">{t('erreserbak.time')}</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  {t('erreserbak.submit')}
                </button>
              </form>
              {error && <p style={{ color: "red" }}>Error: {error}</p>}

              {showLoginMessage && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <p className="text-red-600 mb-4">{t('erreserbak.notLoggedInMessage')}</p>
                    <button
                      onClick={handleLoginRedirect}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                      {t('erreserbak.login')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Reservas */}
          <div className="w-full md:w-2/3 px-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 border border-gray-200">
              <h5 className="text-xl font-bold mb-6 text-center">{t('erreserbak.yourReservations')}</h5>
              {reservations.length > 0 ? (
                <ul>
                  {reservations.map((reservation) => (
                    <li key={reservation.id} className="mb-4 ">
                      <hr></hr>
                      <div className="flex justify-between">
                        <p><strong>{t('erreserbak.location')}:</strong> {reservation.location.name}</p>
                        <p><strong>{t('erreserbak.date')}:</strong> {reservation.date}</p>
                        <p><strong>{t('erreserbak.time')}:</strong>  {reservation.time.slice(0, 5)}</p>
                        <p><strong>{t('erreserbak.price')}:</strong> {reservation.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{t('erreserbak.noReservations')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Erreserbak;
