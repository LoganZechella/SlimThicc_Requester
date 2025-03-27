const spotifyService = require('../services/spotifyService');

const createSongRequest = async (req, res, next) => {
  try {
    const { songTitle, artistName } = req.body;
    
    // Search for the song on Spotify
    const trackUri = await spotifyService.searchTrack(songTitle, artistName);
    
    if (!trackUri) {
      return res.status(404).json({ error: 'Song not found on Spotify' });
    }
    
    // Add the song to the playlist
    await spotifyService.addToPlaylist(trackUri);
    
    return res.status(201).json({ message: 'Song added to playlist successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSongRequest,
}; 