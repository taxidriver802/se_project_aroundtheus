export default class Popup {
  constructor({ popupSelector }) {
    this.popupElement = document.querySelector(popupSelector);
  }

  open() {}

  setEventListeners() {
    // sets event listeners
  }

  close() {
    // closes popup
  }

  _handleEscClose() {
    // listens for esc button
  }
}
