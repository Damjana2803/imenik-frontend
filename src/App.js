import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Prijava from './pages/Prijava';
import Registracija from './pages/Registracija';
import Kontakti from './pages/Kontakti';
import Kontakt from './pages/Kontakt';

import './App.css';
import Auth from './components/Auth';
import Guest from './components/Guest';
import KontaktDodaj from './pages/KontaktDodaj';
import { ToastContainer } from 'react-toastify';
import KontaktEdit from './pages/KontaktEdit';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Guest />}>
          <Route path="/prijava" element={<Prijava />} />
          <Route path="/registracija" element={<Registracija />} />
        </Route>
        
        <Route element={<Auth />}>
          <Route path="/" element={<Kontakti />} />
          <Route path="/kontakt/dodaj" element={<KontaktDodaj />} />
          <Route path="/kontakti/:id" element={<Kontakt />} />
          <Route path="/kontakti/edit/:id" element={<KontaktEdit />} />
        </Route>
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={3000}       // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
