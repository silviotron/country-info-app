import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [inputText, setInputText] = useState('');
    const [results, setResults] = useState([]);

    const handleInputChange = (event) => {
        const newText = event.target.value;
        setInputText(newText);

        fetch(`/name?name=${newText}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setResults(data.names))
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter' && results.length > 0) {
            window.location.href = `/countries/${results[0]}`;
        }
    };

    return (
        <div>
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
                    {results.map((result, index) => (
                        <li key={index}>
                            <Link to={`/countries/${result}`}>
                                {result}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePage;