export default class Utils {
  constructor(generateCard, cardSection, addFormValidator) {
    this._generateCard = generateCard;
    this._cardSection = cardSection;
    this._addFormValidator = addFormValidator;
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

    this._cardSection.addItem(cardElement);

    cardTitleInput.value = "";
    cardLinkInput.value = "";

    this._addFormValidator.disableButton();

    cardAddModal.classList.remove("modal_opened");
  }
}
