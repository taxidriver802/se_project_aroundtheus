export default class Card {
  constructor(
    cardsData,
    cardSelector,
    api,
    handleImageClick,
    domElements,
    handleDeleteCallback
  ) {
    this._name = cardsData.name;
    this._link = cardsData.link;
    this._id = cardsData._id;

    this.isLiked = cardsData.isLiked;
    this._cardSelector = cardSelector;
    this._api = api;
    this._handleImageClick = handleImageClick;
    this.domElements = domElements;

    this._handleDeleteCallback = handleDeleteCallback.bind(this);
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
    this.likeButton = this._cardElement.querySelector(".card__like-button");
    this.deleteButton = this._cardElement.querySelector(".card__delete-button");

    this._isLiked();

    // Set event listeners

    this._setEventListeners();

    // Return the card element

    return this._cardElement;
  }

  _isLiked() {
    if (this.isLiked) {
      this.likeButton.classList.add("card__like-button_active");
    }
  }

  _setEventListeners() {
    // .card__delete-button
    this.deleteButton.addEventListener("click", () => {
      this._handleDeleteCallback();
    });

    // .card__like-button
    this.likeButton.addEventListener("click", () => {
      this.toggleLike(this._id, this.isLiked);
    });

    // handle image click
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  toggleLike() {
    this._api
      .toggleLike(this._id, this.isLiked)
      .then((updatedCardData) => {
        this.isLiked = updatedCardData.isLiked;
        this._updateLikeButton();
      })
      .catch((err) => {
        console.error("Error toggling like:", err);
        alert("Unable to toggle like. Please try again.");
      });
  }

  _updateLikeButton() {
    this.likeButton.classList.toggle("card__like-button_active", this.isLiked);
  }

  deleteCard(e) {
    e.preventDefault();
    console.log("work");

    this._api
      .deleteCard(this._id)
      .then(() => {
        cardElement.remove();
        confirmDeletePopup.close();
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
        alert("Unable to delete card. Please try again.");
      });
  }
}
