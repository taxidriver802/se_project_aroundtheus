import Popup from "./Popup.js";
import Utils from "./Utils.js";

export default class PopupWithForm extends Popup {
  constructor(
    { popupSelector },
    generateCard,
    cardSection,
    addFormValidator,
    userInfo
  ) {
    super({ popupSelector });

    if (generateCard && cardSection) {
      this._utils = new Utils(
        generateCard,
        cardSection,
        addFormValidator,
        this.close.bind(this)
      );
    }
    this._handleFormSubmit = (e) => {
      if (this._utils) {
        this._utils.handleAddCardSubmit(e);
      }
    };

    this.userInfo = userInfo;

    this._profileEditInfo = this._profileEditInfo.bind(this);
    this.handleProfileEditButtonClick =
      this.handleProfileEditButtonClick.bind(this);
  }

  _profileEditInfo(e) {
    const profileEditForm = document.querySelector(
      "#profile-edit-modal .modal__form"
    );

    if (e.target === profileEditForm) {
      this.userInfo.setUserInfo(e, this);
    }
  }

  handleProfileEditButtonClick() {
    this.userInfo.getUserInfo();
  }

  close() {
    super.close();
  }
}
