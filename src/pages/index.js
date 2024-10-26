import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import "./index.css";

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

const popupImageCloseButton = document.querySelector(
  "#popup-image-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const addNewCardButton = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const cardCloseModal = document.querySelector("#card-close-modal");
const addCardForm = document.querySelector("#add-card-form");
const addCardFormElement = cardAddModal.querySelector(".modal__form");

const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardLinkInput = addCardFormElement.querySelector(
  ".modal__input_type_link"
);
const popupImageModal = document.querySelector("#popup-image");
const modals = [profileEditModal, cardAddModal, popupImageModal];
const jsModalContainers = document.querySelectorAll(".js-modal-container");
const cardList = document.querySelector(".cards__list");

const modalImageElement = document.querySelector(".modal__image");
const popupImageCaption = document.querySelector(".modal__caption");

const removeListeners = () => {
  document.removeEventListener("click", handleOverlay);
};
//////

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();

const imagePopup = new PopupWithImage(
  popupImageModal,
  handleOverlay,
  removeListeners
);

const newCardPopup = new PopupWithForm(
  cardAddModal,
  handleOverlay,
  removeListeners
);

const editProfilePopup = new PopupWithForm(
  profileEditModal,
  handleOverlay,
  removeListeners
);

/* const cardSection = new Section({ renderer: () => {}, selector: }); */

const handleImageClick = ({ name, link }) => {
  modalImageElement.src = link;
  modalImageElement.alt = name;
  popupImageCaption.textContent = name;

  setTimeout(() => {
    imagePopup.open(popupImageModal);
  }, 10);
};

initialCards.forEach((cardsData) => {
  createCard(cardsData);
});

/*---------------------------------------------------------------------*/
/*                             Functions                               */
/*---------------------------------------------------------------------*/

function closeModal(modal) {
  modal.classList.remove("modal_opened");

  /* removeListeners(); */
}

function handleOverlay(event) {
  modals.forEach((modal, index) => {
    const modalContainer = jsModalContainers[index];

    if (
      modal.classList.contains("modal_opened") &&
      !modalContainer.contains(event.target)
    ) {
      closeModal(modal);
    }
  });
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

  const cardsData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  createCard(cardsData);

  cardTitleInput.value = "";
  cardLinkInput.value = "";

  addFormValidator.disableButton();

  closeModal(cardAddModal);
}

function createCard(cardsData) {
  const cardElement = generateCard(cardsData);
  cardList.prepend(cardElement);
}

function generateCard(cardsData) {
  const card = new Card(
    cardsData,
    "#card-template",
    handleImageClick,
    handleOverlay
  );
  return card.getView();
}

/*---------------------------------------------------------------------*/
/*                          Event Listeners                            */
/*---------------------------------------------------------------------*/

popupImageCloseButton.addEventListener("click", () => {
  closeModal(popupImageModal);
});

/* add profile edit button */

profileAddEditButton.addEventListener("click", () => {
  setTimeout(() => {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;

    editProfilePopup.open(profileEditModal);
  }, 10);
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
  setTimeout(() => {
    newCardPopup.open(cardAddModal);
  }, 10);
});

/* remove new card button */

cardCloseModal.addEventListener("click", () => closeModal(cardAddModal));

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
