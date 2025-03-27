const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Local file fallback path
const tokenPath = path.join(__dirname, '../config/spotify-token.json');
const configDir = path.dirname(tokenPath);

// Token schema
const tokenSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expiresIn: { type: Number, required: true }
});

// Create model only if mongoose is connected
let TokenModel;

// Initialize the database connection
const initializeStorage = async () => {
  // Only connect to MongoDB in production
  if (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB for token storage');
      TokenModel = mongoose.model('Token', tokenSchema);
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  } else {
    console.log('Using local file system for token storage');
  }
};

// Ensure config directory exists
const ensureConfigDirExists = () => {
  if (!fs.existsSync(configDir)) {
    try {
      fs.mkdirSync(configDir, { recursive: true });
      console.log(`Created directory: ${configDir}`);
    } catch (error) {
      console.error(`Failed to create directory ${configDir}:`, error);
    }
  }
};

// Save token data
const saveTokens = async (tokenData) => {
  try {
    // If we're connected to MongoDB in production
    if (process.env.NODE_ENV === 'production' && TokenModel) {
      await TokenModel.findOneAndUpdate(
        { key: 'spotify' },
        { 
          key: 'spotify',
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
          expiresIn: tokenData.expiresIn
        },
        { upsert: true, new: true }
      );
      console.log('Tokens saved to database');
    }
    
    // Always save to file as fallback
    try {
      // Ensure directory exists
      ensureConfigDirExists();
      
      fs.writeFileSync(tokenPath, JSON.stringify(tokenData));
      console.log('Tokens saved to file system');
    } catch (error) {
      console.error('Error saving tokens to file system:', error);
      // Continue even if file save fails - database is primary in production
    }
    
    return true;
  } catch (error) {
    console.error('Error saving tokens:', error);
    return false;
  }
};

// Load token data
const loadTokens = async () => {
  try {
    // Try to get tokens from MongoDB in production
    if (process.env.NODE_ENV === 'production' && TokenModel) {
      const tokenDoc = await TokenModel.findOne({ key: 'spotify' });
      if (tokenDoc) {
        console.log('Tokens loaded from database');
        return {
          accessToken: tokenDoc.accessToken,
          refreshToken: tokenDoc.refreshToken,
          expiresIn: tokenDoc.expiresIn
        };
      }
    }
    
    // Try environment variable next
    if (process.env.SPOTIFY_TOKEN_JSON) {
      try {
        const tokenData = JSON.parse(process.env.SPOTIFY_TOKEN_JSON);
        console.log('Using Spotify tokens from environment variable');
        return tokenData;
      } catch (err) {
        console.error('Error parsing SPOTIFY_TOKEN_JSON environment variable:', err);
      }
    }
    
    // Fall back to file system
    try {
      if (fs.existsSync(tokenPath)) {
        const tokenData = JSON.parse(fs.readFileSync(tokenPath));
        console.log('Tokens loaded from file system');
        return tokenData;
      }
    } catch (error) {
      console.error('Error reading token file:', error);
    }
    
    return null;
  } catch (error) {
    console.error('Error loading tokens:', error);
    return null;
  }
};

module.exports = {
  initializeStorage,
  saveTokens,
  loadTokens
}; 