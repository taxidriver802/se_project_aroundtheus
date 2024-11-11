export default class UserInfo {
  constructor(infoSelector, setUserInfo, popupInstances, generateCard) {
    this._infoSelector = infoSelector;
    this._setUserInfo = setUserInfo;
    this._popupInstances = popupInstances;
    this._generateCard = generateCard;
  }

  getUserInfo() {
    // returns object containing info about user
    // Set the input fields' values to the current profile information
    this._infoSelector.profileTitleInput.value =
      this._infoSelector.profileTitle.textContent;
    this._infoSelector.profileDescriptionInput.value =
      this._infoSelector.profileDescription.textContent;

    return {
      title: this._infoSelector.profileTitle.textContent,
      description: this._infoSelector.profileDescription.textContent,
    };
  }

  setUserInfo(e, popupInstance) {
    e.preventDefault();
    // take new user data add it to page
    this._infoSelector.profileTitle.textContent =
      this._infoSelector.profileTitleInput.value;
    this._infoSelector.profileDescription.textContent =
      this._infoSelector.profileDescriptionInput.value;

    popupInstance.close();
  }
}
