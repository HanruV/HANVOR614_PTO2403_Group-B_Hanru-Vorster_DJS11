import PropTypes from "prop-types";

export default function ShowDetailModal({ onClose, show }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Show Details</h2>
        <img src={show.image} />
      </div>
    </div>
  );
}

ShowDetailModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.shape({
    image: PropTypes.shape({
      image: PropTypes.string,
    }),
  }),
};
