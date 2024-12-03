import React from "react";
import { Link } from "react-router-dom";
import FormValidator from "../utils/FormValidator";

import { useEffect, useRef } from "react";
export default function Register({ onRegister }) {
  const formRef = useRef();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.elements.email.value;
    const password = evt.target.elements.password.value;
    onRegister(email, password).catch(() => {
      console.error("credenciales invalidas");
    });
  };

  useEffect(() => {
    const formValidator = new FormValidator(
      {
        formSelector: ".register__form",
        inputSelector: ".register__form-input",
        submitButtonSelector: ".register__button",
        inactiveButtonClass: "popup__form-button_disabled",
        inputErrorClass: "popup__form-input_invalid",
        errorClass: "form__error-active",
      },
      formRef.current
    );
    formValidator.enableValidation();
  }, []);

  return (
    <>
      <div className="register">
        <div className="register__header-wrapper">
          <div className="register__header">
            <Link to="/login" className="register__header-login">
              Inicia Sesión
            </Link>
          </div>
          <div className="register__line"></div>
        </div>
        <h2 className="register__title">Regístrate</h2>
        <form className="register__form " onSubmit={handleSubmit} ref={formRef}>
          <fieldset className="register__form-fieldset">
            <input
              className="register__form-input"
              name="email"
              type="email"
              id="email"
              placeholder="Correo electrónico"
              required={true}
            />
            <span className="form__error_email form__error"></span>
            <input
              className="register__form-input"
              name="password"
              type="password"
              id="password"
              placeholder="Contraseña"
              required={true}
            />
            <span className="form__error_password form__error"></span>
            <button type="submit" className="register__button">
              Regístrate
            </button>
          </fieldset>
        </form>
        <Link className="register__login" to="/login">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </div>
    </>
  );
}
