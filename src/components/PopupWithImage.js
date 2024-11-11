import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }, handleOverlay, domElements) {
    super({ popupSelector }, handleOverlay);

    this._domElements = domElements;
  }

  open({ name, link }) {
    const imageElement = window.domElements.modalImageElement;
    const captionElement = window.domElements.popupImageCaption;

    imageElement.src = link;
    imageElement.alt = name;
    captionElement.textContent = name;

    super.open();
  }
}
