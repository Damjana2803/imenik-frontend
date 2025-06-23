import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

function Kontakt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ kontakt, setKontakt ] = useState({});
  const token = localStorage.getItem('token');

  const obrisiKontakt = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/contacts/${id}`;

      const resp = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Uspešno brisanje kontakta.')
      navigate('/');
    } catch (e) {
      console.error(e);
      toast.error('Greška prilikom birsanja kontakta.');
    }
  }

  const uzmiKontakt = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/contacts/${id}`;
    
    try {
      const kontaktData = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (kontaktData?.data) {
        setKontakt(kontaktData.data);
      }
    } catch (e) {
      console.error(e);
      toast.error('Ovaj kontakt ne postoji!');
    }
  }

  useEffect(() => {
   uzmiKontakt();
  }, [ id ]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="kontakti-container">
          <Link to={`/kontakti/edit/${id}`}>EDIT</Link>
          <button onClick={() => obrisiKontakt()}>OBRISI</button>
          <h2>{ kontakt.ime }</h2>
          <p>{ kontakt.broj }</p>
        </div>
      </div>
    </>
  );
}

export default Kontakt;