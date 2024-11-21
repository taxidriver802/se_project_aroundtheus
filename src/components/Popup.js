export default class Popup {
  constructor({ popupSelector }) {
    this.popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleCloseClick = () => this.close();
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClick);
    this.popupElement
      .querySelector(".modal__close")
      .addEventListener("click", this._handleCloseClick);
  }

  removeEventListener() {
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClick);
    this.popupElement
      .querySelector(".modal__close")
      .removeEventListener("click", this._handleCloseClick);
  }

  open() {
    this.popupElement.classList.add("modal_opened");

    this.setEventListeners();
  }

  close() {
    this.popupElement.classList.remove("modal_opened");
    this.removeEventListener();
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
