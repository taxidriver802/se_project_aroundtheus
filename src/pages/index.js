import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
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

//////

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const selectors = {
  CardSection: ".cards__list",
  cardTemplate: ".card-template",
};

export const CardSection = new Section(
  {
    items: initialCards, // Set initial cards as items
    renderer: (item) => {
      const cardEl = generateCard(item);
      CardSection.addItem(cardEl);
    },
  },
  selectors.CardSection
);

const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();

const imagePopup = new PopupWithImage({ popupSelector: popupImageModal });

const newCardPopup = new PopupWithForm(
  { popupSelector: cardAddModal },
  generateCard,
  CardSection,
  addFormValidator
);

const editProfilePopup = new PopupWithForm(
  { popupSelector: profileEditModal },
  handleProfileEditSubmit
);

const infoSelector = {
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
};

export const popupInstances = [imagePopup, newCardPopup, editProfilePopup];

const userInfo = new UserInfo(
  infoSelector,
  () => {},
  editProfilePopup,
  popupInstances
);

const handleImageClick = ({ name, link }) => {
  modalImageElement.src = link;
  modalImageElement.alt = name;
  popupImageCaption.textContent = name;

  setTimeout(() => {
    imagePopup.open();
  }, 10);
};

CardSection.renderItems();

/*---------------------------------------------------------------------*/
/*                           Event Handlers                            */
/*---------------------------------------------------------------------*/
function handleProfileEditSubmit(e) {
  userInfo.setUserInfo(e);
}

function generateCard(cardsData) {
  const card = new Card(cardsData, "#card-template", handleImageClick);
  return card.getView();
}

/*---------------------------------------------------------------------*/
/*                          Event Listeners                            */
/*---------------------------------------------------------------------*/

/* add profile edit button */

profileAddEditButton.addEventListener("click", () => {
  setTimeout(() => {
    userInfo.getUserInfo();
    editProfilePopup.open();
  }, 10);
});

/* Remove profile edit button */

profileCloseModalButton.addEventListener("click", () => {
  editProfilePopup.close(profileEditModal);
});

/* add new card button */

addNewCardButton.addEventListener("click", () => {
  setTimeout(() => {
    newCardPopup.open();
  }, 10);
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
