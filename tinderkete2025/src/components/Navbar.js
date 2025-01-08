import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import agi from '../images/agi.png';
import tinder from '../images/Tinder-Emblem.png';
import logoImage from '../images/1361728.png';
import '../components/navar.css';
import logotxuri from '../images/perfiltxuri.png';
import logout from '../images/logout.png';
import { useTranslation } from "react-i18next";
import '../i18n'; // i18n konfigurazioa

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // hanburgesa menuaren egoera
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar egoera
  const location = useLocation(); // Path aktiboa jakiteko
  const navigate = useNavigate(); // logout egiterakoan

  const getActiveClass = (path) => {
    return location.pathname === path ? 'bg-amber-500 rounded-md text-white' : 'text-gray-300'; //Dagoen orrialdeko itxura
  };
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Erabiltzailea admin baldin bada funtzionalitate bat geihago dago
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
    localStorage.removeItem('email');
    localStorage.removeItem('isAdmin');
    navigate('/'); // Hasierako horria
  };
  const { t, i18n } = useTranslation(); // useTranslationen hooka erabiltzen du t eta i18n-ra konektatzeko

  // Hizkuntzaren estatu ofiziala, localStorage-etik hartzen du
  const [activeLanguage, setActiveLanguage] = useState(
    localStorage.getItem('language') || i18n.language
  );

  // useEffect hizkuntza aldatzeko
  useEffect(() => {
    i18n.changeLanguage(activeLanguage); // i18n hizkuntza aldatzen du
    localStorage.setItem('language', activeLanguage); // Hizkuntza localstoragen gordetzen du
  }, [activeLanguage]);

  // Hizkuntza aldatzeko funtzioa
  const changeLanguage = (event) => {
    setActiveLanguage(event.target.value); // activeLenguageren egoera aldatzen du
  };

  return (
    <div className="sticky top-0 z-50 shadow-lg">

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>
      <div className={`fixed z-50 top-0 left-0 w-64 bg-gray-800 text-white h-full transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform`}>
        <div className="p-4">

          {/* Verificar si es Oihan */}
          {email === 'oihanaginaga@gmail.com' ? (
            <>
              <p className="text-center mb-4">
                <img src={agi} alt="logo" className="mx-auto mb-2 w-18 h-18 object-contain rounded-full" />
                <h3 className="border border-gray-200 p-2 rounded-full bg-gray-50 text-gray-700">Oaginaga23</h3>
              </p>

              <hr />
              <Link
                to="/perfila"
                className="text-center nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                onClick={toggleSidebar}
              >
                <div className="flex justify-start items-center">
                  <img src={logotxuri} className="w-8 h-8 mr-2" />
                  <h4 className="mt-2">{t('nav.sidebar1')}</h4>
                </div>
              </Link>
              <hr />

              {/* Mostrar Txata solo si es Oihan */}
              <Link
                to="/contact"
                className="text-center nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                onClick={toggleSidebar}
              >
                <div className="flex justify-start items-center">
                  <img src={tinder} className="w-18 h-8 mr-2" />
                  <h4 className="mt-2">{t('nav.sidebar2')}</h4>
                </div>
              </Link>
              <hr />

              {/* Logout */}
              <Link
                to="/login"
                className="text-center nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                onClick={handleLogout}
              >
                <div className="flex justify-start items-center"><img src={logout} className="w-8 h-7 mr-2" /><h4 className="mt-2">Logout</h4></div>
              </Link>

            </>
          ) : (
            <>
              {/* Si no es Oihan ni Admin */}
              <p className="text-center mb-4">
                <img src={logotxuri} alt="logo" className="mx-auto mb-2 w-18 h-18 object-contain rounded-full" />
              </p>

              <hr />
              <Link
                to="/login"
                className="text-center nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                onClick={toggleSidebar}
              >
                <div className="flex justify-start items-center"><img src={logotxuri} className="w-8 h-8 mr-2" /><h4 className="mt-2">Login</h4></div>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto flex flex-wrap justify-center items-center p-4">
          {/* Logo */}
          <Link className="flex items-center" to="/">
            <img
              src={logo}
              alt="logo"
              className="w-auto max-w-16 h-auto max-h-16 mr-2 flame-effect rounded-full object-contain"
            />

          </Link>
          <h1 className="text-white font-bold text-3xl no-underline">Tinderkete</h1>

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
          <div className="text-center lg:hidden">
            <select
              id="language-select"
              value={activeLanguage}
              onChange={changeLanguage}
              className="p-1 bg-blue-600 rounded-lg"
            >
              <option value="en">EN</option>
              <option value="eu">EU</option>
            </select>
          </div>

          {/* Pantaila handitako navbar */}
          <div className="hidden lg:flex space-x-6 mt-3">
            <ul className="flex space-x-4 items-center">
              <li className={`nav-item ${getActiveClass('/')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/"
                  onClick={closeMenu}
                >
                  {t('nav.nav1')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/erreserbak')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/erreserbak"
                  onClick={closeMenu}
                >
                  {t('nav.nav2')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/txapelketak')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/txapelketak"
                  onClick={closeMenu}
                >
                  {t('nav.nav3')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/PartidoakCard')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/PartidoakCard"
                  onClick={closeMenu}
                >
                  {t('nav.nav4')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/MapaLista')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/MapaLista"
                  onClick={closeMenu}
                >
                  {t('nav.nav5')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/kontaktua')}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/kontaktua"
                  onClick={closeMenu}
                >
                  {t('nav.nav7')}
                </Link>
              </li>
              <li>
                <div className="text-center my-4 items-center">
                  <select
                    id="language-select"
                    value={activeLanguage}
                    onChange={changeLanguage}
                    className="p-1 bg-blue-600 rounded-lg"
                  >
                    <option value="en">English</option>
                    <option value="eu">Euskara</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>

          {/* Hanburguesa menua pantaila txikitan */}

          <div
            className={`lg:hidden ${menuOpen ? 'block' : 'hidden'} relative flex-row text-center text-white p-4 top-full mt-2 w-[100%] rounded-lg active:transition active:duration-700 active:ease-in-out`}>
            <ul className="flex flex-col space-y-4">
              <li className={`nav-item ${getActiveClass('/')}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/"
                  onClick={closeMenu}
                >
                  {t('nav.nav1')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/erreserbak')}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/erreserbak"
                  onClick={closeMenu}
                >
                  {t('nav.nav2')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/txapelketak')}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/txapelketak"
                  onClick={closeMenu}
                >
                  {t('nav.nav3')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/PartidoakCard')}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/PartidoakCard"
                  onClick={closeMenu}
                >
                  {t('nav.nav4')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/MapaLista')}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/MapaLista"
                  onClick={closeMenu}
                >
                  {t('nav.nav5')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/produktuak')}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/produktuak"
                  onClick={closeMenu}
                >
                  {t('nav.nav6')}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass('/kontaktua')}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/kontaktua"
                  onClick={closeMenu}
                >
                  {t('nav.nav7')}
                </Link>
              </li>
              <li>
                <button
                  className=""
                  onClick={toggleSidebar} // Asegúrate de que este evento abra el sidebar
                >
                  <img
                    src={logoImage}
                    alt="Perfil"
                    className="w-12 h-12 rounded-full bg-amber-500 p-1 object-contain"
                  />
                </button>
              </li>
            </ul>
          </div>
          {/* Sidebar toggle */}
          <button className="lg:block hidden ml-5" onClick={toggleSidebar}>
            <img
              src={logoImage}
              alt="1361728"
              className="w-auto max-w-12 h-auto max-h-12 rounded-full bg-amber-500 p-1 object-contain"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;


