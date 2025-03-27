import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const submitSongRequest = async (songData) => {
  const response = await axios.post(`${API_URL}/api/song-requests`, songData);
  return response.data;
}; 