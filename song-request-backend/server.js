const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const songRoutes = require('./routes/songRoutes');
const spotifyService = require('./services/spotifyService');
const tokenStorage = require('./services/tokenStorage');
const SpotifyWebApi = require('spotify-web-api-node');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://djstrequest.netlify.app' 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Spotify API credentials
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Initialize token storage
tokenStorage.initializeStorage();

// Routes
app.use('/api/song-requests', songRoutes);

// Spotify Authentication Routes
app.get('/login', (req, res) => {
  const scopes = [
    'playlist-modify-public', 
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative'
  ];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(authorizeURL);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    
    const tokenData = {
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    };
    
    // Save tokens using storage service
    await tokenStorage.saveTokens(tokenData);
    
    res.send('Authentication successful! Tokens have been saved. You can close this window.');
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send('Authentication failed');
  }
});

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