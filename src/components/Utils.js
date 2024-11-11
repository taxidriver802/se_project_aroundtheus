export default class Utils {
  constructor(generateCard, cardSection, addFormValidator, closeCallback) {
    this._generateCard = generateCard;
    this._cardSection = cardSection;
    this._addFormValidator = addFormValidator;
    this._closeCallback = closeCallback;
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

    this._closeCallback();

    setTimeout(() => {
      cardTitleInput.value = "";
      cardLinkInput.value = "";
    }, 500);
  }
}
