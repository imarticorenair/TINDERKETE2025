import React, { useState, useEffect } from "react";
import EventCard from "./EventCard"; 
import urnietafrontoiaImg from "../images/urnietafrontoia.jpg";
import lezoFrontoiaImg from "../images/LezoFrontoia.jpg";
import zestoaFrontoiaImg from "../images/zestoafrontoia.jpg";
import agi from '../images/agi.png'; 
import p1 from '../images/pertsona1.jpg'; 
import p2 from '../images/pertsona2.jpg'; 
import Nav from './Navbar.js'; 
import Footer from './Footer.js';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";  // Importamos useNavigate para redirigir

const Txapelketak = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está logueado
  const [showLoginMessage, setShowLoginMessage] = useState(false); // Estado para mostrar el mensaje de login

  // Verificamos si hay un usuario logueado al cargar el componente
  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setIsLoggedIn(true);  // Si hay un email en localStorage, el usuario está logueado
    }
  }, []);

  const events = [
    {
      title: t('txapelketa1.title'),
      location: t('txapelketa1.location'),
      date: t('txapelketa1.date'),
      time: "16:00",
      description: t('txapelketa1.description'),
      participants: 3,
      maxParticipants: 24,
      price: 20,
      image: urnietafrontoiaImg, 
      participantImages: [
        agi,
        p1,
        p2,
      ],
    },
    {
      title: t('txapelketa2.title'),
      location: t('txapelketa2.location'),
      date: t('txapelketa2.date'),
      time: "16:00",
      description: t('txapelketa2.description'),
      participants: 3,
      maxParticipants: 32,
      price: 15,
      image: lezoFrontoiaImg,
      participantImages: [
        p1,
        p2,
        agi,
      ],
    },
    {
      title: t('txapelketa3.title'),
      location: t('txapelketa3.location'),
      date: t('txapelketa3.date'),
      time: "16:00",
      description: t('txapelketa3.description'),
      participants: 1,
      maxParticipants: 50,
      price: 10,
      image: zestoaFrontoiaImg,
      participantImages: [
        p2,
      ],
    },
  ];

  const handleEventClick = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);  // Mostrar el mensaje de login si no está logueado
    } else {
      setShowLoginMessage(false); // Asegurarse de que no se muestre el mensaje si está logueado
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");  // Redirigir a la página de login
  };

    return (
      <div className="flex flex-col min-h-screen">
        <Nav />
        <div className="container mx-auto flex-grow px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Txapelketak</h1>
            <p className="text-xl mt-2 text-gray-600">Descubre los torneos disponibles.</p>
          </div>
  
          {/* Renderizamos la lista de eventos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div key={index} className="col-span-1">
                <EventCard 
                  {...event}
                  onButtonClick={() => handleEventClick(event)} // Pasamos la lógica de clic al botón
                />
              </div>
            ))}
          </div>
  
          {/* Mostrar popup si el usuario no está logueado */}
          {showLoginMessage && (
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
        </div>
        <Footer />
      </div>
    );
};

export default Txapelketak;
