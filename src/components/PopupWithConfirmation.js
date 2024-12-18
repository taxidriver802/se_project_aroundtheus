import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }, handleDeleteCallback, domElements) {
    super({ popupSelector });
    this.domElements = domElements;
    this._confirmForm = this.popupElement.querySelector(
      "#modal-confirmation-form"
    );

    this._handleDeleteCallback = handleDeleteCallback.bind(this);
  }

  open(id, cardElement) {
    super.open();

    this.id = id;
    this.cardElement = cardElement;

    this._confirmForm.removeEventListener("submit", this._submitHandler);
    this._submitHandler = (e) => {
      e.preventDefault();
      this._handleDeleteCallback(this.id, this.cardElement);
    };
    this._confirmForm.addEventListener("submit", this._submitHandler);
  }
}
