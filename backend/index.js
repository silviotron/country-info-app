const express = require('express')
const cors = require('cors');

const app = express()
const PORT = 5000

app.use(cors());
app.use(express.json())

app.get("/name", async (req, res) => {
    const { name } = req.query
    var endpoint = (name === undefined || name.trim() === "") ? `https://restcountries.com/v3.1/all?fields=name,` : `https://restcountries.com/v3.1/name/${name.trim()}?fields=name`

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    return [];
                } else {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
            }
            return response.json();
        })
        .then(response => {
            res.json({ "names": response.map(element => element.name.common) });
        })
        .catch(error => {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        });

})

app.get("/info", (req, res) => {
    const { name } = req.query;
    const endpoint = `https://restcountries.com/v3.1/name/${name.trim()}`;

    fetch(endpoint)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.length !== 1) {
                res.status(400).json({ error: 'Ambiguous request: Multiple countries found with the provided name' });
            } else {
                res.json(data[0]);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })