import { Link } from "react-router-dom";
import { Star } from "phosphor-react";
import Slider, { Settings } from "react-slick";

//Types imports
import { film } from "../types/Films";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings: Settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 4000,
  autoplay: true,
  variableWidth: true
};

export function FilmsSlider({ filmList }: { filmList: film[] }) {
  return (
    <div 
      className="text-white" 
    >
      <Slider {...settings}>
         {
          filmList.map((film) => {
            return (
              <Link to={`/films/${film.id}`} key={film.id} className="mr-6 hover:opacity-70">
                <h3 className="sr-only">{film.title}</h3>

                <div className="relative rounded-md overflow-hidden w-72">
                  <div className="absolute flex items-center gap-1 rounded-md py-1 px-2 top-3 left-3 bg-rose-500">
                    <Star weight="fill"/>

                    <span>{film.vote_average.toFixed(1)}</span>
                  </div>

                  <img
                    src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                    alt={film.title}
                    className="w-full"
                  />
                </div>
              </Link>
            )
          })
        }
      </Slider>
    </div>
  )
}