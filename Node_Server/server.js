const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const materialRoutes = require('./routes/materials');
const PORT =3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware
app.use(express.json());
// Connect to MongoDB
mongoose.connect('mongodb://localhost/materials', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use(materialRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});