import PropTypes from "prop-types";

// Button component for toggling date sort order in favorites list
// Displays "Latest" when showing newest first
// Displays "Oldest" when showing oldest first
export default function SortDateAddedButton({ currentOrder, onToggle }) {
  return (
    <button onClick={onToggle} className="sort-button">
      {/* Display text based on current sort order */}
      {currentOrder === "newest" ? "Latest" : "Oldest"}
    </button>
  );
}

// Type checking for component props
SortDateAddedButton.propTypes = {
  currentOrder: PropTypes.oneOf(["newest", "oldest"]).isRequired, // currentOrder must be 'newest' or 'oldest'
  onToggle: PropTypes.func.isRequired, // onToggle must be a function
};
