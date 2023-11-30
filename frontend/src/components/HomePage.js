import React, { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
    const [inputText, setInputText] = useState('');
    const [results, setResults] = useState([]);

    // Handle changes in input
    const handleInputChange = (event) => {
        const newText = event.target.value;
        setInputText(newText);

        // Call to endpoint with current text
        fetch(`http://localhost:5000/name?name=${newText}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setResults(data.names))
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Write here..."
                />
            </div>
            <div>
                {inputText && (
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                <a href={`https://www.ejemplo.com/${result}`} target="_blank" rel="noopener noreferrer">
                                    {result}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HomePage;