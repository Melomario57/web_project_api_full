import React from "react";
import { Link } from "react-router-dom";
import FormValidator from "../utils/FormValidator";
import { useEffect, useRef } from "react";

export default function Login({ onLogin }) {
  const formRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = evt.target.elements.email.value;
    const password = evt.target.elements.password.value;
    onLogin(email, password).catch(() => {
      console.error("credenciales invalidas");
    });
  };

  useEffect(() => {
    const formValidator = new FormValidator(
      {
        formSelector: ".login__form",
        inputSelector: ".login__form-input",
        submitButtonSelector: ".login__button",
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
      <div className="login">
        <div className="login__header-wrapper">
          <div className="login__header">
            <Link to="/register" className="login__header-register">
              Regístrate
            </Link>
          </div>
          <div className="login__line"></div>
        </div>
        <h2 className="login__title">Inicia Sesión</h2>
        <form className="login__form" onSubmit={handleSubmit} ref={formRef}>
          <fieldset className="login__form-fieldset">
            <input
              className="login__form-input "
              name="email"
              type="email"
              id="email"
              placeholder="Correo electrónico"
              required={true}
            />
            <span className="form__error_email form__error"></span>
            <input
              className="login__form-input"
              name="password"
              type="password"
              id="password"
              placeholder="Contraseña"
              required={true}
            />
            <span className="form__error_password form__error"></span>
            <button type="submit" className="login__button ">
              Inicia Sesión
            </button>
          </fieldset>
        </form>
        <Link className="login__register" to="/register">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </div>
    </>
  );
}
