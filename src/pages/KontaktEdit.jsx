import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const KontaktEdit = () => {
  const { id } = useParams();
  const [ kontakt, setKontakt ] = useState({});
  const token = localStorage.getItem('token');

  const izmeniKontakt = async () => {
    const url = `${process.env.REACT_APP_API_URL}/api/contacts/${id}`;

    try {
      const url = `${process.env.REACT_APP_API_URL}/api/contacts/${id}`;
      const kontaktData = await axios.delete(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Uspešno brisanje kontakta.')
    } catch (e) {
      console.error(e);
      toast.error('Greška prilikom brisanja kontakta.');
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
    <div>
      {kontakt.ime}
    </div>
  )
}

export default KontaktEdit;