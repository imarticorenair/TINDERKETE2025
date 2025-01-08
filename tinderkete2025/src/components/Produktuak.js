import React, { useState } from 'react';
import ProductCard from './ProductCard'; 
import entrenatzailea from '../images/oihanEntrenatzailea.jpg'; 
import pala from '../images/pala.jpg'; 
import pilotak from '../images/frontenisPelotak.jpg'; 
import Nav from './Navbar.js'; 
import Footer from './Footer.js';
import { useTranslation } from "react-i18next";


const Produktuak = () => {
  const { t } = useTranslation();
   
  const products = [
    {
      name: t('produkt.entrenatzaile'),
      price: '25 h/',
      image: entrenatzailea,
    },
    {
      name: t('produkt.pala'),
      price: '30',
      image: pala,
    },
    {
      name: t('produkt.pelotak'),
      price: '10',
      image: pilotak,
    },
  ];
  // Estado para controlar los comentarios de los usuarios (simplificado)
  const [comments] = useState([
    { id: 1, text: "Itzelako zerbitzua, oso profesionala. Ohian entrenatzailea primerako tipoa da.", name: "Ana M." },
    { id: 2, text: "Las pelotas de frontenis son de buena calidad y a buen precio.", name: "Carlos G." },
    { id: 3, text: "Muy contento con la pala. La recomiendo totalmente.", name: "José L." }
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Nav />
      <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('produkt.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('produkt.header2')}</p>
        </div>
        {/* Produktuak */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* Komentarioak */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">{t('produkt.iritziak')}</h2>
          <div className="space-y-4 text-center">
            {comments.slice(0, 2).map((comment) => ( // bi komentario soilik erakutsi
              <div key={comment.id} className="text-sm text-gray-700">
                <p>"{comment.text}"</p>
                <p className="text-xs text-gray-500">- {comment.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Produktuak;
