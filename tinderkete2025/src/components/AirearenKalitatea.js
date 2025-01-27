import React, { useState } from "react";
import Nav from "./Navbar.js";
import Footer from "./Footer.js";
import { useTranslation } from "react-i18next";

const AirQualityList = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [countyId, setCountyId] = useState("01");
  const [startDate, setStartDate] = useState("2023-12-31T00:00"); 
  const [endDate, setEndDate] = useState("2023-12-31T23:59");
  const [lang, setLang] = useState("SPANISH");

  const counties = [
    { id: "01", name: "Araba" },
    { id: "20", name: "Bizkaia" },
    { id: "48", name: "Gipuzkoa" },
  ];

  const fetchAirQualityData = async () => {
    setLoading(true); 
    try {
      const encodedStartDate = encodeURIComponent(startDate);
      const encodedEndDate = encodeURIComponent(endDate);

      const url = `https://api.euskadi.eus/air-quality/measurements/hourly/counties/${countyId}/from/${encodedStartDate}/to/${encodedEndDate}?lang=SPANISH`;

      console.log("Generated URL:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result); 
    } catch (error) {
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  const handleFetchData = () => {
    fetchAirQualityData(); 
  };

  if (loading)
    return <p className="text-center text-gray-600">{t("loading")}</p>;

  if (error)
    return (
      <p className="text-center text-red-500">
        {t("error")}: {error}
      </p>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Nav /> 
      <div className="container mx-auto flex-grow px-4 py-8">
        {" "}
        
        <h1 className="text-2xl font-bold text-center mb-6 mb-5">
          {t("airearenKalitatea.titulua")}
        </h1>
        
        <div className="mb-4 text-center">
          <label className="mr-2 mb-2">{t("airearenKalitatea.county")}</label>
          <select
            value={countyId}
            onChange={(e) => setCountyId(e.target.value)}
            className="border px-4 py-2 rounded-md"
          >
            {counties.map((county) => (
              <option key={county.id} value={county.id}>
                {county.name}
              </option>
            ))}
          </select>
          <br />
          <label className="mr-2 mb-2 mt-2">
            {t("airearenKalitatea.start_date")}
          </label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-4 py-2 rounded-md mb-4 mt-3"
          />
          <br />
          <label className="mr-2">{t("airearenKalitatea.end_date")}</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />
          <br />
          <br />
          <button
            onClick={handleFetchData}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
          >
            {t("airearenKalitatea.fetch_data")}
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left ">
                  {t("airearenKalitatea.parametroa")}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left ">
                  {t("airearenKalitatea.balorea")}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {t("airearenKalitatea.unitatea")}
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  {t("airearenKalitatea.aire_kalitatea")}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <React.Fragment key={index}>
                  
                  {entry.station.map((station) =>
                    station.measurements.map((measurement, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2">
                          {measurement.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {measurement.value}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {measurement.unit}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {measurement.airquality
                            ? measurement.airquality
                            : "--"}
                        </td>
                      </tr>
                    ))
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AirQualityList;
