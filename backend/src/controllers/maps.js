const express = require('express');
const app = express();
const axios = require('axios');

// Set up Google Maps API credentials
const apiKey = 'AIzaSyD6scoBO74hV5-0x3BRmjJk-wsztI1L2Gk';

// API endpoint to search for places
app.get('/api/places', (req, res) => {
  const query = req.query;
  const searchQuery = query.search;
  const location = query.location;
  const radius = query.radius;

  // Build API request URL
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
  const params = {
    key: apiKey,
    location: `${location.lat},${location.lng}`,
    radius: radius,
    type: 'place'
  };

  if (searchQuery) {
    params.keyword = searchQuery;
  }

  // Make API request to Google Maps API
  axios.get(url, { params })
    .then(response => {
      const places = response.data.results;
      res.send(places);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ message: 'Error searching for places' });
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app