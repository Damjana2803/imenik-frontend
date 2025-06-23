import React from 'react'
import { Link } from 'react-router-dom';

const KontaktKartica = ({
  id,
  ime,
  broj = '',
  slika = `${process.env.PUBLIC_URL}images/profile.jpg`
}) => {
  return (
    <Link to={`/kontakti/${id}`} className="kontakt_kartica">
      <img
        className="kontakt_slika"
        src={`${process.env.PUBLIC_URL}/${slika}`}
        alt={`Slika korisnika ${ime}`}
      />
      <div className="kontakt_info">
        <h3>{ime}</h3>
        <p>{broj}</p>
      </div>
    </Link>
  );
}

export default KontaktKartica;