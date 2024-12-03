import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    onUpdateUser({ name, about: description });
  }

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser]);

  const handleInputName = (evt) => {
    setName(evt.target.value);
  };

  const handleInputDescription = (evt) => {
    setDescription(evt.target.value);
  };

  return (
    <PopupWithForm
      name={"edit-profile"}
      title={"Edital perfil"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonTitle={loading ? "Guardando..." : "Guardar"}
    >
      <>
        <input
          className="popup__form-input popup__form-input-name"
          type="text"
          placeholder="Nombre"
          required
          id="name"
          name="name"
          minLength="2"
          maxLength="40"
          onChange={handleInputName}
          value={name}
        />
        <span className="form__error_name form__error"></span>
        <input
          className="popup__form-input popup__form-input-about"
          type="text"
          placeholder="Acerca de mi"
          required
          id="about"
          name="about"
          minLength="2"
          maxLength="200"
          onChange={handleInputDescription}
          value={description}
        />
        <span className="form__error_about form__error"></span>
      </>
    </PopupWithForm>
  );
}
