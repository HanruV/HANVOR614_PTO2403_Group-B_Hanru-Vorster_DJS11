// Displays "Sort Oldest" when showing newest first
// Displays "Sort Newest" when showing oldest first
import PropTypes from "prop-types";

export default function SortByUpdatedButton({ currentOrder, onToggle }) {
  return (
    <button onClick={onToggle} className="sort-button">
      {currentOrder === "newest" ? "Latest" : "Oldest"}
    </button>
  );
}

SortByUpdatedButton.propTypes = {
  currentOrder: PropTypes.oneOf(["newest", "oldest"]).isRequired,
  onToggle: PropTypes.func.isRequired,
};
