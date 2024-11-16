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

// Selectors \\

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const selectors = {
  cardSection: ".cards__list",
  cardTemplate: ".card-template",
};

// DomElements \\

const profileAddEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseModalButton = document.querySelector(
  "#profile-close-modal-button"
);
const addCardForm = document.querySelector("#add-card-form");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const addNewCardButton = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const addCardFormElement = cardAddModal.querySelector(".modal__form");
const popupImageModal = document.querySelector("#popup-image");

const modalImageElement = document.querySelector(".modal__image");
const popupImageCaption = document.querySelector(".modal__caption");

const domElements = {
  profileAddEditButton,
  profileEditModal,
  profileCloseModalButton,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addNewCardButton,
  cardAddModal,
  addCardFormElement,
  popupImageModal,
  modalImageElement,
  popupImageCaption,
  addCardForm,
};

const infoSelector = {
  profileTitle: domElements.profileTitle,
  profileDescription: domElements.profileDescription,
  profileTitleInput: domElements.profileTitleInput,
  profileDescriptionInput: domElements.profileDescriptionInput,
};

window.domElements = domElements;

// Exports \\

export default {
  initialCards,
  config,
  selectors,
  domElements,
  infoSelector,
};
