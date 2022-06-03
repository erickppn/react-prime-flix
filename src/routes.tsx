import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Favorites } from "./pages/Favorites";
import { Film } from "./pages/Film";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

export function RoutesApp() {
  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/film/:id' element={ <Film /> }/>
        <Route path='/favorites' element={ <Favorites /> }/>
        <Route path='/*' element={ <NotFound /> }/>
      </Routes>
    </BrowserRouter>
  );
}