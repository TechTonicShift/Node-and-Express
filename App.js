require('dotenv').config(); // loads environment variables from .env
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Connect to MongoDB
connectDB();

// 2. Middlewares
app.use(bodyParser.json()); 

// 3. Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// 4. Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server started");
});
