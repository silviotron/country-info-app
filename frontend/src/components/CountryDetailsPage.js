import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CountryDetailsPage.css";

const CountryDetailsPage = () => {
    const { countryCca3 } = useParams();
    const [countryInfo, setCountryInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/info?cca3=${countryCca3}`)
            .then((response) => {
                if (!response.ok) {
                    navigate("/");
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setCountryInfo(data))
            .catch((error) => console.error("Error fetching country info:", error));
    }, [countryCca3, navigate]);

    if (!countryInfo) {
        return <div className="country-details-container">Loading...</div>;
    } else {
        document.title = `Country info - ${countryInfo.name.common}`;
    }

    return (
        <div className="country-details-container">
            <h1>{countryInfo.name.common}</h1>

            {/* General Information */}
            <section>
                <h2>General Information</h2>
                <p>
                    <b>Population: </b>
                    {countryInfo.population || "No data"}
                </p>
                <p>
                    <b>Area: </b>
                    {countryInfo.area + " km²" || "No data"}
                </p>
                <p>
                    <b>Capital: </b>
                    {countryInfo.capital || "No data"}
                </p>
                <p>
                    <b>Borders: </b>
                    {countryInfo.borders && countryInfo.borders.length > 0
                        ? countryInfo.borders.join(", ")
                        : "No borders"}
                </p>
                <p>
                    <b>Languages: </b>
                    {Object.values(countryInfo.languages).join(", ") || "No data"}
                </p>
            </section>

            {/* Flag */}
            {countryInfo.flags && countryInfo.flags.svg && (
                <section>
                    <h2>Flag</h2>
                    <img
                        className="flag"
                        src={countryInfo.flags.svg}
                        alt={`Coat of arms of ${countryInfo.name && countryInfo.name.common
                            }`}
                    />
                </section>
            )}

            {/* Coat of Arms */}
            {countryInfo.coatOfArms && countryInfo.coatOfArms.svg && (
                <section>
                    <h2>Coat of arms</h2>
                    <img
                        src={countryInfo.coatOfArms.svg}
                        alt={`Coat of arms of ${countryInfo.name && countryInfo.name.common
                            }`}
                    />
                </section>
            )}

            {/* Links */}
            <section>
                <h2>Links</h2>
                <p>
                    <a
                        href={countryInfo.maps && countryInfo.maps.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Google Maps
                    </a>
                </p>
                <p>
                    <a
                        href={countryInfo.maps && countryInfo.maps.openStreetMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        OpenStreetMaps
                    </a>
                </p>
            </section>

            {/* Other Information */}
            <section>
                <h2>Other Information</h2>
                <p>
                    <b>Domains: </b>
                    {countryInfo.tld.join(", ") || "No data"}
                </p>
                <p>
                    <b>CCA2: </b>
                    {countryInfo.cca2 || "No data"}
                </p>
                <p>
                    <b>CCN3: </b>
                    {countryInfo.ccn3 || "No data"}
                </p>
                <p>
                    <b>CCA3: </b>
                    {countryInfo.cca3 || "No data"}
                </p>
                <p>
                    <b>CIOC: </b>
                    {countryInfo.cioc || "No data"}
                </p>
                <p>
                    <b>Independent: </b>
                    {countryInfo.independent ? "Yes" : "No"}
                </p>
                <p>
                    <b>Landlocked: </b>
                    {countryInfo.landlocked ? "Yes" : "No"}
                </p>
                <p>
                    <b>Status: </b>
                    {countryInfo.status || "No data"}
                </p>
                <p>
                    <b>UN member: </b>
                    {countryInfo.unMember ? "Yes" : "No"}
                </p>
                <p>
                    <b>Region: </b>
                    {countryInfo.region || "No data"}
                </p>
                <p>
                    <b>Subregion: </b>
                    {countryInfo.subregion || "No data"}
                </p>
                <p>
                    <b>Continents: </b>
                    {countryInfo.continents.join(", ") || "No data"}
                </p>
                <p>
                    <b>Demonym: </b>
                    {countryInfo.demonyms.eng.m || "No data"}
                </p>
                <p>
                    <b>Driving side: </b>
                    {countryInfo.car.side || "No data"}
                </p>
                <p>
                    <b>First day of week: </b>
                    {countryInfo.startOfWeek || "No data"}
                </p>
                <p>
                    <b>Timezones: </b>
                    {countryInfo.timezones.join(", ") || "No data"}
                </p>
            </section>
        </div>
    );
};

export default CountryDetailsPage;
