import { useTranslation } from "react-i18next";
import React from 'react';

const UserProfileTable = ({ user, onEditClick }) => {
  console.log("Datos que recibe UserProfileTable:", user);
  const { t } = useTranslation();
  
  return (

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-lg p-6 shadow-md">
          <div className="space-y-4">
            {[ 
              { label: t("perfila.1"), value: `${user?.name} ${user?.surname}` },
              { label: "Email", value: user?.email, truncate: true },
              { label: t("perfila.2"), value: user?.birth_date },
              { label: t("perfila.3"), value: user?.hometown },
              { label: t("perfila.4"), value: user?.telephone },
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col sm:flex-row sm:justify-between border-b-4 border-gray-300 pb-2"
              >
                <span className="text-lg text-gray-700 font-bold sm:w-1/3">{item.label}</span>
                <span 
                  className={`text-lg text-gray-600 sm:w-2/3 ${item.truncate ? 'truncate' : ''}`}
                  style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <button className="btn btn-primary w-full mt-4" onClick={onEditClick}>
            {t("perfila.editatu")}
          </button>
        </div>
  );
};

export default UserProfileTable;
