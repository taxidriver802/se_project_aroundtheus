import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }, domElements) {
    super({ popupSelector });

    this._domElements = domElements;
  }

  open({ name, link }) {
    const imageElement = this._domElements.modalImageElement;
    const captionElement = this._domElements.popupImageCaption;

    imageElement.src = link;
    imageElement.alt = name;
    captionElement.textContent = name;

    super.open();
  }
}
