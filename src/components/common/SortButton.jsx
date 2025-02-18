// New reusable button component for toggling sort order
// Accepts currentOrder prop ('asc' or 'desc') and onToggle callback
// Displays "Sort Z-A" when ascending, "Sort A-Z" when descending

import PropTypes from "prop-types";

export default function SortButton({
  currentOrder = "asc",
  onToggle = () => {},
}) {
  return (
    <button onClick={onToggle} className="sort-button">
      Sort {currentOrder === "asc" ? "Z-A" : "A-Z"}
    </button>
  );
}

SortButton.propTypes = {
  currentOrder: PropTypes.oneOf(["asc", "desc"]).isRequired,
  onToggle: PropTypes.func.isRequired,
};
