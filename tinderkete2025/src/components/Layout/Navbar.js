import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import logotxuri from "../../images/perfiltxuri.png";
import logout from "../../images/logout.png";
import { useTranslation } from "react-i18next";
import "../../i18n"; // i18n konfigurazioa
import logoImage from "../../images/1361728.png";
import axios from "axios";
const ipBack = process.env.REACT_APP_BASE_URL;
//const imgBack = process.env.IMG;



function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // hanburgesa menuaren egoera
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar egoera
  const location = useLocation(); // Path aktiboa jakiteko
  const navigate = useNavigate(); // logout egiterakoan

  const getActiveClass = (path) => {
    return location.pathname === path
      ? "bg-amber-500 rounded-md text-white"
      : "text-gray-300"; //Dagoen orrialdeko itxura
  };

  // Obtener datos del usuario desde localStorage
  const userData = JSON.parse(localStorage.getItem("user"));
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Verificar si es admin
  const email = userData ? userData.email : ""; // Obtener el email desde el localStorage
  const nombre = userData ? userData.name : "";
  const apellido = userData ? userData.surname : "";
  const img = userData ? userData.img : "";
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
    localStorage.removeItem("user"); 
    localStorage.removeItem("token"); 
    window.location.reload();
  };

  const { t, i18n } = useTranslation(); 

  const [activeLanguage, setActiveLanguage] = useState(
    localStorage.getItem("language") || i18n.language
  );

  useEffect(() => {
    i18n.changeLanguage(activeLanguage); 
    localStorage.setItem("language", activeLanguage); 

    const fetchErabiltzaile = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user")); 
        const id = userId.id;
        const response = await axios.get(
          `${ipBack}/api/getUser/${id}`
        );
        const Erabiltzaile = response.data.data;

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
          birth_date: formattedBirthDate,
          admin: Erabiltzaile.admin,
          aktibatua: Erabiltzaile.aktibatua,
        });
      } catch (err) {
        console.error("Error fetching Erabiltzaile:", err);
      }
    };

    fetchErabiltzaile();
  }, [activeLanguage]);

  const changeLanguage = (event) => {
    setActiveLanguage(event.target.value); 
  };

  //console.log('argazkia '+formData.img);

  return (
    <div className="sticky top-0 z-50 shadow-lg">
      
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 ${sidebarOpen ? "block" : "hidden"
          }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed z-50 top-0 left-0 w-64 bg-gray-800 text-white h-full transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform`}
      >
        <div className="p-4">
          
          {userData && email !== !isAdmin ? (
            <>
              
              <p className="text-center mb-4">
                <img
                  src={`${ipBack}/` + formData.img}
                  alt="logo"
                  className="mx-auto mb-2 w-18 h-18 object-contain rounded-full"
                />
                <h3 className="border border-gray-200 p-2 rounded-full bg-gray-50 text-gray-700">
                  {`${nombre} ${apellido}`} 
                </h3>
              </p>

              <hr />
              <Link
                to="/perfila"
                className="text-center nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                onClick={toggleSidebar}
              >
                <div className="flex justify-start items-center">
                  <img
                    src={`${ipBack}/` + formData.img}
                    className="w-8 h-8 mr-2" />
                  <h4 className="mt-2">{t("nav.sidebar1")}</h4>
                </div>
              </Link>
              <hr />
              
              <Link
                to="/login"
                className="text-center nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                onClick={handleLogout}
              >
                <div className="flex justify-start items-center">
                  <img src={logout} className="w-8 h-7 mr-2" />
                  <h4 className="mt-2">Logout</h4>
                </div>
              </Link>
            </>
          ) : (
            
            <Link
              to="/login"
              className="text-center nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
              onClick={toggleSidebar}
            >
              <div className="flex justify-start items-center">
                <img src={logout} className="w-8 h-7 mr-2" />
                <h4 className="mt-2">Login</h4>
              </div>
            </Link>
          )}
        </div>
      </div>

      
      <nav className="bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto flex  justify-center items-center p-4">
         
          <Link className="flex items-center" to="/">
            <img
              src={logo}
              alt="logo"
              className="w-auto max-w-16 h-auto max-h-16 mr-2 flame-effect rounded-full object-contain"
            />
          </Link>
          <h1 className="text-white font-bold text-3xl no-underline">
            Tinderkete
          </h1>

         
          <div className="lg:hidden">
            <button
              className="navbar-burger flex items-center text-blue-600 p-3"
              onClick={toggleMenu}
            >
              <svg
                className="block h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
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

          
          <div className="hidden lg:flex space-x-6 mt-3">
            <ul className="flex space-x-4 items-center">
              <li className={`nav-item ${getActiveClass("/")}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/"
                  onClick={closeMenu}
                >
                  {t("nav.nav1")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/erreserbak")}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/erreserbak"
                  onClick={closeMenu}
                >
                  {t("nav.nav2")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/txapelketak")}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/txapelketak"
                  onClick={closeMenu}
                >
                  {t("nav.nav3")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/PartidoakCard")}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/PartidoakCard"
                  onClick={closeMenu}
                >
                  {t("nav.nav4")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/MapaLista")}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/MapaLista"
                  onClick={closeMenu}
                >
                  {t("nav.nav5")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/kontaktua")}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/kontaktua"
                  onClick={closeMenu}
                >
                  {t("nav.nav7")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/airearenKalitatea")}`}>
                <Link
                  className="nav-link text-white py-2 px-4 hover:bg-gray-700 rounded-md"
                  to="/airearenKalitatea"
                  onClick={closeMenu}
                >
                  {t("nav.nav8")}
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

          
          <div
            className={`lg:hidden ${menuOpen ? "block" : "hidden"
              } relative flex-row text-center text-white p-4 top-full mt-2 w-[100%] rounded-lg active:transition active:duration-700 active:ease-in-out`}
          >
            <ul className="flex flex-col space-y-4">
              <li className={`nav-item ${getActiveClass("/")}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/"
                  onClick={closeMenu}
                >
                  {t("nav.nav1")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/perfila")}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/perfila"
                  onClick={closeMenu}
                >
                  {t("nav.nav2")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/chat")}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/chat"
                  onClick={closeMenu}
                >
                  {t("nav.nav3")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/PartidoakCard")}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/PartidoakCard"
                  onClick={closeMenu}
                >
                  {t("nav.nav4")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/MapaLista")}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/MapaLista"
                  onClick={closeMenu}
                >
                  {t("nav.nav5")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/produktuak")}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/produktuak"
                  onClick={closeMenu}
                >
                  {t("nav.nav6")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/kontaktua")}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/kontaktua"
                  onClick={closeMenu}
                >
                  {t("nav.nav7")}
                </Link>
              </li>
              <li className={`nav-item ${getActiveClass("/airearenKalitatea")}`}>
                <Link
                  className="nav-link text-white p-2 hover:bg-gray-700 rounded-md"
                  to="/airearenKalitatea"
                  onClick={closeMenu}
                >
                  {t("nav.nav8")}
                </Link>
              </li>
              <li>
                <button
                  className=""
                  onClick={toggleSidebar} 
                >
                  <img
                    src={formData.img ? `${ipBack}${formData.img}` : logoImage}
                    alt="Perfil"
                    className="w-12 h-12 rounded-full bg-amber-500 p-1 object-contain"
                  />
                </button>
              </li>
            </ul>
          </div>

          
          <button className="lg:block hidden ml-5" onClick={toggleSidebar}>
            <img
              src={formData.img ? `${ipBack}/${formData.img}` : logoImage}
              alt="Perfil"
              className="w-auto max-w-12 h-auto max-h-12 rounded-full bg-amber-500 p-1 object-contain"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
