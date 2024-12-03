import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { useState } from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();
  const [loading, setLoading] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    setLoading(true);
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"avatar-button"}
      title={"Cambiar foto de perfil"}
      buttonTitle={loading ? "Guardando..." : "Guardar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__form-input popup__form-input-avatar"
        type="url"
        name="avatar"
        placeholder="Ingrese el nuevo enlace"
        id="avatar"
        required
        ref={avatarRef}
      />
      <span className="form__error_avatar form__error"></span>
    </PopupWithForm>
  );
}
