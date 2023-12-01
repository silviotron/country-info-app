import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
    const [inputText, setInputText] = useState("");
    const [results, setResults] = useState([]);

    const handleInputChange = (event) => {
        const newText = event.target.value;
        setInputText(newText);

        fetch(`/name?name=${newText}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const mappedResults = data.names.map((result) => {
                    const countryCode = Object.keys(result)[0];
                    const countryName = result[countryCode];
                    return { [countryCode]: countryName };
                });
                setResults(mappedResults);
            })
            .catch((error) => console.error("Error fetching data:", error));
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === "Enter" && results.length > 0) {
            window.location.href = `/countries/${Object.keys(results[0])[0]}`;
        }
    };

    return (
        <div className="country-search-container">
            <div>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyPress={handleEnterKeyPress}
                    placeholder="Country name"
                />
            </div>
            <div>
                <ul>
                    {results.map((result, index) => {
                        const countryCode = Object.keys(result)[0];
                        const countryName = result[countryCode];
                        return (
                            <a key={index} href={`/countries/${countryCode}`}>
                                <li>{countryName}</li>
                            </a>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;
