import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    { popupSelector },
    domElements,
    config,
    addItemCallback,
    generateCardCallback
  ) {
    super({ popupSelector });
    this.config = config;
    this.domElements = domElements;

    this.addItemCallback = addItemCallback;
    this.generateCardCallback = generateCardCallback;

    this.handleAddCardSubmit = this.handleAddCardSubmit.bind(this);
    this.setFormSubmitHandler(this.handleAddCardSubmit);

    this._profileEditInfo = this._profileEditInfo.bind(this);
  }

  open() {
    if (this.popupElement.querySelector(".js-modal-container")) {
      this.popupElement
        .querySelector(".js-modal-container")
        .addEventListener("submit", this._profileEditInfo);
    }

    if (this.popupElement.querySelector("#add-card-form")) {
      this.popupElement
        .querySelector("#add-card-form")
        .addEventListener("submit", this._handleFormSubmit);
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

  handleAddCardSubmit(e) {
    e.preventDefault();

    const cardsData = {
      name: this.domElements.cardTitleInput.value,
      link: this.domElements.cardLinkInput.value,
    };

    const cardElement = this.generateCardCallback(cardsData);

    this.addItemCallback(cardElement);

    this.closeForm();

    this.domElements.cardTitleInput.value = "";
    this.domElements.cardLinkInput.value = "";
  }
}
