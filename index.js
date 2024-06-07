const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware to enable CORS
app.use(cors());

// Endpoint to fetch news articles
app.get('/news', async (req, res) => {
  // Get the search query from the request query parameters
  const searchValue = req.query.q || 'suresh'; // Default to 'suresh' if no query is provided

  // Construct the API URL using the search query
  const url = `https://newsapi.org/v2/everything?q=${searchValue}&apiKey=1b631584230347caaedcc8f864c2a9e3`;

  try {
    // Fetch data from the News API
    const response = await axios.get(url);
    // Send the fetched articles back as JSON
    res.json(response.data.articles);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Error fetching data: ", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
