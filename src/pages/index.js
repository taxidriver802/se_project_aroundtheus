import Card from "../components/Card.js";
import constants from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Api from "../components/Api.js";
import "./index.css";

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
  domElements.profileEditForm
);

const profileImageValidator = new FormValidator(
  config,
  domElements.profileImageEditForm
);

const deleteCardPopup = new PopupWithForm({
  popupSelector: "#delete-card-confirmation",
});

const profileImagePopup = new PopupWithForm(
  {
    popupSelector: "#profile-image-edit-modal",
  },
  () => {}
);

const newCardPopup = new PopupWithForm(
  {
    popupSelector: "#card-add-modal",
  },
  handleAddCardSubmitApi,
  domElements,
  config
);

const editProfilePopup = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
  },
  ({ name, description }) => apiAddUserInfo({ name, description }),
  domElements,
  config
);

const imagePopup = new PopupWithImage(
  { popupSelector: "#popup-image" },
  domElements
);

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
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
    () => cardDeleteCallback(cardsData._id, card._cardElement),
    () => cardLikeCallback(cardsData._id, cardsData.isLiked)
  );

  return card.getView();
}

function cardLikeCallback(_id, isLiked) {
  api.toggleLike(_id, isLiked);
}

function cardDeleteCallback(_id, _cardElement) {
  deleteCardPopup.open();

  const confirmDeleteListener = () => {
    handleDeleteCard(_id, _cardElement);

    deleteCardPopup.close();
    domElements.cardDeleteConfirmButton.removeEventListener(
      "click",
      confirmDeleteListener
    );
    deleteCardPopup.setCloseHandler(null);
  };

  const modalCloseHandler = () => {
    domElements.cardDeleteConfirmButton.removeEventListener(
      "click",
      confirmDeleteListener
    );
    deleteCardPopup.setCloseHandler(null);
  };

  domElements.cardDeleteConfirmButton.addEventListener(
    "click",
    confirmDeleteListener,
    { once: true }
  );

  deleteCardPopup.setCloseHandler(modalCloseHandler);
}

function renderLoading(isLoading, buttonElement, loadingText = "Saving...") {
  const initialText = buttonElement.name;

  if (isLoading) {
    buttonElement.textContent = loadingText;
  } else {
    setTimeout(() => {
      buttonElement.textContent = initialText;
    }, 500);
  }
}

domElements.profileImage.addEventListener("click", () => {
  profileImageUpdater();
});

function profileImageUpdater() {
  profileImagePopup.open();
  domElements.profileImageEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const avatarUrl = domElements.profileimageEditInput.value;
    const submitButtonApi = domElements.profileImageEditButton;

    renderLoading(true, submitButtonApi);

    api
      .updateApiUserAvatar(avatarUrl)
      .then((data) => {
        domElements.profileImage.src = avatarUrl;
        domElements.profileImageEditModal.classList.remove("modal_opened");
      })
      .catch((err) => {
        console.error("Error updating profile image:", err);
      })
      .finally(() => {
        setTimeout(() => {
          renderLoading(false, submitButtonApi);
        }, 100);
      });
  });
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

/* add new card button */

domElements.addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

/* SETEVENTLISTENERS */

newCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopup.setEventListener();
deleteCardPopup.setEventListener();
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
    document.querySelector(".profile__title").textContent = user.name;
    document.querySelector(".profile__description").textContent = user.about;
    document.querySelector(".profile__image").src = user.avatar;
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

function apiAddUserInfo({ name, description }) {
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
  const updatedData = {
    name: domElements.profileTitleInput.value,
    about: domElements.profileDescriptionInput.value,
  };

  api
    .addApiUserInfo(updatedData)
    .then((updatedUser) => {
      document.querySelector(".profile__title").textContent = updatedUser.name;
      document.querySelector(".profile__description").textContent =
        updatedUser.about;
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });

  editProfilePopup.close();
}

function handleAddCardSubmitApi() {
  renderLoading(true, domElements.modalSubmitCreateButton);
  const newCardData = {
    name: domElements.cardTitleInput.value,
    link: domElements.cardLinkInput.value,
  };

  api
    .addApiNewCard(newCardData)
    .then((newCard) => {
      handleAddCardSubmit(newCard);
    })
    .catch((err) => {
      console.error("Error adding new card:", err);
    });
  newCardPopup.close();
  renderLoading(false, domElements.modalSubmitCreateButton);
}

function handleAddCardSubmit(newCard) {
  const cardElement = generateCard(newCard);

  cardSection.addItem(cardElement);

  newCardPopup.close();

  setTimeout(() => {
    domElements.addCardFormElement.reset();
  }, 1);
}
