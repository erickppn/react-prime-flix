import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Loading } from "./Loading";
import { CalendarBlank, Play, Star } from "phosphor-react";

import { api } from "../services/api";

interface FilmProps {
  id: number,
  title: string,
  overview: string,
  poster_path: string,
  backdrop_path: string,
  release_date: string,
  vote_average: number
}

export function Banner() {
  const [popularFilms, setPopularFilms] = useState<FilmProps[]>([]);
  const [isLoadingFilms, setIsLoadingFilms] = useState(true);

  async function loadFilms() {
    const res = await api.get("movie/popular", {
      params: {
        page: 1,
      }
    });

    const results = res.data.results;
    setPopularFilms(results);

    if (results.length) {
      setIsLoadingFilms(false);
    };
  }

  useEffect(() => {
    loadFilms();
  }, []);

  if (isLoadingFilms) {
    return (
      <section className="w-screen h-10/12 flex justify-center items-center">
        <Loading size={56} styles="text-white"/>
      </section>
    )
  }

  return (
    <section
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${popularFilms[16].backdrop_path})` }}
      className="w-screen h-11/12 relative bg-center bg-cover text-white"
    >
      <div className="absolute bottom-0 right-0 top-0 left-0 opacity-65 bg-black" />

      <div className="w-full relative h-full bg-center bg-cover flex items-center">
        <div className="max-w-xl ml-40 z-10">
          <div className="flex items-center gap-6 text-md mb-2">
            <p className="flex items-center gap-1">
              <CalendarBlank size={20} />
              {
                format(popularFilms[16].release_date, "dd'/'MM'/'yyyy'", {
                  locale: ptBR,
                })
              }
            </p>
            
            |

            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star weight="fill" className="text-amber-400"/>
              <span>{popularFilms[16].vote_average.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-white text-6xl">
              {popularFilms[16].title}
            </h2>

            <p className="">{popularFilms[16].overview}</p>
          </div>

          <div className="flex gap-4 mt-10">
            <button
              className="border rounded-md py-2 px-4 font-semibold cursor-pointer"
            >
              Adicionar a Watchlist
            </button>

            <a
              href={`https://www.youtube.com/results?search_query=${popularFilms[16].title} Trailer`}
              target="blank"
              rel="external"
              className="flex items-center gap-2 bg-rose-500 rounded-md text-white py-2 px-4" 
            >
              <Play /> Ver trailer
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}