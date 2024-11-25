export default class Popup {
  constructor({ popupSelector }) {
    this.popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleCloseClick = () => this.close();
  }

  setEventListeners() {
    this.popupElement
      .querySelector(".modal__close")
      .addEventListener("click", this._handleCloseClick);
  }

  open() {
    this.popupElement.classList.add("modal_opened");

    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClick);
  }

  close() {
    this.popupElement.classList.remove("modal_opened");

    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClick);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(e) {
    if (e.target.classList.contains("modal_opened")) {
      this.close();
    }
  }
}
