import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
const ipBack = process.env.REACT_APP_BASE_URL;

function EventCard({
  id,
  title,
  location,
  date,
  time,
  description,
  price,
  participants,
  maxParticipants,
  image,
  participantImages,
}) {
  const { t } = useTranslation();
  const [showLoginMessage, setShowLoginMessage] = useState(false); // Para controlar la visibilidad del modal

  const handleButtonClick = async (tournamentId) => {
    console.log(tournamentId);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Si no hay token, muestra el modal
        setShowLoginMessage(true);
        return; // No continuar con la acción
      }

      const response = await fetch(`${ipBack}/api/tournaments/${tournamentId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errorea erregistratzean");
      }

      const data = await response.json();
      alert(`Erregistroa ongi egin da: ${data.message}`);
      window.location.reload();
    } catch (error) {
      console.error("Errorea erregistratzean:", error);
      alert(error.message);
    }
  };

  const handleLoginRedirect = () => {
    // Redirigir al login
    window.location.href = "/login"; 
    setShowLoginMessage(false); // Cerrar el modal
  };

  const handleBackRedirect = () => {
    // Redirigir a la página de inicio
    window.location.href = "/txapelketak";
    setShowLoginMessage(false); // Cerrar el modal
  };

  return (
    <div>
      <div className="card shadow-lg rounded-lg overflow-hidden">
        <img
          src={image}
          className="w-full h-64 object-cover"
          alt={`${title}`}
        />
        <div className="p-4">
          <h5 className="text-xl font-semibold mb-2">{title}</h5>
          <p className="text-sm text-gray-600">
            <strong>{location}</strong> - {date} at {time}
          </p>
          <p className="text-sm text-gray-800 mb-2">{description}</p>

          <p className="text-sm text-gray-700 mb-4">
            <strong>{t('eventcard.prezioa')}</strong> {price}€ <br />
            <strong>{t('eventcard.jokalariak')}</strong> {participants}/{maxParticipants}
          </p>

          <div className="mb-3">
            <strong className="block text-sm">{t('eventcard.partaideak')}</strong>
            <div className="flex -space-x-2">
              {participantImages.length > 0 ? (
                participantImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Participant ${index + 1}`}
                    className="rounded-full border-2 border-white w-10 h-10"
                  />
                ))
              ) : (
                <p className="text-gray-600">{t('eventcard.noParticipants')}</p>
              )}
            </div>
          </div>

          <button
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            onClick={() => handleButtonClick(id)}
          >
            {t('eventcard.apuntatu')}
          </button>
        </div>
      </div>

      {/* Modal para mostrar cuando no hay token */}
      {showLoginMessage && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-red-600 mb-4">{t('erreserbak.notLoggedInMessage')}</p>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleLoginRedirect}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Login
              </button>
              <button
                onClick={handleBackRedirect}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                {t('erreserbak.itzuli')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventCard;
