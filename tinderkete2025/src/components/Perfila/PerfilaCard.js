import React from 'react';

function PerfilaCard({ img, onImageChange }) {

  return (
    <div className="card shadow-sm">
      <img src={img} className="card-img-top product-img" alt="Perfil" />
      <div className="card-body">
        {/* <label htmlFor="image-upload" className="btn btn-primary w-full">
          Argazkia aldatu
        </label> */}
      </div>
    </div>
  );
}

export default PerfilaCard;
