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

const profileImage = document.querySelector(".profile__image");
const profileImageContainer = document.querySelector(
  ".profile__image-container"
);
const profileImageEditModal = document.querySelector(
  "#profile-image-edit-modal"
);

const profileImageEditForm = document.querySelector("#profile-image-edit-form");
const profileimageEditInput = profileImageEditForm.querySelector(
  "#profile-image-edit-input"
);
const profileImageEditButton = profileImageEditForm.querySelector(
  "#profile-image-edit-button"
);

const modalClose = document.querySelector(".modal__close");
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

const modalSubmitCreateButton = addCardForm.querySelector(
  "#modal-submit-create-button"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

const cardDeleteConfirmButton = document.querySelector(
  "#modal-card-delete-button"
);
const cardDeleteButton = document.querySelector("#card-delete-button");

const deleteCardConfirmation = document.querySelector(
  "#delete-card-confirmation"
);

const modalDeleteCardConfirmation = deleteCardConfirmation.querySelector(
  "#modal-card-delete-button"
);

/* const modalSubmit =  */

const deleteImageButton = document.querySelector(".card__delete-button-api");
const cardLikeButton = document.querySelector(".card__like-button");

const addNewCardButton = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector("#card-add-modal");
const addCardFormElement = cardAddModal.querySelector(".modal__form");
const popupImageModal = document.querySelector("#popup-image");

const modalImageElement = document.querySelector(".modal__image");
const popupImageCaption = document.querySelector(".modal__caption");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardLinkInput = addCardFormElement.querySelector(
  ".modal__input_type_link"
);
const cardDeleteForm = document.querySelector(".modal__api");

const cardDeleteSubmitButton = cardDeleteForm.querySelector(
  ".card__delete-button-api"
);

const modalConfirmationForm = document.querySelector(
  "#modal-confirmation-form"
);

const profileModalForm = document.querySelector("#profile-modal-form");
const modalSubmitApiButton =
  profileModalForm.querySelector("#modal-submit-api");

const domElements = {
  profileImageContainer,
  modalSubmitApiButton,
  modalConfirmationForm,
  cardDeleteButton,
  cardLikeButton,
  modalClose,
  modalSubmitCreateButton,
  cardDeleteSubmitButton,
  profileimageEditInput,
  profileImageEditForm,
  profileImageEditButton,
  profileImageEditModal,
  profileImage,
  deleteImageButton,
  modalDeleteCardConfirmation,
  deleteCardConfirmation,
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
  cardTitleInput,
  cardLinkInput,
  cardDeleteConfirmButton,
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
  config,
  selectors,
  domElements,
  infoSelector,
};