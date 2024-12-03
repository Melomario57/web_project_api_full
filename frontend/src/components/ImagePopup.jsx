import CloseIcon from "../images/Close.png";

export default function ImagePopup({ selectedCard, onClose }) {
  if (!selectedCard) {
    return null;
  }
  return (
    <section className={selectedCard ? "popup  popup_opened" : ""}>
      <div className="popup__overlay" onClick={onClose}></div>
      <div className=" popup__container">
        <div className="popup__image-container-group">
          <button
            id="imageCross"
            className="popup__button-cross"
            type="button"
            onClick={onClose}
          >
            <img src={CloseIcon} alt="imagén de una cruz" />
          </button>
          <img src={selectedCard.link} alt="" className="popup__image-big" />
          <p className="popup__image-title">{selectedCard.name}</p>
        </div>
      </div>
    </section>
  );
}
