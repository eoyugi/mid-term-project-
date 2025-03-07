const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes'); // Import the routes module
const errorHandler = require('./middleware/errorHandler'); // Import the error handler

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use the routes defined in the routes module
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Land Tokenization Backend');
});

// Use the error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});