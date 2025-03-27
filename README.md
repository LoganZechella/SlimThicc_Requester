# DJ Song Request System

A web application that allows users to request songs for a DJ's Spotify playlist.

## Project Structure

This project is organized into two main parts:

- `song-request-frontend`: React application for the user interface
- `song-request-backend`: Node.js server for handling requests and Spotify integration

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- Spotify Developer Account
- A Spotify playlist for song requests

### Spotify Setup

1. Register an application on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Set the redirect URI to `http://localhost:8000/callback`
3. Note your Client ID and Client Secret
4. Create a playlist and note the playlist ID from its URL

### Backend Setup

1. Navigate to the backend directory:
```bash
cd song-request-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following information:
```
PORT=8000
NODE_ENV=development
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:8000/callback
SPOTIFY_PLAYLIST_ID=your_playlist_id
```

4. Run the authentication script to get Spotify tokens:
```bash
npm run auth
```

5. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd song-request-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following information:
```
REACT_APP_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm start
```

## Usage

1. The application will be available at `http://localhost:3000`
2. Users can enter a song title and artist name to request a song
3. The song will be added to the specified Spotify playlist if found

## Deployment

### Frontend Deployment (Netlify)

1. Build the React application:
```bash
npm run build
```

2. Deploy to Netlify using the Netlify CLI or connect to your GitHub repository

### Backend Deployment (Render)

1. Push the code to a GitHub repository
2. Set up a new Web Service on Render
3. Connect to your GitHub repository
4. Configure the environment variables

## Creating a QR Code

1. Once deployed, use the Netlify URL as the target for the QR code
2. Generate a QR code using a service like [QR Code Generator](https://www.qr-code-generator.com/)
3. Print or display the QR code for users to scan 