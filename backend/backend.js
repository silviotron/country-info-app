const express = require('express')
const axios = require('axios');

const app = express()
const PORT = 5000


app.use(express.json())

app.get("/name", async (req, res) => {
    try {
        const { name } = req.query

        // Axios is used to make the HTTP request.
        const externalApiResponse = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
        const responseData = externalApiResponse.data

        // TODO: iterate responseData and extract the name of each country.

        res.json(responseData) // Data sent.

    } catch (error) {
        console.error('Error:', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })