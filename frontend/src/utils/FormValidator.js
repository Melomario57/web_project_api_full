export default class FormValidator {
  constructor(formConfig, form) {
    this.formSelector = formConfig.formSelector;
    this.inputSelector = formConfig.inputSelector;
    this.submitButtonSelector = formConfig.submitButtonSelector;
    this.inactiveButtonClass = formConfig.inactiveButtonClass;
    this.inputErrorClass = formConfig.inputErrorClass;
    this.errorClass = formConfig.errorClass;
    this._formElement = form;
    this._submitButton = this._formElement.querySelector(
      formConfig.submitButtonSelector
    );
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.form__error_${inputElement.name}`
    );
    inputElement.classList.add(this.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.form__error_${inputElement.name}`
    );
    inputElement.classList.remove(this.inputErrorClass);
    errorElement.classList.remove(this.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this.inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(this.inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this.inputList = Array.from(
      this._formElement.querySelectorAll(this.inputSelector)
    );
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
