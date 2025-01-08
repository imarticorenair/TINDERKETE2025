import React from "react";
import Nav from "./Navbar.js";
import Footer from "./Footer.js";
import bat from "../images/LezoFrontoia.jpg";
import bi from "../images/Tinder-Emblem.png";
import hiru from "../images/urnietafrontoia.jpg";
import eskupilota from "../images/eskupilota.jpg";
import trinkete from "../images/trinkete.jpg";
import comingsoon from "../images/comingsoon.jpg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Hasiera() {
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Nav />

      {/* Main */}

      <section className="w-full relative bg-gradient-to-r from-blue-400 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-6 text-center animate-wiggle">
          <h1 className="text-6xl font-extrabold mb-6">MATCH, CHAT, WIN!</h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            {t('gutaz.main')}
          </p>
        </div>
      </section>


      {/* Section izenburu */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 animate-fade-right">{t('gutaz.section')}</h2>
          <p className="text-gray-600 mt-4 animate-fade-up">
            {t('gutaz.section2')}
          </p>
        </div>

        {/* Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Frontoia */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-up">
            <img
              src={bat}
              alt="Lezo Frontoia"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('gutaz.grid1')}</h3>
              <p className="text-gray-600">
                {t('gutaz.grid1-1')}
              </p>
            </div>
          </div>

          {/* Tinder */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-up">
            <div className="flex justify-center items-center bg-gradient-to-r from-pink-500 to-red-500 h-48">
              <img
                src={bi}
                alt="Tinder Emblem"
                className="w-32 h-32 object-contain rounded-full bg-white p-2"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('gutaz.grid2')}</h3>
              <p className="text-gray-600">
                {t('gutaz.grid2-2')}
              </p>
            </div>
          </div>

          {/* Trinketeak */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-up">
            <img
              src={trinkete}
              alt="Urnieta Frontoia"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('gutaz.grid4')}</h3>
              <p className="text-gray-600">
                {t('gutaz.grid4-4')}
              </p>
            </div>
          </div>

          {/* PRODUKTUAK */}

          <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-up">
            <img
              src={eskupilota}
              alt="Urnieta Frontoia"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('gutaz.grid5')}</h3>
              <p className="text-gray-600">
              {t('gutaz.grid5-5')}
              </p>
            </div>
          </div>

          {/* URNIETAKO FRONTOIA */}

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={hiru}
              alt="Urnieta Frontoia"
              className="w-full h-48 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t('gutaz.grid3')}</h3>
              <p className="text-gray-600">
                {t('gutaz.grid3-3')}
              </p>
            </div>
          </div>

          {/* COMING SOON */}

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={comingsoon}
              alt="Urnieta Frontoia"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>
      

      {/* Komunitatea */}
      <section className="bg-gradient-to-r from-indigo-800 to-blue-400 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t('gutaz.komunitatea')}</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            {t('gutaz.komunitatea2')}
          </p>
          <button
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium shadow hover:bg-gray-100 transition"
            onClick={() => navigate("/register")}
          >
            {t('gutaz.register')}
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Hasiera;
