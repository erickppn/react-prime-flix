import { useContext, useEffect, useState } from "react";
import { CalendarBlank, Play, Star } from "phosphor-react";

//Types imports
import { film } from "../types/Films";

//Context imports
import { FilmsContext } from "../contexts/FilmsContext";

//Utils imports
import { formatDate } from "../utils/formatDate";

const BANNER_TIMER = 7000;

export function Banner({ popularFilms }: { popularFilms: film[] }) {
  const [currentFilmIndex, setcurrentFilmIndex] = useState(0);

  const { saveFilm } = useContext(FilmsContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setcurrentFilmIndex((prevIndex) => (prevIndex + 1) % popularFilms.length);
    }, BANNER_TIMER);

    return () => clearTimeout(timeout);
  }, [currentFilmIndex, popularFilms.length]);

  return (
    <div
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${popularFilms[currentFilmIndex].backdrop_path})` }}
      className="h-11/12 relative bg-center bg-cover duration-500" 
    >
      <div className="absolute bottom-0 right-0 top-0 left-0 opacity-65 bg-black" />

      <div className="relative w-full h-full bg-center bg-cover flex items-center text-white">
        <div className="max-w-xl ml-40">
          <div className="flex items-center gap-6 text-md mb-2">
            <p className="flex items-center gap-1">
              <CalendarBlank size={20} />
              
              { formatDate(popularFilms[currentFilmIndex].release_date) }
            </p>
            
            |

            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star weight="fill" className="text-amber-400"/>
              <span>{popularFilms[currentFilmIndex].vote_average.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h2 className="font-bold text-6xl">
              {popularFilms[currentFilmIndex].title}
            </h2>

            <p className="">{popularFilms[currentFilmIndex].overview}</p>
          </div>

          <div className="flex gap-4 mt-10">
            <button
              className="border rounded-md py-2 px-4 font-semibold cursor-pointer" 
              onClick={() => saveFilm(popularFilms[currentFilmIndex])}
            >
              Adicionar a Watchlist
            </button>

            <a
              href={`https://www.youtube.com/results?search_query=${popularFilms[currentFilmIndex].title} Trailer`}
              target="blank"
              rel="external"
              className="flex items-center gap-2 bg-rose-500 rounded-md py-2 px-4" 
            >
              <Play /> Ver trailer
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 flex gap-3 w-full justify-center">
          {popularFilms.map((film, index) => (
            <button 
              key={film.id}
              onClick={() => setcurrentFilmIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 bg-white cursor-pointer 
                ${index == currentFilmIndex ? 'bg-white w-5' : 'bg-white/50'}
            `}/>
          ))}
        </div>
      </div>
    </div>
  )
}