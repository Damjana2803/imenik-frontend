import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import KontaktKartica from '../components/KontaktKartica';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loding';

function Kontakti() {
  const navigate = useNavigate();

  const [ ucitano, setUcitano ] = useState(false);
  const [ kontakti, setKontakti ] = useState([]);
  const [ pretraga, setPretraga ] = useState('');

  const uzmiKontakte =  async () => {
    try {
      setUcitano(false);
      const token = localStorage.getItem('token');
      const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/contacts?search=${pretraga}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (resp.data) {
        setKontakti(resp.data);
        setUcitano(true);
      }
      
    } catch (e) {
      console.error(e);
      setUcitano(true);
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
            <div className="kontakti-kartica-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '1em' }}>
                <input
                  type="text"
                  className="kontakti-pretraga-input"
                  placeholder="Pretraži po imenu ili broju..."
                  value={pretraga}
                  onChange={(e) => setPretraga(e.target.value)}
                />
                <div className="kontakti-dodaj-dugme" onClick={() => navigate("/kontakt/dodaj")}>
                  <span>Dodaj kontakt</span>
                </div>  
              </div>
                {ucitano ? "" : <Loading />}
                {ucitano && (kontakti?.length ? kontakti.map(kontakt => (
                  <KontaktKartica 
                    id={kontakt.id}
                    ime={kontakt.ime}
                    broj={kontakt?.broj} 
                  />
                )) : "Nema kontakata")}
            </div>
          </div>
        </div>
    </>
  );
}

export default Kontakti;
