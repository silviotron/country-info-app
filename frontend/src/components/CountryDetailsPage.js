import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CountryDetailsPage.css';

const CountryDetailsPage = () => {
    const { countryName } = useParams();
    const [countryInfo, setCountryInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/info?name=${countryName}`)
            .then(response => {
                if (!response.ok) {
                    navigate('/');
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setCountryInfo(data))
            .catch(error => console.error('Error fetching country info:', error));
    }, [countryName, navigate]);

    if (!countryInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="country-details-container">
            <h1>{countryInfo.name && countryInfo.name.common}</h1>

            {/* General Information */}
            <section>
                <h2>General Information</h2>
                <p>Capital: {countryInfo.capital && countryInfo.capital[0]}</p>
                <p>Population: {countryInfo.population}</p>
            </section>

            {/* Geographical Data */}
            <section>
                <h2>Geographical Data</h2>
                <p>Area: {countryInfo.area} km²</p>
                <p>Borders: {countryInfo.borders && countryInfo.borders.join(', ')}</p>
            </section>

            {/* Languages */}
            <section>
                <h2>Languages</h2>
                <p>{countryInfo.languages && Object.values(countryInfo.languages).join(', ')}</p>
            </section>

            {/* Links */}
            <section>
                <h2>Links</h2>
                <p>
                    Google Maps:{' '}
                    <a href={countryInfo.maps && countryInfo.maps.googleMaps} target="_blank" rel="noopener noreferrer">
                        View on Google Maps
                    </a>
                </p>
                <p>
                    OpenStreetMaps:{' '}
                    <a href={countryInfo.maps && countryInfo.maps.openStreetMaps} target="_blank" rel="noopener noreferrer">
                        View on OpenStreetMaps
                    </a>
                </p>
            </section>

            {/* Flag */}
            <section>
                <h2>Flag</h2>
                <img src={countryInfo.flags && countryInfo.flags.svg} alt={`Flag of ${countryInfo.name && countryInfo.name.common}`} />
            </section>

        </div>
    );
};

export default CountryDetailsPage;