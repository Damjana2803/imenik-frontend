import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

function KontaktIzmeni() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ime, setIme] = useState('');
  const [broj, setBroj] = useState('');
  const [beleske, setBeleske] = useState('');
  const [email, setEmail] = useState('');
  const [tipBroja, setTipBroja] = useState('privatni');

  useEffect(() => {
    const fetchContact = async () => {
      const url = `${process.env.REACT_APP_API_URL}/api/contacts/${id}`;
      const token = localStorage.getItem('token');

      try {
        const resp = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = resp.data;
        setIme(data.ime);
        setBroj(data.broj);
        setBeleske(data.beleske || '');
        setEmail(data.email || '');
        setTipBroja(data.tip_broja || 'privatni');
      } catch (error) {
        console.error('Greška pri dohvatanju kontakta:', error);
        toast.error('Neuspelo učitavanje kontakta.');
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ime.trim() || !broj.trim()) {
      toast.error('Ime i telefon su obavezni.');
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/api/contacts/${id}`;
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        url,
        { ime, broj, beleske, email, tip_broja: tipBroja },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Kontakt uspešno izmenjen!');
      navigate('/');
    } catch (error) {
      console.error('Greška pri izmeni kontakta:', error.response || error.message);
      toast.error('Izmena kontakta nije uspela.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth_container">
        <form className="forma_card" onSubmit={handleSubmit}>
          <h2>Izmeni Kontakt</h2>

          <div className="forma_input">
            <label htmlFor="name">Ime i prezime*</label>
            <input
              type="text"
              id="name"
              value={ime}
              onChange={(e) => setIme(e.target.value)}
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
            />
          </div>

          <div className="forma_input">
            <label htmlFor="note">Beleška</label>
            <textarea
              id="note"
              value={beleske}
              onChange={(e) => setBeleske(e.target.value)}
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

          <button className="login_dugme" type="submit">Sačuvaj izmene</button>
        </form>
      </div>
    </>
  );
}

export default KontaktIzmeni;
