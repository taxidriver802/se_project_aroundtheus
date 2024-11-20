export default class Popup {
  constructor({ popupSelector }) {
    this.popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleCloseClick = () => this.close();
  }

  setFormSubmitHandler(handler) {
    this._handleFormSubmit = handler;
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
    const addButton = document.querySelector(".profile__add-button");
    const editButton = document.querySelector(".profile__edit-button");
    const imageClick = document.querySelector(".card__image");

    if (
      e.target === addButton ||
      e.target === editButton ||
      e.target === imageClick
    )
      return;

    const contentContainer = this.popupElement.querySelector(
      ".js-modal-container"
    );

    if (this.popupElement.classList.contains("modal_opened")) {
      if (!contentContainer.contains(e.target)) {
        this.close();
      } else {
        e.stopPropagation();
      }
    }
  }
}
