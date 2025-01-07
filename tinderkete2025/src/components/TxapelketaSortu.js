import React, { useState } from "react";
import EventCard from "./EventCard";
import NavbarAdmin from "./NavbarAdmin.js";
import Footer from "./Footer.js";

function TxapelketaSortu() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    description: "",
    price: "",
    maxParticipants: "",
    image: "",
    participantImages: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const handleParticipantImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      participantImages: uploadedImages,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAdmin />
      <div className="container mx-auto flex-grow px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Txapelketa Sortu</h1>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap -mx-4">
          {/* Formulario */}
          <div className="w-full lg:w-2/3 px-4 mb-8">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6 h-full">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Título */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Izenburua</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Sartu txapelketaren izenburua"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Localización */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Kokalekua</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Sartu kokalekua"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Fecha */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Data</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Hora */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Ordua</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Descripción */}
                <div className="col-span-2">
                  <label className="block mb-1 text-gray-700">Deskribapena</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Sartu deskribapena"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Precio */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Prezioa (€)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Sartu prezioa"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Máximo de participantes */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Gehieneko Partehartzaileak</label>
                  <input
                    type="number"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    placeholder="Sartu gehienezko partehartzaile kopurua"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Imagen */}
                <div className="col-span-2">
                  <label className="block mb-1 text-gray-700">Irudia</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Preview dinámico */}
          <div className="w-full lg:w-1/3 px-4">
            <div className="sticky top-4">
              <EventCard
                title={formData.title || "Txapelketaren izenburua"}
                location={formData.location || "Kokalekua"}
                date={formData.date || "Data"}
                time={formData.time || "Ordua"}
                description={formData.description || "Deskribapena"}
                price={formData.price || "0"}
                participants={0} // Preview siempre muestra 0 participantes
                maxParticipants={formData.maxParticipants || "0"}
                image={
                  formData.image ||
                  "https://via.placeholder.com/150?text=Irudi+faltan"
                }
                participantImages={[]}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TxapelketaSortu;
