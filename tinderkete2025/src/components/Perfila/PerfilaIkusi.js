import React, { useState, useEffect } from 'react';
import PerfilaCard from './PerfilaCard.js';
import Nav from '../Layout/Navbar.js';
import Footer from '../Layout/Footer.js';
import UserProfileTable from './UserProfileTable';
import { useTranslation } from "react-i18next";
import axios from "axios";
const ipBack = process.env.REACT_APP_BASE_URL;
const imgBack = process.env.IMG;

const Perfila = () => {
  const { t } = useTranslation();

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const [user, setUser] = useState({
    img: "",
    name: "",
    surname: "",
    email: "",
    birth_date: "",
    hometown: "",
    telephone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    console.log("userId recibido:", userId);
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${ipBack}/api/getUser/${userId}`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUser();
  }, [userId]);

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

    const formData = new FormData();

    formData.append("name", user.name);
    formData.append("surname", user.surname);
    formData.append("email", user.email);
    formData.append("hometown", user.hometown);
    formData.append("birth_date", user.birth_date);
    formData.append("telephone", user.telephone);
    if (user.img) {
      formData.append("img", user.img);
    }

    try {
      const response = await axios.post(`${ipBack}/api/user/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Actualiza los datos del usuario en el estado local
      setUser(response.data.data);  // Aquí actualizas el estado con la respuesta de la API
      alert('Perfil actualizado con éxito');
      window.location.reload();
      
    } catch (error) {
      console.error('Error al actualizar los datos:', error.response?.data || error.message);
      alert(`Error al actualizar: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    console.log('User aldaketa', user);
  }, [user]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setUser((prevUser) => ({
      ...prevUser,
      img: selectedImage,
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

                <div>
                  <label htmlFor="img" className="block font-bold text-gray-700">Irudia</label>
                  <input
                    type="file"
                    id="img"
                    name="img"
                    onChange={handleImageChange}
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
