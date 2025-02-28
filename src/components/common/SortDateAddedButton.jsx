// Displays "Sort Latest" when showing newest first
// Displays "Sort Oldest" when showing oldest first
import PropTypes from "prop-types";

export default function SortDateAddedButton({ currentOrder, onToggle }) {
  return (
    <button onClick={onToggle} className="sort-button">
      {/* Display text based on current sort order */}
      {currentOrder === "newest" ? "Latest" : "Oldest"}
    </button>
  );
}

SortDateAddedButton.propTypes = {
  currentOrder: PropTypes.oneOf(["newest", "oldest"]).isRequired,
  onToggle: PropTypes.func.isRequired,
};
