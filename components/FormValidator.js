export default class FormValidator {
  constructor(settings, formElement) {
    //
    this._form = formElement;
    //
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _setEventListeners() {
    const { inputSelector, submitButtonSelector } = settings;
    const inputEls = [...this._form.querySelectorAll(inputSelector)];
    const submitButton = this._form.querySelector(submitButtonSelector);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._form, inputEl, settings);
        toggleButtonState(inputEls, submitButton, settings);
      });
    });
  }

  _enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(this._form, settings);
  }
}

/* const editFormValidator = new FormValidator();
editFormValidator.enableValidation(); */
