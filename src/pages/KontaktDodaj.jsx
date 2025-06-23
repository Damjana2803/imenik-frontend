import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

function KontaktDodaj() {
  const [ime, setIme] = useState('');
  const [broj, setBroj] = useState('');
  const [beleske, setBeleske] = useState('');
  const [email, setEmail] = useState('');
  const [tipBroja, setTipBroja] = useState('privatni'); // default

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for required fields (you can extend it)
    if (!ime.trim() || !broj.trim()) {
      toast.error('Ime i telefon su obavezni.');
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/api/contacts`;
    const token = localStorage.getItem('token');

    try {
      const resp = await axios.post(
        url,
        { ime, broj, beleske, email, tip_broja: tipBroja },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Kontakt uspešno dodat!');
      setIme('');
      setBroj('');
      setBeleske('');
      setEmail('');
      setTipBroja('privatni');
    } catch (error) {
      console.error('Greška pri dodavanju kontakta:', error.response || error.message);
      toast.error('Dodavanje kontakta nije uspelo.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth_container">
        <form className="forma_card" onSubmit={handleSubmit}>
          <h2>Dodaj Kontakt</h2>

          <div className="forma_input">
            <label htmlFor="name">Ime i prezime*</label>
            <input
              type="text"
              id="name"
              value={ime}
              onChange={(e) => setIme(e.target.value)}
              placeholder="Marko Marković"
              required
            />
          </div>

          <div className="forma_input">
            <label htmlFor="phone">Telefon*</label>
            <input
              type="tel"
              id="phone"
              value={broj}
              onChange={(e) => setBroj(e.target.value)}
              placeholder="+381 64 1234567"
              required
            />
          </div>

          <div className="forma_input">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="marko@example.com"
            />
          </div>

          <div className="forma_input">
            <label htmlFor="note">Beleška</label>
            <textarea
              id="note"
              value={beleske}
              onChange={(e) => setBeleske(e.target.value)}
              placeholder="Dodaj neki detalj..."
              rows="3"
            />
          </div>

          <div className="forma_input">
            <label>Tip kontakta</label>
            <select value={tipBroja} onChange={(e) => setTipBroja(e.target.value)}>
              <option value="privatni">Privatni</option>
              <option value="poslovni">Poslovni</option>
            </select>
          </div>

          <button className="login_dugme" type="submit">Sačuvaj kontakt</button>
        </form>
      </div>
    </>
  );
}

export default KontaktDodaj;
