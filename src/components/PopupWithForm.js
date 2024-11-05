import Popup from "./Popup.js";
import Utils from "./Utils.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, generateCard, cardSection, addFormValidator) {
    super({ popupSelector });
    this._popupForm = document.querySelector(".js-modal-form");

    this._utils = new Utils(generateCard, cardSection, addFormValidator);
  }

  close() {
    // Reset the form before closing
    if (this._popupForm) {
      this._popupForm.reset();
    }
    super.close();
  }
}
