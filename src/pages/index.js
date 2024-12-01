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

const deleteCardPopup = new PopupWithForm({
  popupSelector: "#delete-card-confirmation",
});

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

const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  domElements,
  () => handleProfImgWorkflow()
);

userInfo.setEventListener();
/*-----------------------------------------------------------------*/
addFormValidator.enableValidation();

editFormValidator.enableValidation();

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
    () => handleDeleteWorkflow(cardsData._id, card._cardElement),
    () => handleLikeWorkflow(cardsData._id, card._cardElement)
  );

  return card.getView();
}

function handleProfImgWorkflow() {
  domElements.profileImageEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const avatarUrl = domElements.profileimageEditInput.value;
    api
      .updateApiUserAvatar(avatarUrl)
      .then((data) => {
        domElements.profileImage.src = avatarUrl;
        domElements.profileImageEditModal.classList.remove("modal_opened");
      })
      .catch((err) => {
        console.error("Error updating profile image:", err);
      });
  });
}

function handleLikeWorkflow(_id, cardElement) {
  api.toggleLike(_id, cardElement);
}

function handleDeleteWorkflow(_id, cardElement) {
  deleteCardPopup.open(); // Open delete confirmation popup

  // Wait for the user to confirm the delete action
  domElements.cardDeleteConfirmButton.addEventListener(
    "click",
    () => {
      handleDeleteCard(_id, cardElement); // Execute the delete logic
      deleteCardPopup.close(); // Close the popup
    },
    { once: true } // Ensure the event listener is only triggered once
  );
}

function handleAddCardSubmit({ name, link }) {
  const newCardInfo = {
    name: name,
    link: link,
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

/* add new card button */

domElements.addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

/* domElements.profileImage.addEventListener("click", (e) => {
  e.preventDefault();
  domElements.profileImageEditModal.classList.add("modal_opened");
}) */
/* domElements.profileImageEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  api
    .updateApiUserAvatar()
    .then((data) => {
      console.log("Avatar updated", data);
    })
    .catch((err) => {
      console.error("Error updating profile image:", err);
    });
  domElements.profileImageEditModal.classList.remove("modal_opened");
}); */

/* SETEVENTLISTENERS */

newCardPopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopup.setEventListeners();
deleteCardPopup.setEventListeners();

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
///

api
  .getApiUserInfo()
  .then((user) => {
    // Update the page with the user information
    document.querySelector(".profile__title").textContent = user.name;
    document.querySelector(".profile__description").textContent = user.about;
    document.querySelector(".profile__image").src = user.avatar;
  })
  .catch((err) => {
    console.error("Failed to load user info:", err);
  });
///

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

domElements.profileEditForm.addEventListener("submit", (event) => {
  const updatedData = {
    name: domElements.profileTitleInput.value,
    about: domElements.profileDescriptionInput.value,
  };

  // Call the updateProfile API method
  api
    .addApiUserInfo(updatedData)
    .then((updatedUser) => {
      // Update the profile on the page with the new data
      document.querySelector(".profile__title").textContent = updatedUser.name;
      document.querySelector(".profile__description").textContent =
        updatedUser.about;
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    });

  editProfilePopup.close();
});

/* api
  .updateApiUserAvatar()
  .then((data) => {
    console.log("Avatar updated", data);
  })
  .catch((err) => {
    console.error("Error updating profile image:", err);
  }); */

domElements.addCardForm.addEventListener("submit", (event) => {
  /* event.preventDefault(); */ // Prevent default form submission

  const newCardData = {
    name: domElements.cardTitleInput.value,
    link: domElements.cardLinkInput.value,
  };

  // Call the API method to add a new card
  api
    .addApiNewCard(newCardData)
    .then((newCard) => {
      // Add the new card to the page
      handleAddCardSubmit(newCard); // Replace with your card rendering logic

      // Reset the form
    })
    .catch((err) => {
      console.error("Error adding new card:", err);
    });
  newCardPopup.close();
});
