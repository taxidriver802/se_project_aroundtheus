export default class Popup {
  constructor({ popupSelector }, handleOverlay) {
    this.popupElement = popupSelector;
    this._handleOverlay = handleOverlay;

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);

    this._handleCloseClick = () => this.close();
    this._handleProfileCloseClick = () => {
      this.close();
    };

    this._handleFormSubmit = null;
  }

  setFormSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }

  setEventListeners() {
    const cardCloseModal = document.querySelector("#card-close-modal");
    const addCardForm = document.querySelector("#add-card-form");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClick);
    document.addEventListener("submit", this._profileEditInfo);
    addCardForm.addEventListener("submit", this._handleFormSubmit);
    cardCloseModal.addEventListener("click", this._handleCloseClick);
    domElements.profileCloseModalButton.addEventListener(
      "click",
      this._handleProfileCloseClick
    );
    domElements.profileAddEditButton.addEventListener(
      "click",
      this._handleProfileEditButtonClick
    );
  }

  removeEventListener() {
    const cardCloseModal = document.querySelector("#card-close-modal");
    const addCardForm = document.querySelector("#add-card-form");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClick);
    document.removeEventListener("submit", this._profileEditInfo);
    addCardForm.removeEventListener("submit", this._handleFormSubmit);
    cardCloseModal.removeEventListener("click", this._handleCloseClick);
    domElements.profileCloseModalButton.removeEventListener(
      "click",
      this._handleProfileCloseClick
    );
    domElements.profileAddEditButton.removeEventListener(
      "click",
      this._handleProfileEditButtonClick
    );
  }

  open() {
    this.popupElement.classList.add("modal_opened");

    setTimeout(() => {
      this.setEventListeners();
    }, 250);
  }

  close() {
    this.popupElement.classList.remove("modal_opened");
    this.removeEventListener();
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    const contentContainer = this.popupElement.querySelector(
      ".js-modal-container"
    );

    if (this.popupElement.classList.contains("modal_opened")) {
      if (!contentContainer.contains(event.target)) {
        this.close();
      } else {
        event.stopPropagation();
      }
    }
  }
}
