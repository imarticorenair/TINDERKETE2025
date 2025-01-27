import React, { useState } from "react";
import NavbarAdmin from "./NavbarAdmin.js";
import Footer from "./Footer.js";
import { useTranslation } from "react-i18next"; 

function TxapelketaSortu() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAdmin />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Txapelketak Kudeatzeko Gunea</h1>
          <p className="text-xl mt-2 text-gray-600">Txapelketa berri bat sortu nahi izanezkero sakatu botoia!</p>
          <button className="p-2 bg-blue-600 text-white border border-white rounded-lg transition-all duration-200 ease-in-out hover:text-blue-600 hover:bg-white hover:border-blue-600">
            Sortu
          </button>
        </div>
      </div>


      <Footer />
    </div>
  );
}

export default TxapelketaSortu;
