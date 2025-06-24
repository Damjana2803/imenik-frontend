import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Loading from '../components/Loding';

function Kontakt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ kontakt, setKontakt ] = useState({});
  const token = localStorage.getItem('token');

  const [ucitano, setUcitano] = useState(false);

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
    setUcitano(false);
    try {
      const kontaktData = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (kontaktData?.data) {
        setKontakt(kontaktData.data);
        setUcitano(true);
      }
    } catch (e) {
      console.error(e);
      setUcitano(true);
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
        <div className="kontakt-detalji-container">
          <div className="kontakt-detalji-header">
            <h2>Detalji kontakta</h2>
            <div className="kontakt-detalji-dugmad">
              <Link to={`/kontakti/edit/${id}`} className="dugme dugme-izmeni">Izmeni</Link>
              <button onClick={obrisiKontakt} className="dugme dugme-obrisi">Obriši</button>
            </div>
          </div>

          {ucitano ? <table className="kontakt-tabela">
            <tbody>
              <tr>
                <td><strong>Ime i prezime:</strong></td>
                <td>{kontakt.ime}</td>
              </tr>
              <tr>
                <td><strong>Telefon:</strong></td>
                <td>{kontakt.broj}</td>
              </tr>
              <tr>
                <td><strong>Tip broja:</strong></td>
                <td>{kontakt.tip_broja ?? '-'}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{kontakt.email ?? '-'}</td>
              </tr>
              <tr>
                <td><strong>Beleške:</strong></td>
                <td>{kontakt.beleske ?? '-'}</td>
              </tr>
            </tbody>
          </table> : <Loading />}
        </div>
      </div>
    </>
  );
}

export default Kontakt;