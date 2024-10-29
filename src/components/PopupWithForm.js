import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, handleOverlay, removeListeners) {
    super({ popupSelector }, handleOverlay, removeListeners);
    this._popupForm = document.querySelector(".js-modal-form");
  }

  close() {
    // Reset the form before closing
    if (this._popupForm) {
      this._popupForm.reset();
    }
    super.close();
  }
}
