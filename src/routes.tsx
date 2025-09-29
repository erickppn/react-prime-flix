import { Routes, Route } from "react-router-dom";
import { Favorites } from "./pages/Favorites";
import { Film } from "./pages/Film";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export function RoutesApp() {
  return(
    <Routes>
      <Route path='/' element={ <Home /> }/>
      <Route path='/films/:id' element={ <Film /> }/>
      <Route path='/favorites' element={ <Favorites /> }/>
      <Route path='/*' element={ <NotFound /> }/>
    </Routes>
  );
}