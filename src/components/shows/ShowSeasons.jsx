import { useNavigate, useParams } from "react-router-dom";

export default function ShowSeasons() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(`/show/${id}`);
  };

  return (
    <div className="show-details">
      <nav className="show-details-nav">
        <button onClick={handleBack} className="back-button">
          ← Back to Show Details
        </button>
      </nav>
      <h2>Show Seasons</h2>
    </div>
  );
}
