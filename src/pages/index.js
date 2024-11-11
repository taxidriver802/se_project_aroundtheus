import Card from "../components/Card.js";

import constants from "../utils/constants.js";
import instances from "../utils/instances.js";
import "./index.css";

const { domElements } = constants;
const {
  addFormValidator,
  editFormValidator,
  imagePopup,
  newCardPopup,
  editProfilePopup,
  cardSection,
} = instances;

addFormValidator.enableValidation();

editFormValidator.enableValidation();

/* const infoSelector = {
  profileTitle: domElements.profileTitle,
  profileDescription: domElements.profileDescription,
  profileTitleInput: domElements.profileTitleInput,
  profileDescriptionInput: domElements.profileDescriptionInput,
}; */

window.popupInstances = [imagePopup, newCardPopup, editProfilePopup];

/* const userInfo = new UserInfo(
  infoSelector,
  () => {},
  editProfilePopup,
  popupInstances,
  generateCard
); */

const handleImageClick = ({ name, link }) => {
  imagePopup.open({ name, link });
};

cardSection.renderItems();

/*---------------------------------------------------------------------*/
/*                           Event Handlers                            */
/*---------------------------------------------------------------------*/
export function handleProfileEditSubmit(e) {
  userInfo.setUserInfo(e, this);
}

export function generateCard(cardsData) {
  const card = new Card(cardsData, "#card-template", handleImageClick);
  return card.getView();
}

/*---------------------------------------------------------------------*/
/*                          Event Listeners                            */
/*---------------------------------------------------------------------*/

/* add profile edit button */

domElements.profileAddEditButton.addEventListener("click", () => {
  editProfilePopup.handleProfileEditButtonClick();
  setTimeout(() => {
    editProfilePopup.open();
  }, 10);
});

/* add new card button */

domElements.addNewCardButton.addEventListener("click", () => {
  setTimeout(() => {
    newCardPopup.open();
  }, 10);
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
