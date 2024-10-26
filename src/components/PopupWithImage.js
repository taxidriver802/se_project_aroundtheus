import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, handleOverlay, removeListeners) {
    super({ popupSelector });
    this._popupSelector = popupSelector;
    this._handleOverlay = handleOverlay;
  }

  open(data) {
    // set the image's src and alt
    const imageSrc = this._popupSelector.src;
    const imageAlt = this._popupSelector.alt;

    // set the caption's textContent
    const imageCaption = this._popupSelector.alt;

    document.addEventListener("click", this._handleOverlay);

    super.open(this._popupSelector);
  }
}
