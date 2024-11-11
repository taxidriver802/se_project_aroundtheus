import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    { popupSelector },
    generateCard,
    cardSection,
    addFormValidator,
    userInfo
  ) {
    super({ popupSelector });
    this.userInfo = userInfo;

    this._generateCard = generateCard;
    this._cardSection = cardSection;
    this._addFormValidator = addFormValidator;

    this.handleAddCardSubmit = this.handleAddCardSubmit.bind(this);

    this._profileEditInfo = this._profileEditInfo.bind(this);
    this.handleProfileEditButtonClick =
      this.handleProfileEditButtonClick.bind(this);

    this.setFormSubmitHandler(this.handleAddCardSubmit);
  }

  _profileEditInfo(e) {
    const profileEditForm = document.querySelector(
      "#profile-edit-modal .modal__form"
    );

    if (e.target === profileEditForm) {
      this.userInfo.setUserInfo(e, this);
    }
  }

  handleProfileEditButtonClick() {
    this.userInfo.getUserInfo();
  }

  handleAddCardSubmit(e) {
    const cardAddModal = document.querySelector("#card-add-modal");
    const addCardFormElement = cardAddModal.querySelector(".modal__form");
    const cardTitleInput = addCardFormElement.querySelector(
      ".modal__input_type_title"
    );
    const cardLinkInput = addCardFormElement.querySelector(
      ".modal__input_type_link"
    );
    e.preventDefault();

    const cardsData = {
      name: cardTitleInput.value,
      link: cardLinkInput.value,
    };

    const cardElement = this._generateCard(cardsData);

    if (this._cardSection) {
      this._cardSection.addItem(cardElement);
    }

    this._addFormValidator.disableButton();

    this.close();

    setTimeout(() => {
      cardTitleInput.value = "";
      cardLinkInput.value = "";
    }, 500);
  }

  close() {
    super.close();
  }
}
