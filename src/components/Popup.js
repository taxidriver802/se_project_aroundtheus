export default class Popup {
  constructor(
    { popupSelector },
    handleOverlay,
    removeListeners,
    editProfilePopup
  ) {
    this.popupElement = popupSelector;
    this._handleOverlay = handleOverlay;
    this._removeListeners = removeListeners;
    this._editProfilePopup = editProfilePopup;

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClick);
  }

  open() {
    this.popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this.popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClick);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    this._handleOverlay(event);
  }
}
