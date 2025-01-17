import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import logoImage from '../images/1361728.png';
import '../components/navar.css';
import logotxuri from '../images/perfiltxuri.png';
import logout from '../images/logout.png';
import { useTranslation } from "react-i18next";
import ane from '../images/ane.jpg';
import axios from "axios";
const ipBack = process.env.REACT_APP_BASE_URL;
//const imgBack = process.env.REACT_APP_IMAGES_URL;


function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false); // Estado del menú hamburguesa
  const [sidebarOpen, setSidebarOpen] = useState(false); // Estado del sidebar
  const location = useLocation(); // Para saber la ruta activa
  const navigate = useNavigate(); // Para redirigir al hacer logout
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


  const getActiveClass = (path) => {
    return location.pathname === path ? 'bg-amber-500 rounded-md text-white' : 'text-gray-300'; //Dagoen orrialdeko itxura
  };
  //const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Erabiltzailea admin baldin bada funtzionalitate bat geihago dago
  const email = localStorage.getItem('email'); // Emaila berifikatzen du

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Hanburguesa menua ireki itxi
  };

  const closeMenu = () => {
    setMenuOpen(false); // Hanburguesa menua itxi klik egitean link batean
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Sidebar ireki itxi
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("email");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("user"); // Eliminar el usuario del localStorage
    localStorage.removeItem("token"); // Eliminar el usuario del localStorage
    navigate('/');
  };

  // useEffect hizkuntza aldatzeko
  useEffect(() => {
    const fetchErabiltzaile = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")); // Parse the JSON string into an object
        const id = userId.id;
        const response = await axios.get(
          `${ipBack}/api/getUser/${id}`
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
  console.log('erab   ' + Erabiltzaile.img);

      } catch (err) {
        console.error("Error fetching Erabiltzaile:", err);
      }
    };
    
    fetchErabiltzaile();
  }, []);
  
  console.log('formdata   ' + formData.img);
  return (
    <div className="sticky top-0 z-50 shadow-lg">

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>
      <div className={`fixed z-50 top-0 left-0 w-64 bg-gray-800 text-white h-full transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
        <div className="p-4">
          <p className="text-center mb-4">
            <img 
              src={`${ipBack}/${formData.img}`}
             
            alt="logo" className="mx-auto mb-2 w-18 h-18 object-contain rounded-full" />
            <h3 className="border border-gray-200 p-2 rounded-full bg-gray-50 text-gray-700">Admin</h3>
          </p>

          <hr />

          {/* Logout */}
          <Link
            to="/login"
            className="text-center nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
            onClick={handleLogout}
          >
            <div className="flex justify-start items-center"><img src={logout} className="w-8 h-7 mr-2" /><h4 className="mt-2">Logout</h4></div>
          </Link>
        </div>
      </div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto flex flex-wrap lg:justify-between justify-center items-center p-4">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link className="flex items-center" to="/hasieraadmin">
              <img
                src={logo}
                alt="logo"
                className="w-auto max-w-16 h-auto max-h-16 mr-2 flame-effect rounded-full object-contain"
              />

            </Link>
            <h1 className="text-white font-bold text-3xl no-underline">Tinderkete</h1>
          </div>



          {/* Hanburguesa menua txikia */}
          <div className="lg:hidden">
            <button
              className="navbar-burger flex items-center text-blue-600 p-3"
              onClick={toggleMenu}
            >
              <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>

          {/* Pantaila handitako navbar */}
          <div className="hidden lg:flex space-x-6 mt-3">
            <ul className="flex space-x-4">

              <li className={`nav-item ${getActiveClass('/TxapelketaSortu')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/TxapelketakAdmin"
                  onClick={closeMenu}
                >Txapelketak Kudeatu
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/MapaLista')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/mapakudeatu"
                  onClick={closeMenu}
                >Mapak Kudeatu
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/ErabiltzaileakAdmin')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/erabiltzaileakAdmin"
                  onClick={closeMenu}
                >Erabiltzaileak Kudeatu
                </Link>
              </li>
            </ul>
          </div>

          {/* Hanburguesa menua pantaila txikitan */}
          <div
            className={`lg:hidden ${menuOpen ? 'block' : 'hidden'} relative flex-row text-center text-white p-4 top-full mt-2 w-[100%] rounded-lg active:transition active:duration-700 active:ease-in-out`}
          >
            <ul className="flex flex-col space-y-4 mx-auto">
              <li className={`nav-item ${getActiveClass('/txapelketak')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/txapelketasortu"
                  onClick={closeMenu}
                >
                  Txapelketak Kudeatu
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/MapaLista')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/mapalistasortu"
                  onClick={closeMenu}
                >
                  Mapak Kudeatu
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/MapaLista')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/erabiltzaileakAdmin"
                  onClick={closeMenu}
                >
                  Erabiltzaileak Kudeatu
                </Link>
              </li>
              <li>
                <button className="" onClick={toggleSidebar}>
                  <img
                    src={`${ipBack}/${formData.img}`}
                    alt="1361728"
                    className="w-12 h-12 rounded-full bg-amber-500 p-1 object-contain"
                  />
                </button>
              </li>

            </ul>

          </div>

          {/* Sidebar toggle */}
          <button className="lg:block hidden" onClick={toggleSidebar}>
            <img
              src={`${ipBack}/`+formData.img}
              //src={formData.img}
              alt="1361728"
              className="w-12 h-12 rounded-full bg-amber-500 p-1 object-contain"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;


