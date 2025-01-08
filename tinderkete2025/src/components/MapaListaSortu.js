import React, { useState } from 'react';
import NavbarAdmin from './NavbarAdmin.js';
import Footer from './Footer.js';
import { useTranslation } from "react-i18next";

function MapaSortu() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    type: 'frontoiak', // Default type
    iframe: '',
    url: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mostrar un mensaje de éxito
    setSuccessMessage(t('mapak.success'));

    // Reiniciar el formulario
    setFormData({
      name: '',
      type: 'frontoiak',
      iframe: '',
      url: '',
    });
  };

  return (
    <div>
      <NavbarAdmin />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('mapakSortu.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('mapakSortu.subHeader')}</p>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6" role="alert">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              {t('mapakSortu.izena')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
              {t('mapakSortu.mota')}
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="frontoiak">{t('mapak.frontoiak')}</option>
              <option value="trinketeak">{t('mapak.trinketeak')}</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="iframe" className="block text-gray-700 font-bold mb-2">
              {t('mapakSortu.iframe')}
            </label>
            <textarea
              id="iframe"
              name="iframe"
              value={formData.iframe}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="url" className="block text-gray-700 font-bold mb-2">
              {t('mapakSortu.url')}
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              {t('mapakSortu.bidali')}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default MapaSortu;
