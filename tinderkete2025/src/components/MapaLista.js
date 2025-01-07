import React, { useState } from 'react';
import Nav from './Navbar.js';
import Footer from './Footer.js';
import { useTranslation } from "react-i18next";

function MapaLista() {
  const { t } = useTranslation(); 

  const frontoiak = [
    { name: 'Antigua', iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10345.314412364152!2d-2.006094752446477!3d43.31309128937382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51baa707632f93%3A0x8680d5efa9844049!2sAntiguako%20Frontoia%20-%20Front%C3%B3n%20del%20Antiguo!5e0!3m2!1ses!2ses!4v1732786583382!5m2!1ses!2ses', url: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0xd51baa707632f93:0x8680d5efa9844049?sa=X&ved=1t:8290&ictx=111' },
    { name: 'Altza', iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.991527068214!2d-1.9351077999999997!3d43.314436799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a550f90a838d%3A0x28566489181455d0!2sFront%C3%B3n%20Municipal%20de%20ALTZA!5e0!3m2!1ses!2ses!4v1732787281587!5m2!1ses!2ses', url: 'https://www.google.com/maps?ll=43.314437,-1.935108&z=14&t=m&hl=es&gl=ES&mapclient=embed&cid=2906621149491516880' },
    { name: 'Amara Zaharra', iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.01593288799!2d-1.9857721583862378!3d43.313925895451725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a555a4e1e139%3A0x276870686cb452de!2sFront%C3%B3n%20Amara!5e0!3m2!1ses!2ses!4v1732787728431!5m2!1ses!2ses', url: 'https://www.google.com/maps?ll=43.313926,-1.98475&z=14&t=m&hl=es&gl=ES&mapclient=embed&cid=2839643158859764446'},
    { name: 'Anoeta', iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.629975974815!2d-1.9757886000000002!3d43.3010701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51afee38af9b4d%3A0x5c0d81e6760b8468!2sFront%C3%B3n%20Municipal%20Atano%20III!5e0!3m2!1ses!2ses!4v1732788161374!5m2!1ses!2ses', url: 'https://www.google.com/maps?ll=43.30107,-1.975789&z=14&t=m&hl=es&gl=ES&mapclient=embed&cid=6633100653009536104'},
    { name: 'Sagues', iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.3893105785983!2d-1.9707720999999998!3d43.32704189999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51a5089d050a1d%3A0x6e318e5e5f818bb0!2sSagues%20Pilotalekua%2FFront%C3%B3n%20Sag%C3%BCes!5e0!3m2!1ses!2ses!4v1732788547745!5m2!1ses!2ses', url: 'https://www.google.com/maps/place/Sagues+Pilotalekua%2FFront%C3%B3n+Sag%C3%BCes/@43.327042,-1.970772,6561m/data=!3m1!1e3!4m6!3m5!1s0xd51a5089d050a1d:0x6e318e5e5f818bb0!8m2!3d43.3270419!4d-1.9707721!16s%2Fg%2F11lm2_0xdq?hl=es&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D'},
    { name: 'Loiola', iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.1020884775007!2d-1.9650276999999996!3d43.3121223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51af8a72ed634d%3A0x768c2263a39256a0!2sFront%C3%B3n%20Municipal%20de%20Loiola!5e0!3m2!1ses!2ses!4v1732788654614!5m2!1ses!2ses', url: 'https://www.google.com/maps/place/Front%C3%B3n+Municipal+de+Loiola/@43.312122,-1.965028,6562m/data=!3m1!1e3!4m6!3m5!1s0xd51af8a72ed634d:0x768c2263a39256a0!8m2!3d43.3121223!4d-1.9650277!16s%2Fg%2F11c6j2c6fh?hl=es&entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D'}
  ];

  const trinketeak = [
    { name: 'Lasarte', iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.058367744465!2d-2.0200586999999994!3d43.27115299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51b16506069fd1%3A0xa72908fba774ae15!2sMirentxu%20Trinketea!5e0!3m2!1seu!2ses!4v1732814539894!5m2!1seu!2ses', url: 'https://www.google.com/maps?ll=43.271153,-2.020059&z=14&t=m&hl=eu&gl=ES&mapclient=embed&cid=12045168555318357525'},
    { name: 'Igara', iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2903.6809573784603!2d-2.0144843999999997!3d43.3000026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51b06e5009e285%3A0xaac86f3b136e557c!2sIbaeta%20Padel%20Trinketea!5e0!3m2!1seu!2ses!4v1732814582015!5m2!1seu!2ses', url: 'https://www.google.com/maps?ll=43.300003,-2.014484&z=14&t=m&hl=eu&gl=ES&mapclient=embed&cid=12306208281309631868'},
    { name: 'Gasca - Anoeta', iframe: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2903.616810377154!2d-1.9793131238417299!3d43.30134577112105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDPCsDE4JzA0LjgiTiAxwrA1OCczNi4zIlc!5e0!3m2!1ses!2ses!4v1732814705358!5m2!1ses!2ses', url: 'https://www.google.com/maps?ll=43.301346,-1.979313&z=14&t=m&hl=es&gl=ES&mapclient=embed&q=43%C2%B018%2704.8%22N+1%C2%B058%2736.3%22W+43.301333,+-1.976750@43.3013333,-1.97675'},
    { name: 'Goizueta', iframe: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2903.616810377154!2d-1.9793131238417299!3d43.30134577112105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDPCsDE4JzA0LjgiTiAxwrA1OCczNi4zIlc!5e0!3m2!1ses!2ses!4v1732814705358!5m2!1ses!2ses', url: 'https://www.google.com/maps?ll=43.301346,-1.979313&z=14&t=m&hl=es&gl=ES&mapclient=embed&q=43%C2%B018%2704.8%22N+1%C2%B058%2736.3%22W+43.301333,+-1.976750@43.3013333,-1.97675'},
    { name: 'Irura', iframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.662466998167!2d-2.0680932233888334!3d43.16755138370486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd51b35868b6044f%3A0xe8416f373248b167!2sC.%20Zillar%2C%201%2C%2020270%20Irura%2C%20Guip%C3%BAzcoa!5e1!3m2!1ses!2ses!4v1734353371641!5m2!1ses!2ses" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade', url: 'https://www.google.com/maps/place/C.+Zillar,+1,+20270+Irura,+Guip%C3%BAzcoa/@43.1675514,-2.0680932,822m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd51b35868b6044f:0xe8416f373248b167!8m2!3d43.1675475!4d-2.0655183!16s%2Fg%2F11c43wp7h7?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D'}
  ];


  const [activeList, setActiveList] = useState('frontoiak');

  return (
    <div className="">
      <Nav />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">{t('mapak.header')}</h1>
          <p className="text-xl mt-2 text-gray-600">{t('mapak.description')}</p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button 
            onClick={() => setActiveList('frontoiak')}
            className={`px-6 py-2 rounded-lg ${activeList === 'frontoiak' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {t('mapak.frontoiak')}
          </button>
          <button 
            onClick={() => setActiveList('trinketeak')}
            className={`px-6 py-2 rounded-lg ${activeList === 'trinketeak' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            {t('mapak.trinketeak')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {(activeList === 'frontoiak' ? frontoiak : trinketeak).map((item, index) => {
    // Reemplaza el zoom en la URL del iframe dinámicamente
    const updatedIframeSrc = item.iframe.replace(/!4f\d+(\.\d+)?/, '!4f40'); // Zoom-a aldatzeko azken bi zenbakiekin jokatu behar da.
    
    return (
      <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={updatedIframeSrc} // Usar la URL ajustada
          className="w-full h-60 border-0"
          title={item.name}
        ></iframe>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
          <a href={item.url || "#"} className="text-blue-500 mt-2 block">{t('mapak.google')}</a>
        </div>
      </div>
    );
  })}
</div>

      </div>
      <Footer />
    </div>
  );
}

export default MapaLista;
