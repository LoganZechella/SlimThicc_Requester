import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SongRequestForm from './components/SongRequestForm';
import GradientBackground from './components/GradientBackground';
import GlassCard from './components/GlassCard';
import Header from './components/Header';
import './styles/toast-override.css';
import './styles/helpers.css';

function App() {
  return (
    <div className="app-container gradient-bg">
      <GradientBackground>
        <div className="min-h-screen w-full flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            <GlassCard className="p-8 shadow-lg backdrop-blur-md border border-white/20">
              <Header title="Request a song from DJ Slim Thicc" />
              <SongRequestForm />
            </GlassCard>
            <ToastContainer 
              position="bottom-center" 
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              className="mt-4 toast-container-custom"
              toastClassName="toast-custom"
            />
          </div>
        </div>
      </GradientBackground>
    </div>
  );
}

export default App;
