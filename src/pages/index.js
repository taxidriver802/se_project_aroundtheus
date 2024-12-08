import Card from "../components/Card.js";
import constants from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import "./index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const { domElements, selectors, config } = constants;

/*-----------------------------------------------------------------*/
/*                          Instances                              */
/*-----------------------------------------------------------------*/

const cardSection = new Section(
  {
    items: [],
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
  domElements.profileImageEditForm
);

const profileImageValidator = new FormValidator(
  config,
  domElements.profileImageEditForm
);
profileImageValidator.disableButton();

const profileImagePopup = new PopupWithForm(
  {
    popupSelector: "#profile-image-edit-modal",
  },
  (data) => profileImageUpdater(data),
  domElements
);

const newCardPopup = new PopupWithForm(
  {
    popupSelector: "#card-add-modal",
  },
  (renamedData) => handleAddCardSubmitApi(renamedData),
  domElements
);

const editProfilePopup = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
  },
  (profileData) => apiAddUserInfo(profileData),
  domElements
);

const confirmDeletePopup = new PopupWithConfirmation(
  {
    popupSelector: "#delete-card-confirmation",
  },
  (id, cardElement) => cardDeleteCallback(id, cardElement),
  domElements
);

const imagePopup = new PopupWithImage(
  { popupSelector: "#popup-image" },
  domElements
);

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image",
  domElements
);

/*-----------------------------------------------------------------*/
addFormValidator.enableValidation();

editFormValidator.enableValidation();

profileImageValidator.enableValidation();

const handleImageClick = ({ name, link }) => {
  imagePopup.open({ name, link });
};

/*---------------------------------------------------------------------*/
/*                           Event Handler                             */
/*---------------------------------------------------------------------*/

export function generateCard(cardsData) {
  const card = new Card(
    cardsData,
    "#card-template",
    handleImageClick,
    domElements,
    () => confirmDeletePopup.open(cardsData._id, card._cardElement),
    () => cardLikeCallback(cardsData._id, card.isLiked, card._cardElement)
  );

  return card.getView();
}

function cardLikeCallback(_id, isLiked, cardElement) {
  api
    .toggleLike(_id, isLiked)
    .then((updatedCardData) => {
      const likeButton = cardElement.querySelector(".card__like-button");

      if (likeButton) {
        likeButton.classList.toggle("card__like-button_active");
      } else {
        console.error("Like button not found for card with ID:", _id);
      }
    })
    .catch((err) => {
      console.error("Error toggling like:", err);
      alert("Unable to toggle like. Please try again.");
    });
}

function cardDeleteCallback(id, cardElement) {
  handleDeleteCard(id, cardElement);
  confirmDeletePopup.close();
}

function renderLoading(isLoading, buttonElement, loadingText = "Saving...") {
  const initialText = buttonElement.name;

  if (isLoading) {
    buttonElement.textContent = loadingText;
  } else {
    buttonElement.textContent = initialText;
  }
}

domElements.profileImage.addEventListener("click", () => {
  profileImagePopup.open();
});

function profileImageUpdater(data) {
  const avatarUrl = data.avatar;
  const submitButtonApi = domElements.profileImageEditButton;
  renderLoading(true, submitButtonApi);
  api
    .updateApiUserAvatar(avatarUrl)
    .then((data) => {
      domElements.profileImage.src = avatarUrl;
      profileImagePopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile image:", err);
    })
    .finally(() => {
      renderLoading(false, submitButtonApi);
    });
}

/*---------------------------------------------------------------------*/
/*                          Event Listeners                            */
/*---------------------------------------------------------------------*/

/* add profile edit button */

domElements.profileAddEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  domElements.profileTitleInput.value = userData.title;
  domElements.profileDescriptionInput.value = userData.about;

  editProfilePopup.open();
});

/* add new card button */

domElements.addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

/* SETEVENTLISTENERS */

newCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopup.setEventListener();
confirmDeletePopup.setEventListener();
profileImagePopup.setEventListeners();

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

const api = new Api(
  {
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "7475a3c0-00b4-4b01-93e9-2c093b2534fb",
      "Content-Type": "application/json",
    },
  },
  domElements
);

api
  .getApiUserInfo()
  .then((user) => {
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.error("Failed to load user info:", err);
  });

api
  .getApiInitialCards()
  .then((result) => {
    cardSection.renderItems(result);
  })
  .catch((err) => {
    console.error("Error Found:", err);
  });

function handleDeleteCard(cardId, cardElement) {
  api
    .deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    });
}

function apiAddUserInfo(profileData) {
  renderLoading(true, domElements.modalSubmitApiButton);
  api
    .addApiUserInfo(profileData)
    .then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
    })
    .then(() => {
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(() => {
      renderLoading(false, domElements.modalSubmitApiButton);
    });
}

function handleAddCardSubmitApi(renamedData) {
  renderLoading(true, domElements.modalSubmitCreateButton);
  const newCardData = {
    name: renamedData.name,
    link: renamedData.about,
  };

  api
    .addApiNewCard(newCardData)
    .then((newCard) => {
      handleAddCardSubmit(newCard);
    })
    .then(() => {
      newCardPopup.close();
    })
    .catch((err) => {
      console.error("Error adding new card:", err);
    })
    .finally(() => {
      renderLoading(false, domElements.modalSubmitCreateButton);
    });
}

function handleAddCardSubmit(newCard) {
  const cardElement = generateCard(newCard);

  cardSection.addItem(cardElement);

  newCardPopup.close();

  setTimeout(() => {
    domElements.addCardFormElement.reset();
  }, 1);
}
