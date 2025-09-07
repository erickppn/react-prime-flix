import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import './styles.css';
import { Banner } from "../../components/Banner";

interface FilmProps {
  id: number,
  title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
  release_date: string,
}

export function Home() {
  const [films, setFilms] = useState<FilmProps[]>([]);
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


  return (
    <main className="h-full overflow-y-scroll">
      <Banner />

      <div className="film-list text-white">
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
    </main>
  )
}