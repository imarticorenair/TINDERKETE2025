import React, { useState, useEffect } from "react";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ErabiltzaileaEditatu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    img: null,
    hometown: "",
    telephone: "",
    birth_date: "",
    admin: false,
    aktibatua: false,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchErabiltzaile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getUser/${id}`
        );
        const Erabiltzaile = response.data.data;

        // Format the birth_date to "yyyy-MM-dd"
        const formattedBirthDate = Erabiltzaile.birth_date
          ? new Date(Erabiltzaile.birth_date).toISOString().split("T")[0]
          : "";

        setFormData({
          name: Erabiltzaile.name,
          surname: Erabiltzaile.surname,
          email: Erabiltzaile.email,
          img: Erabiltzaile.img,
          hometown: Erabiltzaile.hometown,
          telephone: Erabiltzaile.telephone,
          birth_date: formattedBirthDate, // Use the formatted date here
          admin: Erabiltzaile.admin,
          aktibatua: Erabiltzaile.aktibatua,
        });
      } catch (err) {
        console.error("Error fetching Erabiltzaile:", err);
        setError("No se pudieron cargar los datos del torneo.");
      }
    };

    fetchErabiltzaile();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        formDataToSend.append(key, value);
      }
    });

    try {
      await axios.post(`http://localhost:8000/api/user/${id}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("Erabiltzailea eguneratu da!");
      setError("");
      setTimeout(() => navigate("/erabiltzaileakAdmin"), 2000); // Redirigir después de 2 segundos
    } catch (err) {
      console.error("Error updating user:", err);
      setError(err.response?.data?.message || "Errorea erabiltzailea eguneratzerakoan.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAdmin />
      <div className="container mx-auto flex-grow px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Erabiltzailea Editatu</h1>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6 h-full">
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleSubmit}
              >
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Izena</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Abizena</label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Irudia</label>
                  <input
                    type="file"
                    name="img"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Herria</label>
                  <input
                    type="text"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Telefonoa</label>
                  <input
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Jaiotze-data</label>
                  <input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block mb-1 text-gray-700">Admin</label>
                  <input
                    type="checkbox"
                    name="admin"
                    checked={formData.admin}
                    onChange={(e) =>
                      setFormData({ ...formData, admin: e.target.checked })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div className="col-span-2 md:col-span-1">
                    <label className="block mb-1 text-gray-700">Aktibatuta</label>
                    <input
                      type="checkbox"
                      name="aktibatua"
                      checked={formData.aktibatua}
                      onChange={(e) =>
                        setFormData({ ...formData, aktibatua: e.target.checked })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Eguneratu
                </button>
              </form>
              {successMessage && <div className="mt-4 text-center text-green-500">{successMessage}</div>}
              {error && <div className="mt-4 text-center text-red-500">{error}</div>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ErabiltzaileaEditatu;
