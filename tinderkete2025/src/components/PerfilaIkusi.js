import React, { useState, useEffect } from 'react';
import PerfilaCard from './PerfilaCard.js';
import perfiltxuri from '../images/perfiltxuri.png';
import Nav from './Navbar.js';
import Footer from './Footer.js';
import UserProfileTable from './UserProfileTable';
import { useTranslation } from "react-i18next";
import axios from "axios";
const ipBack = process.env.REACT_APP_BASE_URL;
const imgBack = process.env.IMG;

const Perfila = () => {
  const { t } = useTranslation();

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  // Estado de usuario con las propiedades correctas
  const [user, setUser] = useState({
    img: perfiltxuri, // Imagen predeterminada
    name: "",
    surname: "",
    email: "",
    birth_date: "",
    hometown: "",
    telephone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    console.log("userId recibido:", userId);
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${ipBack}/api/getUser/${userId}`);
        console.log("Respuesta de la API:", response.data);
        setUser(response.data.data); // Ajusta según la estructura de la respuesta de la API
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUser();
  }, [userId]);

  // Manejar clic en editar
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Manejar cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    // Preparar el objeto con los datos actualizados
    const updatedUser = {
      //img: user.img,
      name: user.name,
      surname: user.surname,
      email: user.email,
      hometown: user.hometown,
      birth_date: user.birth_date,
      telephone: user.telephone,
    };

    // Enviar los datos actualizados al servidor
    try {
      const response = await axios.put(`${ipBack}/api/user/${userId}`, updatedUser);
      localStorage.setItem('user', JSON.stringify(response.data.data)); // Guardar datos actualizados en localStorage
      alert('Perfil actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar los datos:', error.response?.data || error.message);
      alert(`Error al actualizar: ${error.response?.data?.message || error.message}`);
    }
    
  };

  // Manejar cambio de imagen
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
            <PerfilaCard img={`${ipBack}/${user.img}`} onImageChange={handleImageChange} />
          </div>

          <div className="w-full sm:w-3/4">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
                <div>
                  <label htmlFor="name" className="block font-bold text-gray-700">{t('profila.izena')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label htmlFor="surname" className="block font-bold text-gray-700">{t('profila.abizena')}</label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={user.surname}
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
                  <label htmlFor="hometown" className="block font-bold text-gray-700">{t('profila.jaioterria')}</label>
                  <input
                    type="text"
                    id="hometown"
                    name="hometown"
                    value={user.hometown}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label htmlFor="telephone" className="block font-bold text-gray-700">{t('profila.telefonoa')}</label>
                  <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    value={user.telephone}
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
