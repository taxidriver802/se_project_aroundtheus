import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;

    this._form = this.popupElement.querySelector(".modal__form");

    this._getInputValues = this._getInputValues.bind(this);
  }

  _getInputValues() {
    const inputList = Array.from(
      this.popupElement.querySelectorAll(".modal__input")
    );

    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });

    return data;
  }
}
