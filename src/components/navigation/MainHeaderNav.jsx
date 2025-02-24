import { useNavigate } from "react-router-dom";

export default function MainHeaderNav() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <nav className="main-header-nav">
      <button onClick={handleHomeClick} className="nav-button">
        Home
      </button>
    </nav>
  );
}
