import React, { useEffect, useState } from 'react';
import Nav from './Navbar.js';
import Footer from './Footer.js';
import { useTranslation } from "react-i18next";
const ipBack = process.env.REACT_APP_BASE_URL;


function MapaLista() {
  const { t } = useTranslation();

  const [mapaCreated, setMapaCreated] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMapa = async () => {
      try {
        const response = await fetch(`${ipBack}/api/lokalekuak/`);
        const result = await response.json();

        if (response.ok && result.success && Array.isArray(result.data)) {
          setMapaCreated(result.data);
        } else {
          setError('La respuesta de la API no contiene un arreglo de ubicaciones o hay un problema con los datos.');
          console.error('La respuesta de la API no contiene un arreglo de ubicaciones:', result);
        }
      } catch (error) {
        setError('Error al obtener datos de la API.');
        console.error('Error fetching locations:', error);
      }
    };

    fetchMapa();
  }, []);


  const [activeList, setActiveList] = useState('frontoiak');

  // Filtrar los mapas según el tipo activo (frontoiak o trinketeak)
  const frontoiak = mapaCreated ? mapaCreated.filter(item => item.type === 'frontoiak') : [];
  const trinketeak = mapaCreated ? mapaCreated.filter(item => item.type === 'trinketeak') : [];


  return (
    <div className="">
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('mapak.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('mapak.description')}</p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveList('frontoiak')}
            className={`px-6 py-2 rounded-lg ${activeList === 'frontoiak' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {t('mapak.frontoiak')}
          </button>
          <button
            onClick={() => setActiveList('trinketeak')}
            className={`px-6 py-2 rounded-lg ${activeList === 'trinketeak' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {t('mapak.trinketeak')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeList === 'frontoiak' ? frontoiak : trinketeak).map((item, index) => {
            // Reemplaza el zoom en la URL del iframe dinámicamente
            const updatedIframeSrc = item.iframe ? item.iframe.replace(/!4f\d+(\.\d+)?/, '!4f40') : '';


            return (
              <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                <iframe
                  src={updatedIframeSrc} // Usar la URL ajustada
                  className="w-full h-60 border-0"
                  title={item.name}
                ></iframe>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                  <a href={item.url || "#"} className="text-blue-500 mt-2 block">{t('mapak.google')}</a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default MapaLista;
