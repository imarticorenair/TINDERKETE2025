import React, { useState } from 'react';
import NavbarAdmin from './NavbarAdmin.js';
import Footer from '../Layout/Footer';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import { useTranslation } from "react-i18next";
import axios from 'axios';
const ipBack = process.env.REACT_APP_BASE_URL;

function MapaSortu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    iframe: "",
    url: "",
    img: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,  
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("iframe", formData.iframe);
    formDataToSend.append("url", formData.url);
    formDataToSend.append("img", formData.img);

    try {
      const response = await axios.post(
        `${ipBack}/api/lokalekuak`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      alert("Mapa ongi sortu da.");
      navigate('/mapakudeatu');
    } catch (error) {
      console.error("Errorea:", error);
      alert("Errorea gertatu da: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('mapakSortu.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('mapakSortu.subHeader')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Izena
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
              Mota
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value=" "> </option>
              <option value="frontoiak">{t('mapak.frontoiak')}</option>
              <option value="trinketeak">{t('mapak.trinketeak')}</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="iframe" className="block text-gray-700 font-bold mb-2">
              Iframe
            </label>
            <textarea
              id="iframe"
              name="iframe"
              value={formData.iframe}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="url" className="block text-gray-700 font-bold mb-2">
              URL
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="img" className="block text-gray-700 font-bold mb-2">
              IRUDIA
            </label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.files[0] })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sortu
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default MapaSortu;
