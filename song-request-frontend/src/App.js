import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SongRequestForm from './components/SongRequestForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Request a song from DJ Slim Thicc
          </h1>
          <SongRequestForm />
          <ToastContainer position="bottom-center" />
        </div>
      </div>
    </div>
  );
}

export default App;
