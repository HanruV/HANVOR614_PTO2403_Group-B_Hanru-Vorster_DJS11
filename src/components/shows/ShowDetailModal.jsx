import PropTypes from "prop-types";

export default function ShowDetailModal({ onClose, show }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => {
          // Prevents the click event from closing the modal if content is clicked
          e.stopPropagation();
        }}
      >
        <h2>Show Details: {show.title}</h2>
        <div
          className="modal-image-background"
          style={{ backgroundImage: `url(${show.image})` }}
        ></div>
        <p>{show.description}</p>
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
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};
