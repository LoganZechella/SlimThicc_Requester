const SpotifyWebApi = require('spotify-web-api-node');
const tokenStorage = require('./tokenStorage');

// Spotify API credentials
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Initialize Spotify
const initializeSpotify = async () => {
  try {
    // Initialize token storage
    await tokenStorage.initializeStorage();
    
    // Get tokens from storage
    const tokenData = await tokenStorage.loadTokens();
    
    // If we have tokens, use them
    if (tokenData) {
      spotifyApi.setAccessToken(tokenData.accessToken);
      spotifyApi.setRefreshToken(tokenData.refreshToken);
      
      // Schedule token refresh
      scheduleTokenRefresh(tokenData.expiresIn);
    } else {
      console.log('No Spotify tokens found. Please authenticate first.');
    }
  } catch (error) {
    console.error('Error initializing Spotify:', error);
  }
};

// Refresh the access token
const refreshAccessToken = async () => {
  try {
    const data = await spotifyApi.refreshAccessToken();
    const accessToken = data.body.access_token;
    const expiresIn = data.body.expires_in;
    
    // Save the access token
    spotifyApi.setAccessToken(accessToken);
    
    // Store tokens
    const tokenData = {
      accessToken,
      refreshToken: spotifyApi.getRefreshToken(),
      expiresIn,
    };
    
    // Save tokens using storage service
    await tokenStorage.saveTokens(tokenData);
    
    // Schedule next refresh
    scheduleTokenRefresh(expiresIn);
    
    console.log('Access token refreshed');
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
};

// Schedule token refresh
const scheduleTokenRefresh = (expiresIn) => {
  // Refresh token 5 minutes before it expires
  const refreshTime = (expiresIn - 300) * 1000;
  setTimeout(refreshAccessToken, refreshTime);
};

// Search for a track on Spotify
const searchTrack = async (title, artist) => {
  try {
    const query = `track:${title} artist:${artist}`;
    const response = await spotifyApi.searchTracks(query, { limit: 1 });
    
    if (response.body.tracks.items.length === 0) {
      return null;
    }
    
    return response.body.tracks.items[0].uri;
  } catch (error) {
    console.error('Error searching for track:', error);
    throw error;
  }
};

// Add a track to the playlist
const addToPlaylist = async (trackUri) => {
  try {
    const playlistId = process.env.SPOTIFY_PLAYLIST_ID;
    
    // Log playlist ID for debugging
    console.log(`Attempting to add track to playlist: ${playlistId}`);
    
    // Check if we can access the playlist first
    try {
      const playlist = await spotifyApi.getPlaylist(playlistId);
      console.log(`Successfully accessed playlist: ${playlist.body.name}`);
    } catch (playlistError) {
      console.error(`Cannot access playlist ${playlistId}:`, playlistError);
      console.log('Checking if user owns this playlist...');
      
      // Get current user's ID
      const me = await spotifyApi.getMe();
      console.log(`Authenticated as user: ${me.body.id}`);
      
      // Get user's playlists
      const userPlaylists = await spotifyApi.getUserPlaylists(me.body.id);
      const ownedPlaylist = userPlaylists.body.items.find(p => p.id === playlistId);
      
      if (!ownedPlaylist) {
        throw new Error(`User ${me.body.id} does not have access to playlist ${playlistId}. Please check playlist ownership or collaborator status.`);
      }
    }
    
    // Try to add the track
    await spotifyApi.addTracksToPlaylist(playlistId, [trackUri]);
    console.log(`Successfully added track ${trackUri} to playlist ${playlistId}`);
    return true;
  } catch (error) {
    console.error('Error adding track to playlist:', error);
    throw error;
  }
};

module.exports = {
  initializeSpotify,
  searchTrack,
  addToPlaylist,
}; 