import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { api } from "../../services/api";

import './styles.css';

interface IFilm {
  id: number,
  title: string,
  backdrop_path: string,
  overview: string,
  vote_average: number
}

export function Film() {
  const { id } = useParams();
  const navgate = useNavigate();

  const [film, setFilm] = useState<IFilm | null>(null);

  const [isLoadingFilm, setIsLoadingFilms] = useState(true);

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

  function saveFilm() {
    const filmList = localStorage.getItem("@prime-flix") || '[]';

    let savedFilms = JSON.parse(filmList) || [];

    const hasFilm = savedFilms.some((savedFilm: { id: number }) => savedFilm.id === film!.id);

    if (hasFilm) {
      toast.warning("Esse filme já está salvo!");
      return;
    }

    savedFilms.push(film);
    localStorage.setItem("@prime-flix", JSON.stringify(savedFilms));
    toast.success("Filme salvo com sucesso!");
  }

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
      <h1>{film.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt={film.title} />

      <h3>Sinopse</h3>
      <span>{film.overview}</span>
      <strong>Avaliação: {film.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={saveFilm}>Salvar</button>

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