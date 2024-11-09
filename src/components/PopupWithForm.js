import Popup from "./Popup.js";
import Utils from "./Utils.js";

export default class PopupWithForm extends Popup {
  constructor(
    { popupSelector },
    generateCard,
    cardSection,
    addFormValidator,
    handleProfileEditSubmit
  ) {
    super({ popupSelector });

    this._popupForm = document.querySelector(".js-modal-form");

    this._handleProfileEditSubmit = handleProfileEditSubmit;

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
  }

  close() {
    // Reset the form before closing
    if (this._popupForm) {
      this._popupForm.reset();
    }
    super.close();
  }
}
