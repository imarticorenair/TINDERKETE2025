import React, { useEffect, useState } from "react";
import Footer from "./Footer.js";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin.js";
const ipBack = process.env.REACT_APP_BASE_URL;

const ErabiltzaileakAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${ipBack}/getUser`);
        if (!response.ok) {
          throw new Error("Errorea");
        }
        const result = await response.json();
        setUsers(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleSortu = () => {

    navigate('/erabiltzaileaSortu');


  const handleEdit = (id) => {
    navigate(`/erabiltzaileakEditatu/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      // Llama al backend para actualizar user.aktibatua a 0
      const response = await fetch(`${ipBack}/deleteUser/${id}`, {
        method: "PATCH", // Usa el método adecuado según tu API (PATCH, PUT, POST)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aktibatua: 0 }),
      });

      if (!response.ok) {
        throw new Error("Errorea al desactivar el usuario.");
      }

      // Actualizar el estado en el frontend
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, aktibatua: 0 } : user
        )
      );
    } catch (err) {
      alert(`Errorea al desactivar el usuario: ${err.message}`);
    }
  };

  if (loading) {
    return <p className="text-center text-xl font-semibold">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;
  }

  // Filtrar solo los usuarios que tienen aktibatua = 1
  const filteredUsers = users.filter((user) => user.aktibatua === 1);

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarAdmin />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Erabiltzaileak</h1>
        <div>
          <button
            onClick={() => handleSortu()}
            className="flex justify-center mx-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Sortu
          </button>
        </div>
        <div className="overflow-x-auto shadow-md rounded-lg w-full my-4">
          <table className="min-w-full bg-white table-auto border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Izena</th>
                <th className="px-4 py-2">Abizena</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Argazkia</th>
                <th className="px-4 py-2">Herria</th>
                <th className="px-4 py-2">Telefonoa</th>
                <th className="px-4 py-2">Jaiotze data</th>
                <th className="px-4 py-2">Admin</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-gray-600">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Ezabatu
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">{user.id}</td>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.surname}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.img}</td>
                    <td className="px-4 py-2">{user.hometown}</td>
                    <td className="px-4 py-2">{user.telephone}</td>
                    <td className="px-4 py-2">{user.birth_date}</td>
                    <td className="px-4 py-2 text-center">{user.admin}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErabiltzaileakAdmin;
