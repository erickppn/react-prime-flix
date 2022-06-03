import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.css';

interface FilmsProps {
  id: number,
  title: string,
}

export function Favorites() {
  const [films, setFilms] = useState<FilmsProps[]>([]);

  useEffect(() => {
    const savedFilms = localStorage.getItem("@prime-flix") || '[]';
    setFilms(JSON.parse(savedFilms));
  }, []);

  function deleteFilm(id: number) {
    let filteredFilms = films.filter((item) => {
      return (item.id !== id);
    })
    
    setFilms(filteredFilms);
    localStorage.setItem("@prime-flix", JSON.stringify(filteredFilms));

    toast.success("Filme removido com sucesso");
  }

  return (
    <div className="my-films">
      <h1>Meus Filmes</h1>

      {films.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}

      <ul>
        {
          films.map((film) => {
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