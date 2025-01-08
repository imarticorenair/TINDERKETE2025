import React, { useState, useEffect } from "react";
import p1 from "../images/mikel.jpg";
import p2 from "../images/ane.jpg";
import agi from "../images/agi.png";
import libre from "../images/libre.png";
import Nav from './Navbar.js';
import Footer from './Footer.js';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function PartidoakCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const [showLoginMessage, setShowLoginMessage] = useState(false); // Estado para mostrar el mensaje de login
  const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el pop-up

  // Verificamos si hay un usuario logueado al cargar el componente
  useEffect(() => {
    const userEmail = localStorage.getItem("email"); // Verificar si hay un email en localStorage
    if (userEmail) {
      setIsLoggedIn(true);  // Si hay un email, el usuario está logueado
    }
  }, []);

  const [activeList, setActiveList] = useState("publiko"); // Mostrar público o privado
  const [reservations] = useState([
    {
      date: "2024/12/08",
      time: "20:00",
      sport: "Trinketea",
      location: "Antigua",
      players: [
        { name: "Oihan", image: p1 },
        { name: "Leire", image: p2 },
      ],
      availableSpots: 2,
      price: "11,74€",
      duration: "90",
      type: "publiko"
    },
    {
      date: "2024/11/08",
      time: "18:00",
      sport: "Frontoia",
      location: "Antigua",
      players: [
        { name: "Oihan", image: agi },
        { name: "Leire", image: p2 },
      ],
      availableSpots: 2,
      price: "9,74€",
      duration: "60",
      type: "publiko"
    },
    {
      date: "2024/12/09",
      time: "18:30",
      sport: "Trinketea",
      location: "Sagues",
      players: [
        { name: "Jon", image: p1 },
        { name: "Ane", image: p2 },
      ],
      availableSpots: 2,
      price: "15,00€",
      duration: "60",
      type: "pribatu"
    },
    {
      date: "2024/10/08",
      time: "20:30",
      sport: "Frontoia",
      location: "Sagues",
      players: [
        { name: "Jon", image: p1 },
        { name: "Ane", image: p2 },
      ],
      availableSpots: 2,
      price: "20,00€",
      duration: "60",
      type: "pribatu"
    },
    {
      date: "2024/09/06",
      time: "17:00",
      sport: "Frontoia",
      location: "Loiola",
      players: [
        { name: "Mikel", image: agi },
        { name: "Irati", image: p2 },
      ],
      availableSpots: 2,
      price: "10,50€",
      duration: "120",
      type: "publiko"
    },
    {
      date: "2024/07/08",
      time: "17:00",
      sport: "Frontoia",
      location: "Loiola",
      players: [
        { name: "Mikel", image: p1 },
        { name: "Irati", image: p2 },
      ],
      availableSpots: 2,
      price: "10,50€",
      duration: "120",
      type: "publiko"
    },
    {
      date: "2024/12/10",
      time: "17:00",
      sport: "Trinketea",
      location: "Loiola",
      players: [
        { name: "Mikel", image: agi },
        { name: "Irati", image: p2 },
      ],
      availableSpots: 2,
      price: "10,50€",
      duration: "120",
      type: "publiko"
    }
  ]);

  // Filtrar partidas según el estado de login y tipo (público/privado)
  const filteredReservations = reservations.filter((reservation) => {
    if (activeList === "pribatu" && !isLoggedIn) return false; // No mostrar privadas si no está logueado
    return reservation.type === activeList;
  });

  const handleJoinClick = (reservation) => {
    if (!isLoggedIn) {
      setShowLoginMessage(true); // Mostrar mensaje si no está logueado
    } else {
      setShowLoginMessage(false);
      setShowPopup(true); // Mostrar pop-up si está logueado
    }
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

        {/* Mostrar mensaje si no está logueado */}
        {!isLoggedIn && showLoginMessage && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="animate-jump-in">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center text-red-600 mb-4 text-lg">
                  <p>{t('erreserbak.notLoggedInMessage')}</p>
                  <button
                    onClick={handleLoginRedirect}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Mostrar opciones de filtro entre público y privado */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveList('publiko')}
            className={`px-6 py-2 rounded-lg ${activeList === 'publiko' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {t('partidak.public')}
          </button>
          <button
            onClick={() => setActiveList('pribatu')}
            className={`px-6 py-2 rounded-lg ${activeList === 'pribatu' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {t('partidak.private')}
          </button>
        </div>

        {/* Lista de partidas */}
        <div className="container mx-auto flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {filteredReservations.map((reservation, index) => (
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
                      src={player.image}
                      alt={player.name}
                      className="w-16 h-16 rounded-full mb-1"
                    />
                    <span className="text-xs text-gray-700">{player.name}</span>
                  </div>
                ))}
                <div className="border-l border-gray-300 mx-2 h-10"></div>
                {[...Array(reservation.availableSpots)].map((_, idx) => (
                  <div
                    key={`libre-${idx}`}
                    className="flex flex-col items-center text-center mx-auto"
                  >
                    <img
                      src={libre}
                      alt="Libre"
                      className="w-16 h-16 rounded-full mb-1 cursor-pointer"
                      onClick={() => handleJoinClick(reservation)}
                    />
                    <span className="text-xs text-gray-500">{t('partidak.apuntatu')}</span>
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
                  <p className="text-xs text-gray-500">{`${reservation.duration} ${t('partidak.minutu')}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="animate-jump-in">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800">{t('partidak.popupHeader')}</h2>
            <button
              onClick={handleCloseAndNavigate} // Llamamos a la nueva función
              className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {t('partidak.itxi')}
            </button>
          </div>
          </div>

        </div>
      )}

      <Footer />
    </div>
  );
}

export default PartidoakCard;
