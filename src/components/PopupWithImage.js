import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }, handleOverlay, generateCard) {
    super({ popupSelector }, handleOverlay);
    this._popupSelector = popupSelector;
    this._handleOverlay = handleOverlay;
    this._generateCard = generateCard;
  }

  open() {
    super.open(this._popupSelector);
  }
}
