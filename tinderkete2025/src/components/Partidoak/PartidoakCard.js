import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from '../Layout/Navbar.js';
import Footer from '../Layout/Footer.js';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import libre from "../../images/libre.png"; 
const ipBack = process.env.REACT_APP_BASE_URL;
const imgBack = process.env.IMG;

function PartidoakCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [showLoginMessage, setShowLoginMessage] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setIsLoggedIn(true);
    }

    axios.get(`${ipBack}/api/reservations`)
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
    if (!token) {
      setShowLoginMessage(true); // Muestra el modal si no hay token
      return;
    } else {
      axios.post(`${ipBack}/api/matches/${reservation.id}/users`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          console.log(response.data);
          setResponseMessage(response.data.message || t('partidak.success')); 
          navigate("/erreserbak");
        })
        .catch(error => {
          console.error("Error al unirse a la reserva:", error.response?.data || error.message);
          setResponseMessage(error.response?.data?.message || t('partidak.error')); 
          alert(error.response.data.message);
        });
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
    setShowLoginMessage(false); // Cierra el modal después de redirigir
  };

  const handleBackRedirect = () => {
    navigate("/PartidoakCard");
    setShowLoginMessage(false); // Cierra el modal
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('partidak.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('partidak.description')}</p>
        </div>

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

              <div className="flex items-center">
                {reservation.players.map((player, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center mr-2 text-center mx-auto"
                  >
                    <img
                      src={`${ipBack}/${player.image || libre}`}
                      alt={player.name || "Libre"}
                      className="w-16 h-16 rounded-full mb-1 object-cover"
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

      {/* Modal para mostrar cuando no hay token */}
      {showLoginMessage && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-red-600 mb-4">{t('erreserbak.notLoggedInMessage')}</p>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleLoginRedirect}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Login
              </button>
              <button
                onClick={handleBackRedirect}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                {t('erreserbak.itzuli')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PartidoakCard;
