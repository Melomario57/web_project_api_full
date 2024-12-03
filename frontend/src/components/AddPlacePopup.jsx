import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const titleRef = useRef();
  const linkRef = useRef();
  const [loading, setLoading] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    onAddPlaceSubmit({
      name: titleRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"add-button"}
      title={"Nuevo lugar"}
      buttonTitle={loading ? "Creando..." : "crear"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          className="popup__form-input popup__form-input-name"
          type="text"
          placeholder="Título"
          id="title"
          name="title"
          minLength="2"
          maxLength="30"
          required
          ref={titleRef || ""}
        />
        <span className="form__error_title form__error"></span>
        <input
          className="popup__form-input popup__form-input-about"
          type="url"
          name="link"
          placeholder="Enlace a la imagen"
          id="link"
          required
          ref={linkRef || ""}
        />
        <span className="form__error_link form__error"></span>
      </>
    </PopupWithForm>
  );
}
