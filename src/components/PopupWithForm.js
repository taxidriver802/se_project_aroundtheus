import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit, domElements) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this.domElements = domElements;

    this._form = this.popupElement.querySelector(".modal__form");

    this._getInputValues = this._getInputValues.bind(this);
  }

  setEventListeners() {
    super.setEventListener();
    this.popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  _getInputValues() {
    const inputList = Array.from(
      this.popupElement.querySelectorAll(".modal__input")
    );

    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data; // return the gathered data
  }
}
