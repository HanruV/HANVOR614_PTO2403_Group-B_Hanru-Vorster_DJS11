// A dropdown select component that displays all available genres
import { GENRE_MAP } from "../../constants/genres";
import PropTypes from "prop-types";

export default function SortGenreButton({ selectedGenre, onGenreChange }) {
  // When a new genre is selected, pass the value to the parent component
  const handleChange = (event) => {
    onGenreChange(event.target.value);
  };

  return (
    <select
      value={selectedGenre}
      onChange={handleChange}
      className="sort-genre-select"
    >
      {/* Default option - shows all genres when selected */}
      <option value="">Genre</option>

      {/* Creates an option for each genre in GENRE_MAP */}
      {Object.entries(GENRE_MAP).map(([id, genre]) => (
        <option key={id} value={id}>
          {genre.title}
        </option>
      ))}
    </select>
  );
}

SortGenreButton.propTypes = {
  selectedGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired,
};
