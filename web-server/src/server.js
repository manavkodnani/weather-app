const express = require('express');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.get('', (req, res) => {
  res.send('Hello express !!');
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.status(400).send({ error: 'No address found' });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast: forecast,
        location: location,
        address: req.query.address
      });
    });
  });
});

app.listen(3001);