const express = require('express');
const router = express.Router();

// Define a simple route
router.get('/test', (req, res) => {
  res.send('Test route is working!');
});

// Define your other routes here
router.get('/', (req, res) => {
  res.send('Hello, world!');
});

module.exports = router;