import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector }, domElements, config) {
    super({ popupSelector });
    this.config = config;
    this.domElements = domElements;

    this._profileEditInfo = this._profileEditInfo.bind(this);
  }

  open() {
    if (this.popupElement.id === "profile-edit-modal") {
      this.popupElement
        .querySelector(".js-modal-container")
        .addEventListener("submit", this._profileEditInfo);
    }

    if (this.popupElement.id === "card-add-modal") {
      this.popupElement
        .querySelector("#add-card-form")
        .addEventListener("submit", this.handleAddCardSubmit);
    }

    super.open();
  }

  closeForm() {
    if (this.popupElement.querySelector("#profile-modal-form")) {
      this.popupElement
        .querySelector("#profile-modal-form")
        .removeEventListener("submit", this._profileEditInfo);
    }

    if (this.popupElement.querySelector("#add-card-form")) {
      this.popupElement
        .querySelector("#add-card-form")
        .removeEventListener("submit", this._handleFormSubmit);
    }

    super.close();
  }

  _profileEditInfo(e) {
    const profileEditForm = document.querySelector(
      "#profile-edit-modal .modal__form"
    );

    const name = document.querySelector(".modal__title").value;
    const job = document.querySelector(".modal__description").value;

    if (e.target === profileEditForm) {
      this.userInfo.setUserInfo(name, job);
      this.closeForm();
    }
  }
}
