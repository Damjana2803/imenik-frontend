import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const korisnik = localStorage.getItem('user');
  const ime = JSON.parse(korisnik)?.name;

  const izlogujSe = () => {
    localStorage.clear();
    navigate('/prijava');
  }

  return (
    <nav className="navbar">
      <div className="navbar_greeting">Ćao, {ime}</div>
      <Link className="navbar_kontakti" to={"/"}>Kontakti</Link>
      <button className="navbar_logout" onClick={() => izlogujSe()}>
        Izloguj se
      </button>
    </nav>
  );
};

export default Navbar;
