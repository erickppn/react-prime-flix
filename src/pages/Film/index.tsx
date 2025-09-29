import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api";

import './styles.css';
import { FilmsContext } from "../../contexts/FilmsContext";
import { film } from "../../types/Films";
import { Header } from "../../components/Header";

export function Film() {
  const { id } = useParams();
  const navgate = useNavigate();

  const [film, setFilm] = useState<film | null>(null);

  const [isLoadingFilm, setIsLoadingFilms] = useState(true);

  const { saveFilm } = useContext(FilmsContext);

  async function loadFilm() {
    await api.get(`/movie/${id}`)
      .then((response) => {
        setFilm(response.data);
        setIsLoadingFilms(false);
      });
  }

  useEffect(() => {
    loadFilm();
  }, [navgate, id]);

  if (isLoadingFilm) {
    return (
      <div className="film-info">
        <h1>Carregando filme...</h1>
      </div>
    )
  }

  if (!film) {
    return (
      <div className="film-info">
        <h1>Filme não encontrado...</h1>
      </div>
    );
  }

  return (
    <div className="film-info">
      <Header />
      
      <h1>{film.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt={film.title} />

      <h3>Sinopse</h3>
      <span>{film.overview}</span>
      <strong>Avaliação: {film.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={() => saveFilm(film)}>Salvar</button>

        <a
          href={`https://www.youtube.com/results?search_query=${film.title} Trailer`}
          target="blank"
          rel="external"
        >
          Ver trailer
        </a>
      </div>
    </div>
  )
}