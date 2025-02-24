import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <h1 onClick={handleTitleClick} style={{ cursor: "pointer" }}>
        MyListeningPod
      </h1>
    </header>
  );
}
