export default class Card {
  constructor(
    cardsData,
    cardSelector,
    handleImageClick,
    domElements,
    handleDeleteCallback,
    handleLikeCallback
  ) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._id = cardsData._id;
    this.cardsData = cardsData;

    this.isLiked = cardsData.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this.domElements = domElements;

    this._handleDeleteCallback = handleDeleteCallback.bind(this);
    this._handleLikeCallback = handleLikeCallback.bind(this);
  }

  getView() {
    // Get the template element based on the selector
    const templateElement = document.querySelector(this._cardSelector);

    // Clone the content of the template
    this._cardElement = templateElement.content
      .querySelector(".card")
      .cloneNode(true);

    // Populate the card data
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    this._isLiked();

    // Set event listeners

    this._setEventListeners();

    // Return the card element

    return this._cardElement;
  }

  _isLiked() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  _setEventListeners() {
    // .card__delete-button
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCallback(this._id, this._cardElement);
      });

    // .card__like-button
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        console.log(this._id, this._cardElement);

        this._handleLikeCallback(this._id, this._cardElement);
      });

    // handle image click
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }
}
