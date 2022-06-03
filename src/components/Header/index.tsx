import { Link } from "react-router-dom";
import './styles.css';

export function Header() {
  return (
    <header>
      <Link className="logo" to='/'>Prime Flix</Link>

      <Link className="fav-link" to='/favorites'>Meus filmes</Link>
    </header>
  )
}