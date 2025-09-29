import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { film } from "../types/Films";

type FilmsContextType = {
  savedFilms: film[];
  saveFilm: (film: film) => void;
  deleteFilm: (id: number) => void;
}

export const FilmsContext = createContext<FilmsContextType>(null!);

export function FilmsProvider({ children }: { children: JSX.Element }) {
  const [savedFilms, setSavedFilms] = useState<film[]>(JSON.parse(localStorage.getItem("@prime-flix") || "[]"));

  function saveFilm(film: film) {
    const hasFilm = savedFilms.some((savedFilm: { id: number }) => savedFilm.id === film!.id);

    if (hasFilm) {
      toast.warning("Esse filme já está salvo!");
      return;
    }

    setSavedFilms((prevState) => [...prevState, film]);
    toast.success("Filme salvo com sucesso!");
  }

  function deleteFilm(id: number) {
    let filteredFilms = savedFilms.filter((item) => {
      return (item.id !== id);
    })
    
    setSavedFilms(filteredFilms);
    toast.success("Filme removido com sucesso");
  }
  
  useEffect(() => {
    localStorage.setItem("@prime-flix", JSON.stringify(savedFilms));
  }, [savedFilms]);
  
  return (
    <FilmsContext.Provider value={{
      savedFilms,
      saveFilm,
      deleteFilm
    }}>
      {children}
    </FilmsContext.Provider>
  )
}