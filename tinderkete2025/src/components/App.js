// TODO: dokumentaziyuan konponente bakoitzak zer itten dun azaldu
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Erregistratu';
import ErabiltzaileakAdmin from './Admin/ErabiltzaileakAdmin';
import ErabiltzaileaSortu from './Admin/ErabiltzaileaSortu';
import ErabiltzaileakEditatu from './Admin/ErabiltzaileakEditatu';
import ErreserbakForm from './Erreserbak/ErreserbakForm';
import TestPage from './TestPage'; 
import Txapelketak from './Txapelketa/Txapelketak'; 
import Produktuak from './Produktuak/Produktuak';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Hasiera from './Gutaz/Hasiera';
import PartidoakCard from './Partidoak/PartidoakCard'; 
import PerfilaIkusi from './Perfila/PerfilaIkusi'; 
import Kontaktu from './Kontaktua/Kontaktuacomp';
import MapaLista from './Mapak/MapaLista';
import TxapelketaSortu from './Admin/TxapelketaSortu';
import TxapelketakAdmin from './Admin/TxapelketakAdmin';
import TxapelketaEditatu from './Admin/TxapelketaEditatu';
import Txapelketakkudeatu from './Admin/TxapelketakKudeatu';
import NavbarAdmin from './Admin/NavbarAdmin';
import HasieraAdmin from './Admin/HasieraAdmin';
import MapaListaSortu from './Admin/MapaListaSortu';
import MapaKudeatu from "./Admin/MapaKudeatu";
import MapaEditatu from "./Admin/MapaEditatu";
import AirearenKalitatea from "./Airea/AirearenKalitatea";
import Estatistikak from "./Admin/Estatistikak";



function App() {
  
  if (!localStorage.getItem('firstVisit')) {
    
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('email');
    localStorage.setItem('firstVisit', 'true');
  }

  return (
    <Router>
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
        <Route path="/mapakudeatu" element={<MapaKudeatu />} /> 
        <Route path="/mapaeditatu/:id" element={<MapaEditatu />} /> 
        <Route path="/airearenKalitatea" element={<AirearenKalitatea />} /> 
        <Route path="/Estatistikak" element={<Estatistikak />} /> 
      </Routes>
    </Router>
  );
}

export default App;