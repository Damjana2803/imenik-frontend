import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [lozinka, setLozinka] = useState('');

  const prijaviSe = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/login`;

    try {
      const response = await axios.post(url, {
        email: email,
        password: lozinka,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        toast.success('Uspešna prijava!');
        navigate('/')
      } else {
        console.error('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      toast.error('Pogrešni kredencijali!')
    }
  }

  return (
    <div className="auth_container">
      <form onSubmit={prijaviSe} className="forma_card">
        <h2>Prijava</h2>
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
        <button className="login_dugme">Prijavi se</button>
        <p className="no_account_tekst">Nemaš nalog? <Link to="/registracija">Registruj se!</Link></p>
      </form>
    </div>
  );
}

export default Login;
