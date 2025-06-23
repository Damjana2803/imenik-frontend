import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import KontaktKartica from '../components/KontaktKartica';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Kontakti() {
  const [ kontakti, setKontakti ] = useState([]);
  const [ pretraga, setPretraga ] = useState('');

  const uzmiKontakte =  async () => {
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/contacts?search=${pretraga}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (resp.data) {
        setKontakti(resp.data);
      }
      
    } catch (e) {
      console.error(e);
      toast.error('Greška prilikom uzimanja kontakata.');
    }
  }

  useEffect(() => {
    uzmiKontakte();
  }, [ pretraga ]);

  return (
    <>
        <Navbar />
        <div className="container">
          <div className="kontakti-container">
            <h2>Lista kontakata</h2>
            <input value={pretraga} onChange={(e) => setPretraga(e.target.value)} />
            <div className="kontakti-kartica-container">
              <div className="kontakti-dodaj-dugme">
                <Link to="/kontakt/dodaj">Dodaj kontakt</Link>
              </div>
                {kontakti.map(kontakt => (
                  <KontaktKartica 
                    id={kontakt.id}
                    ime={kontakt.ime}
                    broj={kontakt?.broj} 
                  />
                ))}
            </div>
          </div>
        </div>
    </>
  );
}

export default Kontakti;
