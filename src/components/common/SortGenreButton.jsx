import { GENRE_MAP } from "../../constants/genres";
import PropTypes from "prop-types";

// A dropdown select component for filtering shows by genre
// Displays a list of available genres from GENRE_MAP
export default function SortGenreButton({ selectedGenre }) {
  const handleChange = (event) => {
    // Placeholder for now to fix the error
    console.log(event.target.value);
  };

  return (
    <select
      value={selectedGenre}
      onChange={handleChange}
      className="sort-genre-select"
    >
      {/* Default option when no genre is selected */}
      <option value="">Genre</option>

      {/* Map through GENRE_MAP to create an option for each genre */}
      {/* Each genre has an ID (key) and an object containing title */}
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
};
