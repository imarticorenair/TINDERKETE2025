import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { useTranslation } from "react-i18next";
import axios from 'axios';
const ipBack = process.env.REACT_APP_BASE_URL;

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [accountError, setAccountError] = useState(''); // Para manejar el error de cuenta no activada
  
  const handleEmailValidation = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError(t('login.emailRequired'));
    } else if (!emailRegex.test(value)) {
      setEmailError(t('login.emailInvalid'));
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleEmailValidation(email); // Validar el correo antes de continuar
    
    if (emailError || !password) {
      setPasswordError(t('login.passwordRequired'));
      return;
    }

    try {
      const response = await axios.post(`${ipBack}/api/login`, {
        email,
        password,
      });

      const { user, token } = response.data;

      // Verificar si el usuario está activado
      if (user.aktibatua === 0) {
        alert(t('login.accountNotActivated')); // Mensaje si la cuenta no está activada
        return; // Detener el proceso de inicio de sesión
      }

      // Si todo está bien, almacenar el token y los datos del usuario
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir dependiendo del rol del usuario
      if (user.admin === 1) {
        navigate('/hasieraadmin');
      } else {
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setPasswordError(t('login.invalidCredentials'));
      } else {
        setPasswordError(t('login.somethingWentWrong'));
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gray-800 py-4"></header>
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
          <div className="flex justify-center -mt-20 mb-6">
            <img src={logo} alt="Logo" className="h-24 w-24" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">{t('login.loginTitle')}</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('login.email')}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleEmailValidation(e.target.value);
                }}
                placeholder={t('login.emailHolder')}
                className={`border p-2 rounded-md focus:outline-none focus:ring-2 ${emailError ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}`}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

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

            {/* Mostrar mensaje de error si la cuenta no está activada */}
            {accountError && <p className="text-red-500 text-sm mt-1">{accountError}</p>}

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                {t('login.loginButton')}
              </button>
            </div>

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