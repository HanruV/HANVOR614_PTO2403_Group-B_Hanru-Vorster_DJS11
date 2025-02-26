import PropTypes from "prop-types";

// Button component for toggling date sort order
// Displays "Sort Oldest" when showing newest first
// Displays "Sort Newest" when showing oldest first
export default function SortByUpdatedButton({ currentOrder, onToggle }) {
  return (
    <button onClick={onToggle} className="sort-button">
      {currentOrder === "newest" ? "Latest" : "Oldest"}
    </button>
  );
}

// Type checking for component props
SortByUpdatedButton.propTypes = {
  currentOrder: PropTypes.oneOf(["newest", "oldest"]).isRequired,
  onToggle: PropTypes.func.isRequired,
};
