const fs = require('fs');
const https = require('https');
const path = require('path');

// URL of the noise texture
const noiseUrl = 'https://ice-creme.de/images/background-noise.png';

// Local directory to save the texture
const directory = path.join(__dirname, '../../public/images');

// Create the directory if it doesn't exist
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

// Path to save the downloaded file
const filePath = path.join(directory, 'background-noise.png');

// Function to download the file
const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
        console.log(`File downloaded successfully to ${dest}`);
      });
    }).on('error', (error) => {
      fs.unlink(dest, () => {}); // Delete the file if there's an error
      reject(error.message);
    });
  });
};

// Download the noise texture
downloadFile(noiseUrl, filePath)
  .then(() => {
    console.log('Noise texture downloaded successfully');
  })
  .catch((error) => {
    console.error('Error downloading noise texture:', error);
  }); 