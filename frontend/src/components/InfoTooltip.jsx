import React from "react";
import CloseIcon from "../images/Close.png";
import registerGood from "../images/allowed.png";
import registerError from "../images/notAllowed.png";

export default function InfoToolTip({ open, isRegistered, handleClose }) {
  return (
    <div className={`popup popup-register ${open ? "popup_opened" : ""}`}>
      <div className="popup__overlay"></div>

      <div className="popup__wrapper-register">
        <img
          className="popup__image-register"
          src={isRegistered ? registerGood : registerError}
          alt="status"
        />

        <button
          type="button"
          className="popup__button-cross"
          onClick={handleClose}
        >
          <img src={CloseIcon} alt="imagén de una cruz" />
        </button>

        <p className="popup_register-title">
          {isRegistered
            ? "¡Correcto! Ya estás registrado."
            : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
        </p>
      </div>
    </div>
  );
}
