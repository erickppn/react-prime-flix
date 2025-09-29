import { Heart, MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export function Header({ heightToCompare, elementReference }: { heightToCompare?: number, elementReference?: React.RefObject<HTMLElement> }) {
  const [isScrolled, setScrolled] = useState(false);
  
  function handleScroll() {
    if (!elementReference) return;

    if (!elementReference.current || !heightToCompare) {
      return setScrolled(true);
    }
    
    if (elementReference?.current.scrollTop > heightToCompare) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  elementReference?.current && elementReference?.current.addEventListener('scroll', handleScroll);

  return (
    <header className={`fixed w-full flex justify-between text-white px-40 z-100 transition-all duration-600 ${isScrolled || !heightToCompare ? 'bg-black py-3' : 'bg-transparent py-8'}`}>
      <Link className="font-bold text-4xl text-nowrap" to='/'>
        Prime <span className="text-rose-500">Flix</span>
      </Link>

      <nav className="flex justify-end items-center gap-10 w-full">
        <div className="flex items-center gap-2 pl-2 border rounded-md max-w-xl w-full">
          <MagnifyingGlass size={32} />

          <input 
            className="w-full py-3"
            type="text" 
            placeholder="Buscar filme, série..."
          />
        </div>

        <NavLink 
          to='/'
          className={({ isActive }) => `
            relative flex flex-col items-center opacity-80
            after:absolute after:-bottom-1 after:w-3/4 after:h-[2px] after:bg-rose-500
            ${isActive ? 'opacity-100 font-semibold after:block' : 'after:hidden'}`
        }>
          Home
        </NavLink>

        <NavLink 
          to='/films'
          className={({ isActive }) => `
            relative flex flex-col items-center opacity-80
            after:absolute after:-bottom-1 after:w-3/4 after:h-[2px] after:bg-rose-500
            ${isActive ? 'opacity-100 font-semibold after:block' : 'after:hidden'}`
        }>
          Filmes
        </NavLink>

        <NavLink 
          to='/series'
          className={({ isActive }) => `
            relative flex flex-col items-center opacity-80
            after:absolute after:-bottom-1 after:w-3/4 after:h-[2px] after:bg-rose-500
            ${isActive ? 'opacity-100 font-semibold after:block' : 'after:hidden'}`
        }>
          Séries
        </NavLink>
        
        <Link 
          className="flex items-center gap-2 bg-rose-500 rounded-md font-semibold text-white py-2 px-4" 
          to='/favorites'
        >
          <Heart weight="fill" size={18}/> Watchlist
        </Link>
      </nav>
    </header>
  )
}