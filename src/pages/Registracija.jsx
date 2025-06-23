import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Registracija() {
  const navigate = useNavigate();

  const [ime, setIme] = useState('');
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');
  const [potvrdaLozinke, setPotvrdaLozinke] = useState('');

  const registrujSe = async (e) => {
    e.preventDefault();

    if (!ime || !email || !lozinka || !potvrdaLozinke) {
      toast.error('Molimo popuni sva polja.');
      return;
    }

    if (lozinka !== potvrdaLozinke) {
      toast.error('Lozinke se ne poklapaju.');
      return;
    }

    try {
      const url = `${process.env.REACT_APP_API_URL}/api/register`;

      const response = await axios.post(url, {
        name: ime,
        email: email,
        password: lozinka,
      });

      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success('Uspešna registracija!');
        navigate('/');
      } else {
        toast.error('Registracija nije uspela. Pokušaj ponovo.');
      }
    } catch (error) {
      console.error('Greška pri registraciji:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Greška pri registraciji!');
    }
  };

  return (
    <div className="auth_container">
      <form onSubmit={registrujSe} className="forma_card">
        <h2>Registracija</h2>

        <div className="forma_input">
          <label htmlFor="ime">Ime i prezime</label>
          <input
            type="text"
            id="ime"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
            placeholder="Nikola Nikolić"
            required
          />
        </div>

        <div className="forma_input">
          <label htmlFor="email">E-adresa</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nikola.nikolic@eadresa.com"
            required
          />
        </div>

        <div className="forma_input">
          <label htmlFor="lozinka">Lozinka</label>
          <input
            type="password"
            id="lozinka"
            value={lozinka}
            onChange={(e) => setLozinka(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="forma_input">
          <label htmlFor="potvrdaLozinke">Potvrdi lozinku</label>
          <input
            type="password"
            id="potvrdaLozinke"
            value={potvrdaLozinke}
            onChange={(e) => setPotvrdaLozinke(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button className="login_dugme" type="submit">Registruj se</button>

        <p className="no_account_tekst">
          Već imaš nalog? <Link to="/prijava">Prijavi se!</Link>
        </p>
      </form>
    </div>
  );
}

export default Registracija;
