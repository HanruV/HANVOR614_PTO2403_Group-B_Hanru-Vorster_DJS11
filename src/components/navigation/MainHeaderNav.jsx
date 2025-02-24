import { Link } from "react-router-dom";

export default function MainHeaderNav() {
  return (
    <nav className="main-header-nav">
      <Link to="/" className="home-nav-button">
        Home
      </Link>
      <Link to="/favorites" className="home-nav-button">
        Favorites
      </Link>
    </nav>
  );
}
