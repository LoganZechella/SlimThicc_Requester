import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SongRequestForm from './components/SongRequestForm';

function App() {
  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Request a song from DJ Slim Thicc</h1>
        <SongRequestForm />
        <ToastContainer 
          position="bottom-center" 
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          theme="light"
        />
      </div>
    </div>
  );
}

export default App;
