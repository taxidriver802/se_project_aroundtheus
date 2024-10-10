export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick, handleOverlay) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleOverlay = handleOverlay;
  }

  getView() {
    // get card view
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__template")
      .cloneNode(true);

    // consts
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._popupImageModal = document.querySelector("#popup-image");
    this._modalContent = document.querySelector(".modal__content");
    this._modalImageClose = document.querySelector(".js-modal-close");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    // set event listeners
    this._setEventListeners();

    // return the card
    return this._cardElement;
  }

  _setEventListeners() {
    // .card__like-button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    // .card__delete-button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    // handle image click
    setTimeout(() => {
      this._cardImageElement.addEventListener(
        "click",
        () => {
          this._handleImageClick({ name: this._name, link: this._link });
        },
        10
      );
    });

    //handle image popup close
    this._modalImageClose.addEventListener("click", (event) => {
      this._handleOverlay(event);
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /* _closeModal(event) {
    const popupImageModal = document.querySelector("#popup-image");
    const modalContent = document.querySelector(".modal__content");
    if (
      popupImageModal.classList.contains("modal_opened") &&
      !modalContent.contains(event.target)
    ) {
      popupImageModal.classList.remove("modal_opened");
    }
  } */
}
