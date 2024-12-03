import CloseIcon from "../images/Close.png";
import React from "react";
import { useEffect, useRef } from "react";
import FormValidator from "../utils/FormValidator";
export default function PopupWithForm({
  name,
  title,
  buttonTitle,
  isOpen,
  onClose,
  children,
  onSubmit,
  content,
  buttonForm,
  modifier,
}) {
  const formRef = useRef();
  const formConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__form-input",
    submitButtonSelector: ".popup__form-button",
    inactiveButtonClass: "popup__form-button_disabled",
    inputErrorClass: "popup__form-input_invalid",
    errorClass: "form__error-active",
  };
  useEffect(() => {
    const formValidator = new FormValidator(formConfig, formRef.current);
    formValidator.enableValidation();
  }, []);
  return (
    <>
      <section
        className={`popup popup_${name} ${isOpen ? "popup_opened" : ""} `}
      >
        <div className="popup__overlay" onClick={onClose}></div>
        <div className="popup__container">
          <form
            className={`form form_${content} ${
              name === "avatar-button" ? "avatar__form" : ""
            } ${name === "confirmation-button" ? "confirmation__form" : ""} `}
            method="dialog"
            noValidate
            onSubmit={onSubmit}
            ref={formRef}
          >
            <button
              className="popup__button-cross"
              type="button"
              onClick={onClose}
            >
              <img src={CloseIcon} alt="imagén de una cruz" />
            </button>
            <fieldset className="popup__form-fieldset">
              <h3 className={`popup__title popup__title_${modifier}`}>
                {title}
              </h3>
              {children}
              <button
                className={`popup__form-button popup__form-button_${buttonForm}`}
                type="submit"
              >
                {buttonTitle}
              </button>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
