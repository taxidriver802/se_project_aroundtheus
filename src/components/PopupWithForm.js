import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit, domElements, config) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this.config = config;
    this.domElements = domElements;

    this._form = this.popupElement.querySelector(".modal__form");

    this._getInputValues = this._getInputValues.bind(this);
  }

  open() {
    this.setEventListener();

    super.open();
  }

  closeForm() {
    /* this._form.reset(); */

    this.removeEventListeners();

    super.close();
  }

  setEventListener() {
    this.popupElement.addEventListener("submit", this._getInputValues);
  }

  removeEventListeners() {
    this.popupElement.removeEventListener("submit", this._getInputValues);
  }

  _getInputValues() {
    const inputList = Array.from(
      this.popupElement.querySelectorAll(".modal__input")
    );

    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    // Adjusted to dynamically use keys from data

    this._handleFormSubmit({
      name: data.name,
      description: data.description,
    });
  }
}
