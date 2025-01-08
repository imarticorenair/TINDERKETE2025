import React, { useEffect, useState } from "react";
import Nav from "./Navbar.js";
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
        <div>
            <Nav />
            <h1>Tournaments</h1>
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Price</th>
                        <th>Max Participants</th>
                        <th>Location ID</th>
                        <th>Created At</th>
                        <th>Updated At</th>
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
                                <td>{tournament.id}</td>
                                <td>{tournament.title}</td>
                                <td>{tournament.description}</td>
                                <td>{tournament.date}</td>
                                <td>{tournament.time}</td>
                                <td>{tournament.price}</td>
                                <td>{tournament.max_participants}</td>
                                <td>{tournament.location_id}</td>
                                <td>{new Date(tournament.created_at).toLocaleString()}</td>
                                <td>{new Date(tournament.updated_at).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <Footer />
        </div>
    );
};

export default TxapelketakAdmin;
