import { popupInstances } from "../pages/index.js";

export default class Popup {
  constructor({ popupSelector }, handleOverlay, editProfilePopup) {
    this.popupElement = popupSelector;
    this._handleOverlay = handleOverlay;
    this._editProfilePopup = editProfilePopup;

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._profileEditInfo = this._profileEditInfo.bind(this);
  }

  setEventListeners() {
    const cardCloseModal = document.querySelector("#card-close-modal");
    const cardAddModal = document.querySelector("#card-add-modal");
    const addCardForm = document.querySelector("#add-card-form");
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("click", this._handleOverlayClick);
    document.addEventListener("submit", this._profileEditInfo);
    addCardForm.addEventListener("submit", (e) =>
      this._utils.handleAddCardSubmit(e)
    );
    cardCloseModal.addEventListener("click", () => this.close(cardAddModal));
  }

  removeEventListener() {
    const cardCloseModal = document.querySelector("#card-close-modal");
    const cardAddModal = document.querySelector("#card-add-modal");
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleOverlayClick);
    document.removeEventListener("submit", this._profileEditInfo);
    cardCloseModal.removeEventListener("click", () => this.close(cardAddModal));
  }

  open() {
    this.popupElement.classList.add("modal_opened");
    this.setEventListeners();
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
    popupInstances.forEach((popupInstance) => {
      const modalElement = popupInstance.popupElement;

      const contentContainer = modalElement.querySelector(
        ".js-modal-container"
      );

      if (modalElement.classList.contains("modal_opened")) {
        if (!contentContainer.contains(event.target)) {
          popupInstance.close();
        } else {
          event.stopPropagation();
        }
      }
    });
  }

  _profileEditInfo(e) {
    const profileEditForm = document.querySelector(
      "#profile-edit-modal .modal__form"
    );

    if (e.target === profileEditForm) {
      this._handleProfileEditSubmit(e);
    }
  }
}
