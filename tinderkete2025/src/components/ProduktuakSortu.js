import React, { useState } from "react";
import NavbarAdmin from "./NavbarAdmin.js";
import Footer from "./Footer.js";

function ProduktuSortu() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
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

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAdmin />
      <div className="container mx-auto flex-grow px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Produktu Sortu</h1>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap -mx-4">
          {/* Formulario */}
          <div className="w-full lg:w-2/3 px-4 mb-8">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6 h-full">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Izena */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Produktuaren Izena</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Sartu produktuaren izena"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Kategoria */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Kategoria</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Sartu kategoria"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Prezioa */}
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
                {/* Stock */}
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Stock-a</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="Sartu stock-a"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Deskribapena */}
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
                {/* Irudia */}
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

          {/* Preview dinamikoa */}
          <div className="w-full lg:w-1/3 px-4">
            <div className="sticky top-4">
              <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {formData.name || "Produktuaren izena"}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {formData.category || "Kategoria"}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {formData.description || "Deskribapena"}
                </p>
                <p className="text-sm text-gray-800 font-bold">
                  {formData.price ? `${formData.price} €` : "Prezioa"}
                </p>
                <p className="text-sm text-gray-600">
                  {formData.stock ? `${formData.stock} unitate` : "Stock-a"}
                </p>
                <div className="mt-4">
                  <img
                    src={
                      formData.image ||
                      "https://via.placeholder.com/150?text=Irudi+faltan"
                    }
                    alt="Produktua"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProduktuSortu;
