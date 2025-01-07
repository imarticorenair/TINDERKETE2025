import React from 'react';
import Navbar from './Navbar'; 
import Footer from './Footer'; 

function TestPage() {
  return (
    <>
      <Navbar />

      <main className="container text-center mt-5">
        <h1>Bienvenido a la página de prueba</h1>
        <p>Esto es solo un ejemplo para visualizar el Navbar y el Footer.</p>
        <p>Aquí puedes añadir más contenido según lo necesites.</p>
      </main>

      <Footer />
    </>
  );
}

export default TestPage;
