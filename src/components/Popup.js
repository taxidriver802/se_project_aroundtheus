export default class Popup {
  constructor({ popupSelector }) {
    this.popupElement = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleCloseClick = () => this.close();
  }

  setFormSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }

  setEventListeners(element) {
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClick);
    document.addEventListener("submit", this._profileEditInfo);

    if (element) {
      element.addEventListener("submit", this._handleFormSubmit);
    }
    this.popupElement.querySelectorAll(".modal__close").forEach((button) => {
      button.addEventListener("click", this._handleCloseClick);
    });
  }

  removeEventListener(element) {
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClick);
    document.removeEventListener("submit", this._profileEditInfo);
    if (element) {
      element.removeEventListener("submit", this._handleFormSubmit);
    }
    this.popupElement.querySelectorAll(".modal__close").forEach((button) => {
      button.removeEventListener("click", this._handleCloseClick);
    });
  }

  open(element) {
    this.popupElement.classList.add("modal_opened");

    setTimeout(() => {
      this.setEventListeners(element);
    }, 250);
  }

  close(element) {
    this.popupElement.classList.remove("modal_opened");
    this.removeEventListener(element);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(e) {
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
