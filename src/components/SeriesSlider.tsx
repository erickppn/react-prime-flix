import { Link } from "react-router-dom";
import { CalendarBlank, Star } from "phosphor-react";
import Slider, { Settings } from "react-slick";

//Types imports
import { tvSerie } from "../types/TVSeries";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings: Settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  autoplay: true,
  variableWidth: true
};

export function SeriesSlider({ seriesList }: { seriesList: tvSerie[] }) {
  return (
    <div
      className="text-white"
    >
      <Slider {...settings}>
        {
          seriesList.map((serie) => {
            return (
              <Link to={`/films/${serie.id}`} key={serie.id} className="mr-6 hover:opacity-70">
                <div className="relative rounded-md w-[480px] max-h-72">
                  <div className="absolute flex items-center gap-1 rounded-md py-1 px-2 top-3 left-3 bg-rose-500">
                    <Star weight="fill" />

                    <span>{serie.vote_average.toFixed(1)}</span>
                  </div>

                  <img
                    src={`https://image.tmdb.org/t/p/original/${serie.backdrop_path}`}
                    alt={serie.name}
                    className="w-full rounded-xl mb-4"
                  />

                  <div className="flex justify-center">
                    <h3 className="text-xl">
                      {serie.name}
                    </h3>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </Slider>
    </div>
  )
}