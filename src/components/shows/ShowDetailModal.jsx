import PropTypes from "prop-types";

export default function ShowDetailModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Show Details</h2>
      </div>
    </div>
  );
}

ShowDetailModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
