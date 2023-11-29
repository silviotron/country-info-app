const express = require('express')

const app = express()
const PORT = 5000


app.use(express.json())

app.get("/name", async (req, res) => {
    const { name } = req.query
    console.log(name === undefined || name.trim() === "")
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


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })