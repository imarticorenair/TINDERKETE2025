import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Erregistratu';
import ErabiltzaileakAdmin from './ErabiltzaileakAdmin';
import ErabiltzaileaSortu from './ErabiltzaileaSortu';
import ErabiltzaileakEditatu from './ErabiltzaileakEditatu';
import ErreserbakForm from './ErreserbakForm';
import TestPage from './TestPage'; 
import Txapelketak from './Txapelketak'; 
import Produktuak from './Produktuak';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Hasiera from './Hasiera';
import PartidoakCard from './PartidoakCard'; 
import PerfilaIkusi from './PerfilaIkusi'; 
import Kontaktu from './Kontaktuacomp';
import MapaLista from './MapaLista';
import TxapelketaSortu from './TxapelketaSortu';
import TxapelketakAdmin from './TxapelketakAdmin';
import TxapelketaEditatu from './TxapelketaEditatu';
import Txapelketakkudeatu from './TxapelketakKudeatu';
import NavbarAdmin from './NavbarAdmin';
import HasieraAdmin from './HasieraAdmin';
import MapaListaSortu from './MapaListaSortu';



function App() {
  // Verifica si es la primera vez que se abre la página
  if (!localStorage.getItem('firstVisit')) {
    // Elimina los ítems y marca que ya se abrió
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('email');
    localStorage.setItem('firstVisit', 'true');
  }

  return (
    <Router>
      {/* Rutas */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/erabiltzaileakAdmin" element={<ErabiltzaileakAdmin />} />  
        <Route path="/erabiltzaileaSortu" element={<ErabiltzaileaSortu />} />  
        <Route path="/erabiltzaileakEditatu/:id" element={<ErabiltzaileakEditatu />} />  
        <Route path="/erreserbak" element={<ErreserbakForm />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/txapelketak" element={<Txapelketak />} /> 
        <Route path="/produktuak" element={<Produktuak />} /> 
        <Route path="/" element={<Hasiera />} />
        <Route path="/partidoakCard" element={<PartidoakCard />} />
        <Route path="/kontaktua" element={<Kontaktu />} />
        <Route path="/mapalista" element={<MapaLista />} />
        <Route path="/txapelketasortu" element={<TxapelketaSortu />} />  
        <Route path="/txapelketakAdmin" element={<TxapelketakAdmin />} /> 
        <Route path="/txapelketakAdmin/edit/:id" element={<TxapelketaEditatu />} />
        <Route path="/perfila" element={<PerfilaIkusi />} />  
        <Route path="/navbaradmin" element={<NavbarAdmin />} />  
        <Route path="/hasieraadmin" element={<HasieraAdmin />} />  
        <Route path="/mapalistasortu" element={<MapaListaSortu />} />  
        <Route path="/txapelketakkudeatu" element={<Txapelketakkudeatu />} /> 
      </Routes>
    </Router>
  );
}

export default App;