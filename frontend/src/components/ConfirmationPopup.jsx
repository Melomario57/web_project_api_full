import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmationPopup({
  isOpen,
  onClose,
  onCardDelete,
  card,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    onCardDelete(card._id);
  };

  return (
    <PopupWithForm
      title="¿Estás seguro?"
      name="confirmation-button"
      buttonTitle={loading ? "Eliminando..." : "Si"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
