import React, { useState } from "react";
import { useTranslation } from "react-i18next";  // Importa el hook useTranslation
import Nav from './Navbar.js';
import Footer from './Footer.js';

function Erreserbak() {
  const { t } = useTranslation();  // Obtén la función t para usar las traducciones
  const [sportType, setSportType] = useState("");
  const [playerCount, setPlayerCount] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [reservations, setReservations] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReservation = {
      sportType,
      playerCount,
      location,
      time,
      isPublic,
    };
    setReservations([...reservations, newReservation]);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="container mx-auto flex-grow px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('erreserbak.header')}</h1>  {/* Usando t() para las traducciones */}
          <p className="text-xl mt-2 text-gray-600">{t('erreserbak.description')}</p> {/* Usando t() para las traducciones */}
        </div>
        <div className="flex flex-wrap -mx-4">

          {/* Form Card */}
          <div className="w-full md:w-1/3 px-4 mb-8 ">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6">
              <h5 className="text-xl font-bold mb-6 text-center">{t('erreserbak.header')}</h5> {/* Usando t() para las traducciones */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-700">{t('erreserbak.sportType')}</label> {/* Usando t() para las traducciones */}
                  <select
                    value={sportType}
                    onChange={(e) => setSportType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">---</option>
                    <option value="Trinketea">Trinketea</option>
                    <option value="Frontoia">Frontoia</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">{t('erreserbak.playerCount')}</label> {/* Usando t() para las traducciones */}
                  <input
                    type="number"
                    value={playerCount}
                    onChange={(e) => setPlayerCount(e.target.value)}
                    placeholder={t('erreserbakplayerCount')}  
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">{t('erreserbak.location')}</label> {/* Usando t() para las traducciones */}
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t('erreserbak.location')}  
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700">{t('erreserbak.time')}</label> {/* Usando t() para las traducciones */}
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={() => setIsPublic(!isPublic)}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-400"
                  />
                  <label className="ml-2 text-gray-700">{t('erreserbak.isPublic')}</label> {/* Usando t() para las traducciones */}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  {t('erreserbak.submit')}  {/* Usando t() para las traducciones */}
                </button>
              </form>
            </div>
          </div>

          {/* Reservations List */}
          <div className="w-full md:w-2/3 px-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 border border-gray-200">
              <h5 className="text-xl font-bold mb-6 text-center">{t('erreserbak.yourReservations')}</h5> {/* Usando t() para las traducciones */}
              <ul className="space-y-4">
                {reservations.map((reservation, index) => (
                  <li key={index} className="p-4 border-b border-gray-200">
                    <strong className="text-lg">{reservation.sportType}</strong>
                    <p className="text-gray-600">{reservation.playerCount} {t('erreserbak.playerCount')}</p>  {/* Usando t() para las traducciones */}
                    <p className="text-gray-600">{reservation.location} - {reservation.time}</p>
                    <p className="text-gray-700">
                      {reservation.isPublic ? t('erreserbakpublic') : t('erreserbakprivate')} {/* Usando t() para las traducciones */}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Erreserbak;
