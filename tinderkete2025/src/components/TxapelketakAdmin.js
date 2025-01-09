import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin.js";
import Footer from "./Footer.js";
import { useNavigate } from "react-router-dom";

const TxapelketakAdmin = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/txapelketak");
                if (!response.ok) {
                    throw new Error("Error fetching tournaments");
                }
                const result = await response.json();
                setTournaments(result.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTournaments();
    }, []);

    const handleEdit = (id) => {
        navigate(`/txapelketakAdmin/edit/${id}`);
    };

    if (loading) {
        return <p>Loading tournaments...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavbarAdmin />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Erabiltzaileak</h1>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white table-auto border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-4 py-2"></th>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Max Participants</th>
                                <th className="px-4 py-2">Location ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tournaments.length === 0 ? (
                                <tr>
                                    <td colSpan="11" style={{ textAlign: "center" }}>
                                        No tournaments found.
                                    </td>
                                </tr>
                            ) : (
                                tournaments.map((tournament) => (
                                    <tr key={tournament.id}>
                                        <td>
                                            <button onClick={() => handleEdit(tournament.id)}>
                                                Edit
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 text-center">{tournament.id}</td>
                                        <td className="px-4 py-2 text-center">{tournament.title}</td>
                                        <td className="px-4 py-2 text-center">{tournament.description}</td>
                                        <td className="px-4 py-2 text-center">{tournament.date}</td>
                                        <td className="px-4 py-2 text-center">{tournament.time}</td>
                                        <td className="px-4 py-2 text-center">{tournament.price}</td>
                                        <td className="px-4 py-2 text-center">{tournament.max_participants}</td>
                                        <td className="px-4 py-2 text-center">{tournament.location_id}</td>
                                        <td className="px-4 py-2 text-center">{new Date(tournament.created_at).toLocaleString()}</td>
                                        <td className="px-4 py-2 text-center">{new Date(tournament.updated_at).toLocaleString()}</td>
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

export default TxapelketakAdmin;
