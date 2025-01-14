import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Nav from './Navbar.js';
import Footer from './Footer.js';
import { useNavigate } from "react-router-dom";

function Erreserbak() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({ location: "", date: "", time: "" });

  useEffect(() => {
    // Check user login status
    const userEmail = localStorage.getItem("email");
    setIsLoggedIn(!!userEmail);

    // Fetch locations
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/lokalekuak/');
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setLocations(result.data);
        } else {
          console.error('Unexpected API response:', result);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    fetchLocations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowLoginMessage(true);
      return;
    }
    // TODO: Submit form logic
    console.log('Submitting form:', formData);
  };

  const handleLoginRedirect = () => navigate("/login");

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="container mx-auto flex-grow px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('erreserbak.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('erreserbak.description')}</p>
        </div>
        <div className="flex flex-wrap -mx-4">
          {/* Form */}
          <div className="w-full md:w-1/3 px-4 mb-8">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6">
              <h5 className="text-xl font-bold mb-6 text-center">{t('erreserbak.header')}</h5>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700">{t('erreserbak.location')}</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Sartu kokalekua"
                    list="locations-list"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <datalist id="locations-list">
                    {locations.map((location) => (
                      <option key={location.id} value={location.name} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">{t('erreserbak.date')}</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">{t('erreserbak.time')}</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  {t('erreserbak.submit')}
                </button>
              </form>
              {showLoginMessage && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                    <p className="text-red-600 mb-4">{t('erreserbak.notLoggedInMessage')}</p>
                    <button
                      onClick={handleLoginRedirect}
                      className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                      Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Reservations */}
          <div className="w-full md:w-2/3 px-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 border border-gray-200">
              <h5 className="text-xl font-bold mb-6 text-center">{t('erreserbak.yourReservations')}</h5>
              {/* TODO: Render user reservations here */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Erreserbak;
