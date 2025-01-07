import React from "react";
import NavbarAdmin from "./NavbarAdmin.js";
import Footer from "./Footer.js";
import { useTranslation } from "react-i18next";
import ezarpenak from '../images/ezarpenak.png';
import ezarpenak2 from '../images/ezarpenak2.png';
import ezarpenak3 from '../images/ezarpenak3.png';

function Hasiera() {
  const { t } = useTranslation(); 

  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <NavbarAdmin />

      {/* Main */}
      <div className="relative">
        <header className="relative flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-800 h-[35vh] md:h-[45vh] xl:h-[65vh]">
          <div className="absolute inset-0 flex flex-col md:flex-row justify-between items-center w-full">
            <div className="relative w-full md:w-1/3 h-full flex justify-center items-center">
              {/* Placeholder left */}
            </div>
            {/* Izenburua */}
            <div className="relative z-20 text-center p-4">
              <h1 className="font-boxing text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white animate-jump-in">
                <span className="bg-clip-text text-6xl text-transparent text-white">
                  {t('hasieraAdmin.header')}
                </span>
              </h1>
            </div>
            <div className="relative w-full md:w-1/3 h-full flex justify-center items-center">
              {/* Placeholder right */}
            </div>
          </div>
        </header>
      </div>

      {/* Section with images */}
      <section className="flex flex-wrap justify-center items-center w-full relative bg-white py-8">
        <div className="bg-blue-400 rounded-full p-4 w-24 md:w-32 lg:w-40 animate-fade-right animate-delay-300 mx-4 mb-4">
          <img src={ezarpenak2} alt="Ezarpenak 2" className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="bg-blue-600 rounded-full p-4 w-24 md:w-32 lg:w-40 animate-fade animate-delay-500 mx-4 mb-4">
          <img className="rounded-full" src={ezarpenak} alt="Ezarpenak" />
        </div>
        <div className="bg-blue-400 rounded-full p-4 w-24 md:w-32 lg:w-40 animate-fade-left animate-delay-300 mx-4 mb-4">
          <img src={ezarpenak3} alt="Ezarpenak 3" className="w-full h-full object-cover rounded-full" />
        </div>
      </section>    

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Hasiera;
