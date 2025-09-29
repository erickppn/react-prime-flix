import { Play, Star, Television } from "phosphor-react";
import { tvSerie } from "../types/TVSeries";

import { formatDate } from "../utils/formatDate";

export function SerieCard({ serie }: { serie: tvSerie }) {
  return (
    <div
      className="relative h-[calc((100vh/100)*60)] py-8 bg-center bg-cover rounded-md text-white"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${serie.backdrop_path})` }}
    >
      <div className="absolute bottom-0 right-0 top-0 left-0 opacity-50 bg-black" />

      <div className="relative flex max-w-1/2 h-full -ml-14 bg-black rounded-xl overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
          alt=""
        />

        <div className="flex flex-col justify-between p-8">
          <div>
            <h3 className="font-bold text-3xl mb-8">
              {serie.name}
            </h3>

            <p className="text-sm">
              {serie.overview}
            </p>

            <div className="flex gap-4 mt-10">
              <button
                className="border rounded-md py-2 px-4 font-semibold text-sm cursor-pointer"
              >
                Adicionar a Watchlist
              </button>

              <a
                href={`https://www.youtube.com/results?search_query=${serie.name} Trailer`}
                target="blank"
                rel="external"
                className="flex items-center gap-2 bg-rose-500 rounded-md py-2 px-4 text-sm"
              >
                <Play /> Ver trailer
              </a>
            </div>
          </div>

          <div className="flex items-center gap-6 text-md">
            <p className="flex items-center gap-1">
              <Television size={20} />

              {formatDate(serie.first_air_date)}
            </p>

            |

            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star weight="fill" />
              <span>{serie.vote_average.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}