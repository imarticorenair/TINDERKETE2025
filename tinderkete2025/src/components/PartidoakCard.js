import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from './Navbar.js';
import Footer from './Footer.js';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import libre from "../images/libre.png"; // Imagen para espacios libres

function PartidoakCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const [showLoginMessage, setShowLoginMessage] = useState(false); // Estado para mostrar el mensaje de login
  const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el pop-up
  const [reservations, setReservations] = useState([]); // Estado para las reservas

  useEffect(() => {
    // Verificar si el usuario está logueado
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setIsLoggedIn(true);
    }

    // Obtener reservas desde la API
    axios.get('http://localhost:8000/api/reservations') // Reemplaza con tu endpoint
      .then(response => {
        setReservations(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching reservations:", error);
      });
  }, []);

  const handleJoinClick = (reservation) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    axios.post(
      `http://localhost:8000/api/reservations/${reservation.id}`,
      { user_id: userId }, // Enviar el user_id en el cuerpo de la solicitud
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error al unirse a la reserva:", error.response?.data || error.message);
      });
  };


  const handleLoginRedirect = () => {
    navigate("/login"); // Redirigir al login
  };

  const closePopup = () => {
    setShowPopup(false); // Cerrar el pop-up
  };

  const handleCloseAndNavigate = () => {
    closePopup(); // Cierra el pop-up
    navigate("/erreserbak"); // Redirige a la página de registro
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('partidak.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('partidak.description')}</p>
        </div>

        {/* Lista de partidas */}
        <div className="container mx-auto flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {reservations.map((reservation, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <p className="text-sm text-gray-500">
                  {reservation.date} | {reservation.time}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  {reservation.sport === "Frontoia"
                    ? t('partidak.frontoia')
                    : reservation.sport === "Trinketea"
                      ? t('partidak.trinketea')
                      : reservation.sport}
                </p>
              </div>

              <hr className="my-2 border-gray-300 mx-auto" />

              {/* Jugadores y espacios libres */}
              <div className="flex items-center">
                {reservation.players.map((player, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center mr-2 text-center mx-auto"
                  >
                    <img
                      src={`http://localhost:8000/${player.image || libre}`} // Ruta completa para la imagen
                      alt={player.name || "Libre"}
                      className="w-16 h-16 rounded-full mb-1 object-cover" // Ajustar tamaño en pantallas pequeñas y medianas
                    />
                    <span className="text-xs text-gray-700">{player.name || "LIBRE"}</span>
                  </div>
                ))}
                {[...Array(4 - reservation.players.length)].map((_, idx) => (
                  <div
                    key={`libre-${idx}`}
                    className="flex flex-col items-center text-center mx-auto"
                  >
                    <img
                      src={libre}
                      alt="Libre"
                      className="w-16 h-16  rounded-full mb-1 object-cover cursor-pointer"
                    />
                    <span className="text-xs text-gray-500">{t('partidak.libre')}</span>
                  </div>
                ))}
              </div>

              <hr className="my-2 border-gray-300" />
              <div className="flex justify-between items-center">
                <p className="text-gray-600 text-sm">{reservation.location}</p>
                <div className="text-right">
                  <p className="text-base font-semibold text-gray-800">
                    {reservation.price}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleJoinClick(reservation)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                {t('partidak.apuntatu')}
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PartidoakCard;
