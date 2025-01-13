import React, { useState, useEffect } from 'react';
import PerfilaCard from './PerfilaCard.js';
import perfiltxuri from '../images/perfiltxuri.png';
import Nav from './Navbar.js';
import Footer from './Footer.js';
import UserProfileTable from './UserProfileTable';
import { useTranslation } from "react-i18next";

const Perfila = () => {
  const { t } = useTranslation(); 

  const [user, setUser] = useState({
    image: perfiltxuri,
    izena: '',
    abizenak: '',
    email: '',
    jaiotzeData: '',
    jaioterria: '',
    telefonoa: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  // Recuperar datos del localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser({
        image: parsedUser.image || perfiltxuri, // Usa una imagen predeterminada si no existe
        izena: parsedUser.name || '',
        abizenak: parsedUser.surname || '',
        email: parsedUser.email || '',
        jaiotzeData: parsedUser.birth_date || '',
        jaioterria: parsedUser.hometown || '',
        telefonoa: parsedUser.telephone || '',
      });
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    const updatedUser = {
      name: user.izena,
      surname: user.abizenak,
      email: user.email,
      hometown: user.jaioterria,
      image: user.image,
      birth_date: user.jaiotzeData,
      telephone: user.telefonoa,
    };

    // Obtener el ID del usuario desde el localStorage (o desde un estado si lo tienes)
    const userId = JSON.parse(localStorage.getItem('user')).id;

    // Hacer la solicitud al servidor para actualizar los datos
    try {
      const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Si tu API usa autenticación (Sanctum o JWT), agrega el token aquí
          //'Authorization': `Bearer ${localStorage.getItem('authToken')}`,  // Reemplaza con tu token real
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUserData.data)); // Guarda los datos actualizados en localStorage
        alert('Perfil actualizado con éxito');
      } else {
        throw new Error('No se pudo actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
      alert(t('perfila.errorea'));
    }
  };

  const handleImageChange = (newImage) => {
    setUser((prevUser) => ({
      ...prevUser,
      image: newImage,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('profila.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('profila.header2')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
          <div className="w-full sm:w-3/4">
            <PerfilaCard image={perfiltxuri} onImageChange={handleImageChange} />
          </div>

          <div className="w-full sm:w-3/4">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
                <div>
                  <label htmlFor="izena" className="block font-bold text-gray-700">{t('profila.izena')}</label>
                  <input
                    type="text"
                    id="izena"
                    name="izena"
                    value={user.izena}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label htmlFor="abizenak" className="block font-bold text-gray-700">{t('profila.abizena')}</label>
                  <input
                    type="text"
                    id="abizenak"
                    name="abizenak"
                    value={user.abizenak}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-bold text-gray-700">{t('profila.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label htmlFor="jaioterria" className="block font-bold text-gray-700">{t('profila.jaioterria')}</label>
                  <input
                    type="text"
                    id="jaioterria"
                    name="jaioterria"
                    value={user.jaioterria}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label htmlFor="telefonoa" className="block font-bold text-gray-700">{t('profila.telefonoa')}</label>
                  <input
                    type="text"
                    id="telefonoa"
                    name="telefonoa"
                    value={user.telefonoa}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    {t('profila.gorde')}
                  </button>
                </div>
              </form>
            ) : (
              <UserProfileTable user={user} onEditClick={handleEditClick} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Perfila;
