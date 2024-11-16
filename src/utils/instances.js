import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import constants from "./constants.js";
import Section from "../components/Section.js";

import { generateCard } from "../pages/index.js";

const { config, domElements, initialCards, selectors, infoSelector } =
  constants;

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = generateCard(item);
      cardSection.addItem(cardEl);
    },
  },
  selectors.cardSection
);

const addFormValidator = new FormValidator(
  config,
  domElements.addCardFormElement
);

const editFormValidator = new FormValidator(
  config,
  domElements.profileEditForm
);

const imagePopup = new PopupWithImage({
  popupSelector: document.querySelector("#popup-image"),
  null: null,
  domElements,
});

window.imagePopup = imagePopup;

const newCardPopup = new PopupWithForm(
  { popupSelector: domElements.cardAddModal },
  generateCard,
  cardSection,
  addFormValidator,
  null
);

const editProfilePopup = new PopupWithForm(
  { popupSelector: domElements.profileEditModal },
  generateCard,
  null,
  null,
  null // Temporary placeholder for userInfo
);

const userInfo = new UserInfo(infoSelector, () => {}, null, generateCard);

editProfilePopup.userInfo = userInfo;

export default {
  addFormValidator,
  editFormValidator,
  imagePopup,
  newCardPopup,
  editProfilePopup,
  cardSection,
};

window.editProfilePopup = editProfilePopup;
