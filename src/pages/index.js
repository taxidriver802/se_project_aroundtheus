import Card from "../components/Card.js";
import constants from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";

const { domElements, initialCards, selectors, config } = constants;

/*-----------------------------------------------------------------*/
/*                          Instances                              */
/*-----------------------------------------------------------------*/

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = generateCard(item);
      cardSection.addItem(cardEl);
    },
  },
  selectors.cardSection,
  domElements,
  generateCard
);

const addFormValidator = new FormValidator(
  config,
  domElements.addCardFormElement
);

const editFormValidator = new FormValidator(
  config,
  domElements.profileEditForm
);

const imagePopup = new PopupWithImage(
  { popupSelector: "#popup-image" },
  domElements
);

const newCardPopup = new PopupWithForm(
  {
    popupSelector: "#card-add-modal",
  },
  handleAddCardSubmit,
  domElements,
  config
);

const editProfilePopup = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
  },
  ({ name, description }) => {
    userInfo.setUserInfo(name, description);
    editProfilePopup.close();
  },
  domElements,
  config
);

const userInfo = new UserInfo(".profile__title", ".profile__description");

/*-----------------------------------------------------------------*/
addFormValidator.enableValidation();

editFormValidator.enableValidation();

const handleImageClick = ({ name, link }) => {
  imagePopup.open({ name, link });
  imagePopup.setEventListeners();
};

cardSection.renderItems();

/*---------------------------------------------------------------------*/
/*                           Event Handler                             */
/*---------------------------------------------------------------------*/

export function generateCard(cardsData) {
  const card = new Card(
    cardsData,
    "#card-template",
    handleImageClick,
    domElements
  );

  return card.getView();
}

function handleAddCardSubmit({ name, description }) {
  const newCardInfo = {
    name: name,
    link: description,
  };

  const cardElement = generateCard(newCardInfo);
  cardSection.addItem(cardElement);

  newCardPopup.close();

  setTimeout(() => {
    domElements.addCardFormElement.reset();
  }, 1);
}

/*---------------------------------------------------------------------*/
/*                          Event Listeners                            */
/*---------------------------------------------------------------------*/

/* add profile edit button */

domElements.profileAddEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  domElements.profileTitleInput.value = userData.title;
  domElements.profileDescriptionInput.value = userData.description;

  editProfilePopup.open();
});
editProfilePopup.setEventListeners();

/* add new card button */

domElements.addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
newCardPopup.setEventListeners();

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
