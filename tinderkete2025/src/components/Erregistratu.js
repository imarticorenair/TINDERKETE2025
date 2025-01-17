import React, { useState } from 'react';
import './style.css';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const ipBack = process.env.REACT_APP_BASE_URL;

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== passwordConfirmation) {
      alert('Pasahitzak ez dira bat etorri');
      return;
    }
  
    const userData = {
      name: name,
      surname: lastName,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      birth_date: birthdate,
    };
  
    try {
      console.log("bodu: "+JSON.stringify(userData));
        
        const response = await fetch(`${ipBack}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        
        const data = await response.json(); // Leer la respuesta solo una vez
        
      if (response.ok) {
        // Si la respuesta es exitosa
        alert('Erabiltzailea ongi sortu da.');
        navigate('/login');
      } else {
        // Si hubo un error
        alert('Errorea: ' + (data?.message || 'Daturenbat gaizki sartu da'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Errorea gertatu da');
    }
  };
  

  const { t } = useTranslation();

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

          <h2 className="text-2xl font-semibold text-center mb-6">{t('register.header')}</h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('register.izena')}</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('register.izenap')}
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="surname" className="block text-sm font-medium text-gray-700">{t('register.abizena')}</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="surname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={t('register.abizenap')}
                required
              />
            </div>

            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('register.email')}</label>
              <input
                type="email"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('register.emailp')}
                required
              />
            </div>

                      <div className="flex flex-col mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('register.pasahitza')}</label>
            <input
              type="password"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Vinculado al estado de password
              placeholder={t('register.pasahitzap')}
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="passwordc" className="block text-sm font-medium text-gray-700">{t('register.pasahitzaBaieztatu2')}</label>
            <input
              type="password"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="passwordc"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}  // Vinculado al estado de passwordConfirmation
              placeholder={t('register.pasahitzaBaieztatu1')}
              required
            />
          </div>


            <div className="flex flex-col mb-6">
              <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">{t('register.jaitozedata')}</label>
              <input
                type="date"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                {t('register.bidali')}
              </button>
            </div>

            <div className="flex justify-center items-center mt-10">
              <p className="mr-2 text-sm text-gray-600">{t('register.kontua')}</p>
              <button
                type="button"
                className="text-sm text-blue-600 cursor-pointer mb-3 hover:underline"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;