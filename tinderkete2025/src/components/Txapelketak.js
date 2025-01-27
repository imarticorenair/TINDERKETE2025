import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
// import urnietafrontoiaImg from "../images/urnietafrontoia.jpg";
// import lezoFrontoiaImg from "../images/LezoFrontoia.jpg";
// import zestoaFrontoiaImg from "../images/zestoafrontoia.jpg";
// import agi from '../images/agi.png';
// import p1 from '../images/pertsona1.jpg';
// import p2 from '../images/pertsona2.jpg';
import Nav from './Navbar.js';
import Footer from './Footer.js';
import { useTranslation } from "react-i18next";
const ipBack = process.env.REACT_APP_BASE_URL;

const Txapelketak = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const getImagePath = (imageName) => {
    try {
      
      return require(`../images/${imageName}`);
    } catch (err) {
      console.error("Error al cargar la imagen:", err);
     
      return require(`../images/comingsoon.jpg`);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${ipBack}/api/txapelketak-with-users`); 
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const result = await response.json(); 
        const formattedEvents = result.data.map(tournament => ({
          id: tournament.id,
          title: tournament.title, 
          location: tournament.location.name,
          date: tournament.date,
          time: tournament.time || "16:00",
          description: tournament.description || t('txapelketa1.description'),
          participants: tournament.participants_count || 0,
          maxParticipants: tournament.max_participants || 0,
          price: tournament.price || 0,
          image: tournament.location.img || "comingsoon.png",
          participantImages: tournament.users.map(user => user.img), 
        }));
        setEvents(formattedEvents); 
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los eventos:", err);
        setError("Error al cargar los eventos");
        setLoading(false);
      }
    };
    fetchEvents();
  }, [t]);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('txapelketa.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('txapelketa.header2')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="col-span-1">
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Txapelketak;
