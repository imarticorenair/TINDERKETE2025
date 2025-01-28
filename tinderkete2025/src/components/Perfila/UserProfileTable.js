import React from 'react';

const UserProfileTable = ({ user, onEditClick }) => {
  console.log("Datos que recibe UserProfileTable:", user);
  return (
    <div>
      <table className="rounded-lg min-w-full table-auto w-full max-w-4xl mx-auto bg-slate-50">
        <tbody>
          <tr className="border-b-4 border-gray-300">
            <td className="px-6 py-4 text-lg text-gray-700 font-bold whitespace-nowrap">Izen Abizenak</td>
            <td className="px-6 py-4 text-lg text-gray-600">{user?.name} {user?.surname}</td>
          </tr>
          <tr className="border-b-4 border-gray-300">
            <td className="px-6 py-4 text-lg text-gray-700 font-bold whitespace-nowrap">Email</td>
            <td className="px-6 py-4 text-lg text-gray-600">{user?.email}</td>
          </tr>
          <tr className="border-b-4 border-gray-300">
            <td className="px-6 py-4 text-lg text-gray-700 font-bold whitespace-nowrap">Jaiotze data</td>
            <td className="px-6 py-4 text-lg text-gray-600">{user?.birth_date}</td>
          </tr>
          <tr className="border-b-4 border-gray-300">
            <td className="px-6 py-4 text-lg text-gray-700 font-bold whitespace-nowrap">Jaioterria</td>
            <td className="px-6 py-4 text-lg text-gray-600">{user?.hometown}</td>
          </tr>
          <tr className="border-b-4 border-gray-300">
            <td className="px-6 py-4 text-lg text-gray-700 font-bold whitespace-nowrap">Telefonoa</td>
            <td className="px-6 py-4 text-lg text-gray-600">{user?.telephone}</td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary w-full mt-4" onClick={onEditClick}>
        Profila editatu
      </button>
    </div>
  );
};

export default UserProfileTable;
