import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import { FilmSlate, Play, Star, Television } from "phosphor-react";

//Components imports
import { Header } from "../../components/Header";
import { Banner } from "../../components/Banner";
import { Loading } from "../../components/Loading";
import { FilmsSlider } from "../../components/FilmsSlider";
import { Footer } from "../../components/Footer";

//API import
import { api } from "../../services/api";

//Types
import { film } from "../../types/Films";
import { tvSerie } from "../../types/TVSeries";
import { formatDate } from "../../utils/formatDate";
import { SeriesSlider } from "../../components/SeriesSlider";
import { SerieCard } from "../../components/SerieCard";


const BANNER_HEIGHT = (window.innerHeight * 90) / 100; //Height of the banner in the screen

export function Home() {
  const [popularFilms, setPopularFilms] = useState<film[]>([]);
  const [currentlyFilms, setCurrentlyFilms] = useState<film[]>([]);
  const [upcomingFilms, setUpcomingFilms] = useState<film[]>([]);
  const [popularSeries, setPopularSeries] = useState<tvSerie[]>([]);

  const pageRef = useRef<HTMLElement>(null);

  const [isLoadingFilms, setIsLoadingFilms] = useState(true);

  async function loadPopularFilms() {
    setIsLoadingFilms(true);

    const res = await api.get("movie/popular", {
      params: {
        page: 1,
      }
    });

    const results = res.data.results;
    const firstsPopularFilms = results.slice(0, 6); //picking the 5 most popular movies

    setPopularFilms(firstsPopularFilms);
    if (res.data.results.lenght) setIsLoadingFilms(false);
  }

  async function loadCurrentlyFilms() {
    setIsLoadingFilms(true);

    const res = await api.get("movie/now_playing", {
      params: {
        page: 1,
      }
    });

    setCurrentlyFilms(res.data.results);
    if (res.data.results.lenght) setIsLoadingFilms(false);
  }

  async function loadUpcomingFilms() {
    setIsLoadingFilms(true);

    const res = await api.get("movie/upcoming", {
      params: {
        page: 1,
      }
    });

    setUpcomingFilms(res.data.results);
    if (res.data.results) setIsLoadingFilms(false);
  }

  async function loadPopularSeries() {
    setIsLoadingFilms(true);

    const res = await api.get("tv/popular", {
      params: {
        page: 1,
      }
    });

    setPopularSeries(res.data.results);
    if (res.data.results) setIsLoadingFilms(false);
  }

  useEffect(() => {
    loadPopularFilms();
    loadCurrentlyFilms();
    loadUpcomingFilms();
    loadPopularSeries();
  }, []);

  return (
    <>
      <Header heightToCompare={BANNER_HEIGHT} elementReference={pageRef} />

      <main className="h-full overflow-y-scroll scrollbar scrollbar-w-3 scrollbar-thumb-rose-500" ref={pageRef}>
        {isLoadingFilms ? (
          <section className="h-11/12 flex justify-center items-center">
            <Loading size={56} styles="text-white" />
          </section>
        ) : (
          <Banner popularFilms={popularFilms} />
        )}

        <section className="flex flex-col gap-7 mt-10 px-40">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-3xl text-white font-bold">
              <FilmSlate size={32} />
              Lançamentos
            </h2>

            <Link to='/now-playing' className="text-rose-500 underline hover:opacity-85">
              Ver todos
            </Link>
          </div>

          {isLoadingFilms ? (
            <Loading size={56} styles="text-white" />
          ) : (
            <FilmsSlider filmList={currentlyFilms} />
          )}
        </section>

        <section className="flex flex-col gap-7 mt-16 px-40">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl text-white font-bold">
              Está por vir
            </h2>

            <Link to='/now-playing' className="text-rose-500 underline hover:opacity-85">
              Ver todos
            </Link>
          </div>

          {isLoadingFilms ? (
            <Loading size={56} styles="text-white" />
          ) : (
            <FilmsSlider filmList={upcomingFilms} />
          )}
        </section>

        <section className="flex flex-col gap-7 mt-16 px-40">
          <h2 className="text-3xl text-white font-bold">
            O que estão <span className="text-rose-500">assistindo</span>
          </h2>

          {isLoadingFilms ? (
            <Loading size={56} styles="text-white" />
          ) : (
            <SerieCard serie={popularSeries[1]}/>
          )}
        </section>

        <section className="flex flex-col gap-7 mt-16 px-40">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl text-white font-bold">
              <span className="text-rose-500">Séries</span> de TV
            </h2>

            <Link to='/now-playing' className="text-rose-500 underline hover:opacity-85">
              Ver todos
            </Link>
          </div>

          <SeriesSlider seriesList={popularSeries} />
        </section>

        <Footer />
      </main>
    </>
  )
}