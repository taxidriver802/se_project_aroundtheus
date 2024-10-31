import PopupWithForm from "./PopupWithForm";

export default class UserInfo extends PopupWithForm {
  constructor(infoSelector, setUserInfo, editProfilePopup, popupInstances) {
    super(infoSelector);
    this._infoSelector = infoSelector;
    this._setUserInfo = setUserInfo;
    this._editProfilePopup = editProfilePopup;
    this._popupInstances = popupInstances;
  }

  getUserInfo() {
    // returns object containing info about user
    // Set the input fields' values to the current profile information
    this._infoSelector.profileTitleInput.value =
      this._infoSelector.profileTitle.textContent;
    this._infoSelector.profileDescriptionInput.value =
      this._infoSelector.profileDescription.textContent;

    /* console.log(this._editProfilePopup);
     */
    return {
      title: this._infoSelector.profileTitle.textContent,
      description: this._infoSelector.profileDescription.textContent,
    };
  }

  setUserInfo(e) {
    e.preventDefault();
    // take new user data add it to page
    this._infoSelector.profileTitle.textContent =
      this._infoSelector.profileTitleInput.value;
    this._infoSelector.profileDescription.textContent =
      this._infoSelector.profileDescriptionInput.value;

    this._popupInstances.forEach((element) => {
      if (element.popupElement.classList.contains("modal_opened")) {
        //
        element.close();
      }
    });
  }
}