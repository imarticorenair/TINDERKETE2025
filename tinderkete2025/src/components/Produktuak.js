import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; 
import entrenatzailea from '../images/oihanEntrenatzailea.jpg'; 
import pala from '../images/pala.jpg'; 
import pilotak from '../images/frontenisPelotak.jpg'; 
import Nav from './Navbar.js'; 
import Footer from './Footer.js';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";  // Importamos useNavigate para redirigir

const Produktuak = () => {
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

  const handleEventClick = () => {
    if (!isLoggedIn) {
      setShowLoginMessage(true);  // Mostrar el mensaje de login si no está logueado
    } else {
      console.log("El usuario está logueado. Procediendo con la acción.");
      // Aquí puedes agregar lógica adicional si el usuario está logueado
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");  // Redirigir a la página de login
  };

  const products = [
    {
      name: t('produkt.entrenatzaile'),
      price: '25 h/',
      image: entrenatzailea,
    },
    {
      name: t('produkt.pala'),
      price: '30',
      image: pala,
    },
    {
      name: t('produkt.pelotak'),
      price: '10',
      image: pilotak,
    },
  ];

  // Estado para controlar los comentarios de los usuarios (simplificado)
  const [comments] = useState([
    { id: 1, text: "Itzelako zerbitzua, oso profesionala. Ohian entrenatzailea primerako tipoa da.", name: "Ana M." },
    { id: 2, text: "Las pelotas de frontenis son de buena calidad y a buen precio.", name: "Carlos G." },
    { id: 3, text: "Muy contento con la pala. La recomiendo totalmente.", name: "José L." }
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('produkt.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('produkt.header2')}</p>
        </div>

        {/* Mostrar mensaje si no está logueado */}
        {showLoginMessage && !isLoggedIn && (
          <div className="text-center text-red-600 mb-6">
            <p>{t('erreserbak.notLoggedInMessage')}</p>
            <button
              onClick={handleLoginRedirect}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
            >
              Login
            </button>
          </div>
        )}

        {/* Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl"
            >
              <ProductCard
                {...product}
                onClick={handleEventClick} // Pasar la función al botón "Erosi"
              />
            </div>
          ))}
        </div>

        {/* Comentarios */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">{t('produkt.iritziak')}</h2>
          <div className="space-y-4 text-center">
            {comments.slice(0, 2).map((comment) => ( // Mostrar solo dos comentarios
              <div key={comment.id} className="text-sm text-gray-700">
                <p>"{comment.text}"</p>
                <p className="text-xs text-gray-500">- {comment.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Produktuak;
