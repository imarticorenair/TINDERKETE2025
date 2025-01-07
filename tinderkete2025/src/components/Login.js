import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { useTranslation } from "react-i18next";
import axios from 'axios'; // Necesitarás axios para hacer las solicitudes HTTP

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(''); // Para almacenar el error del correo
  const [passwordError, setPasswordError] = useState(''); // Para almacenar el error de la contraseña

  // Validación del correo electrónico
  const handleEmailValidation = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex básico para validar correos
    if (!value) {
      setEmailError(t('login.emailRequired')); // Mensaje cuando el campo está vacío
    } else if (!emailRegex.test(value)) {
      setEmailError(t('login.emailInvalid')); // Mensaje para formato incorrecto
    } else {
      setEmailError(''); // Sin errores si el correo es válido
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEmailValidation(email); // Validar el correo antes de continuar
  
    if (emailError || !password) {
      setPasswordError(t('login.passwordRequired')); // Error si la contraseña está vacía
      return; // Si hay errores, detener el envío
    }
  
    try {
      // Hacer la solicitud POST para validar las credenciales del usuario
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });
  
      const { user, token } = response.data;
  
      // Almacenar el token y el estado del usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));  // Almacenar los datos del usuario
  
      // Redirigir según el valor de 'admin' en la respuesta
      if (user.admin === 1) {
        navigate('/hasieraadmin'); // Redirige a la ruta de administrador
      } else {
        navigate('/'); // Redirige a la ruta de usuario regular
      }
    } catch (error) {
      // Manejar errores de la solicitud, como credenciales incorrectas
      if (error.response && error.response.data.errors) {
        setPasswordError(t('login.invalidCredentials')); // Mostrar mensaje de error
      } else {
        setPasswordError(t('login.somethingWentWrong'));
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header vacío para diseño */}
      <header className="bg-gray-800 py-4"></header>

      {/* Contenido principal */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">

          {/* Logo */}
          <div className="flex justify-center -mt-20 mb-6">
            <img src={logo} alt="Logo" className="h-24 w-24" />
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6">{t('login.loginTitle')}</h2>

          <form onSubmit={handleSubmit}>
            {/* Campo de correo electrónico */}
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('login.email')}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleEmailValidation(e.target.value); // Validar en tiempo real
                }}
                placeholder={t('login.emailHolder')}
                className={`border p-2 rounded-md focus:outline-none focus:ring-2 ${emailError ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            {/* Campo de contraseña */}
            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('login.password')}</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.passHolder')}
                className={`border p-2 rounded-md focus:outline-none focus:ring-2 ${passwordError ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            {/* Botón de enviar */}
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                {t('login.loginButton')}
              </button>
            </div>

            {/* Enlace de registro */}
            <div className="flex justify-center items-center mt-10">
              <p className="mr-2 text-sm text-gray-600">{t('login.noAccount')}</p>
              <button
                type="button"
                className="text-sm text-blue-600 cursor-pointer mb-3 hover:underline"
                onClick={() => navigate('/register')}
              >
                {t('login.register')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
