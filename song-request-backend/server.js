const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const songRoutes = require('./routes/songRoutes');
const spotifyService = require('./services/spotifyService');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/song-requests', songRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Initialize Spotify service
spotifyService.initializeSpotify();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 