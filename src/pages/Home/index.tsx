import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import './styles.css';

interface FilmsProps {
  id: number,
  title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
}

export function Home() {
  const [films, setFilms] = useState<FilmsProps[]>([]);
  const [isLoadingFilms, setIsLoadingFilms] = useState(true);

  async function loadFilms() {
    const res = await api.get("movie/now_playing", {
      params: {
        page: 1,
      }
    });
    
    setFilms(res.data.results);

    setIsLoadingFilms(false);
  }

  useEffect(() => {
    loadFilms();
  }, []);

  if(isLoadingFilms) {
    return (
      <h1>Carregando filmes...</h1>
    )
  }

  return (
    <div className="container">
      <div className="film-list">
        {
          films.map((film) => {
            return (
              <article key={film.id}>
                <strong>{film.title}</strong>
                <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.title} />
                <Link to={`/film/${film.id}`}>Acessar</Link>
              </article>
            )
          })
        }
      </div>
    </div>
  )
}