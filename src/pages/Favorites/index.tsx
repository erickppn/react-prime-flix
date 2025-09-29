import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import { FilmsContext } from '../../contexts/FilmsContext';

export function Favorites() {
  const { savedFilms, deleteFilm } = useContext(FilmsContext);

  return (
    <div className="my-films text-white">
      <h1 className='mt-32'>Meus Filmes</h1>

      {savedFilms.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

      <ul>
        {
          savedFilms.map((film) => {
            return (
              <li key={film.id}>
                <span>{film.title}</span>
                <div>
                  <Link to={`/film/${film.id}`}>Ver Detalhes</Link>
                  <button onClick={() => deleteFilm(film.id)}>Excluir</button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}