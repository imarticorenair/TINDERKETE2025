import React, { useState } from 'react';
import Nav from './Navbar.js'; 
import Footer from './Footer.js';
import { useTranslation } from "react-i18next";

function Kontaktu() {
  const { t } = useTranslation(); 

  const [izen, setIzen] = useState('');
  const [email, setEmail] = useState('');
  const [telefonoa, setTelefonoa] = useState('');
  const [mezua, setMezua] = useState('');

  // handleSubmit donde enviamos los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Obtener el usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user')); // Asegúrate de que la clave sea correcta

    if (!user || !user.id) {
      alert('No se pudo obtener el usuario del localStorage');
      return;
    }

    const payload = {
      id: user.id, // Extraer el ID del usuario
      name: izen,  // Otros campos del formulario
      email,
      message: mezua,
    };

    try {
      const response = await fetch('http://localhost:8000/api/send-email', { // Asegúrate de que la URL es correcta
        //http://localhost:8000/api/getUser/${id}`
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Correo enviado correctamente');
      } else {
        alert('Error al enviar el correo');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el correo');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <div className="container mx-auto flex-grow px-4 py-8"> {/* Se asegura que el contenido crezca y el footer quede abajo */}
      <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('kontaktua.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('kontaktua.header2')}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de nombre */}
          <div className="mb-4">
            <label htmlFor="izen" className="block text-sm font-medium text-gray-700">{t('kontaktua.izena')}</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="izen"
              value={izen}
              onChange={(e) => setIzen(e.target.value)}
              placeholder={t('kontaktua.izenap')}
              required
            />
          </div>

          {/* Campo de email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('kontaktua.email')}</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('kontaktua.emailp')}
              required
            />
          </div>

          {/* Campo de teléfono */}
          <div className="mb-4">
            <label htmlFor="telefonoa" className="block text-sm font-medium text-gray-700">{t('kontaktua.telefonoa')}</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="telefonoa"
              value={telefonoa}
              onChange={(e) => setTelefonoa(e.target.value)}
              placeholder={t('kontaktua.telefonoap')}
              required
            />
          </div>

          {/* Campo de mensaje */}
          <div className="mb-4">
            <label htmlFor="mezua" className="block text-sm font-medium text-gray-700">{t('kontaktua.mezua')}</label>
            <textarea
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              id="mezua"
              value={mezua}
              onChange={(e) => setMezua(e.target.value)}
              placeholder={t('kontaktua.mezuap')}
              required
            ></textarea>
          </div>

          {/* Botón de envío */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {t('kontaktua.bidali')}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Kontaktu;
