const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*---------------------------------------------------------------------*/
/*                             Elements                                */
/*---------------------------------------------------------------------*/
const profileAddEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseModalButton = document.querySelector(
  "#profile-close-modal-button"
);
const popupImageModal = document.querySelector("#popup-image");
const popupImageCloseButton = document.querySelector(
  "#popup-image-close-button"
);
const popupImageCaption = document.querySelector(".modal__caption");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const addNewCardButton = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardCloseModal = document.querySelector("#card-close-modal");
const addCardForm = document.querySelector("#add-card-form");
const addCardFormElement = cardAddModal.querySelector(".modal__form");

let cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
let cardLinkInput = addCardFormElement.querySelector(".modal__input_type_link");
const modalImageElement = popupImageModal.querySelector(".modal__image");

/*---------------------------------------------------------------------*/
/*                             Functions                               */
/*---------------------------------------------------------------------*/

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  // clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  // access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // add click listener to the card image element : cardImage
  // open modal with the preview image modal : previewImageModal
  // visibility: hidden;

  // set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  // set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  // set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  // return the ready HTML element with the filled-in data

  cardImageEl.addEventListener("click", () => {
    modalImageElement.src = cardData.link;
    modalImageElement.alt = cardData.name;
    popupImageCaption.textContent = cardData.name;

    openModal(popupImageModal);
  });

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

/*---------------------------------------------------------------------*/
/*                           Event Handlers                            */
/*---------------------------------------------------------------------*/
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(cardAddModal);
}

/*---------------------------------------------------------------------*/
/*                          Event Listeners                            */
/*---------------------------------------------------------------------*/

popupImageCloseButton.addEventListener("click", () => {
  closeModal(popupImageModal);
});

/* add profile edit button */

profileAddEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(profileEditModal);
});

/* Remove profile edit button */

profileCloseModalButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

/* edit submit */

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

/* add submit */

addCardForm.addEventListener("submit", handleAddCardSubmit);

/* add new card button */

addNewCardButton.addEventListener("click", () => {
  cardTitleInput.value = "";
  cardLinkInput.value = "";
  openModal(cardAddModal);
});

/* remove new card button */

cardCloseModal.addEventListener("click", () => closeModal(cardAddModal));

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
