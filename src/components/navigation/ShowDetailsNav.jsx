import PropTypes from "prop-types";

export default function ShowDetailsNav({ onBack }) {
  return (
    <nav className="show-details-nav">
      <button onClick={onBack} className="back-button">
        ← Back to Shows
      </button>
      <button className="seasons-button">Seasons</button>
    </nav>
  );
}

ShowDetailsNav.propTypes = {
  onBack: PropTypes.func.isRequired,
};
