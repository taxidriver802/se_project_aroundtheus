export default class Popup {
  constructor({ popupSelector }, handleOverlay, removeListeners) {
    this.popupElement = popupSelector;
    this._handleOverlay = handleOverlay;
    this._removeListeners = removeListeners;

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  setEventListeners() {
    // sets event listeners

    document.addEventListener("keydown", this._handleEscClose);

    document.addEventListener("click", this._handleOverlay);
  }

  open(modal) {
    // opens popup

    modal.classList.add("modal_opened");

    this.setEventListeners();
  }

  close(_popupElement) {
    // closes popup

    this.popupElement.classList.remove("modal_opened");

    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlay);
  }

  _handleEscClose(event) {
    // listens for esc button
    if (event.key === "Escape") {
      this.close(this.popupElement);
    }
  }
}
