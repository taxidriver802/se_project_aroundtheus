export default class UserInfo {
  constructor(nameSelector, jobSelector, domElements) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);

    this.domElements = domElements;
  }

  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo(name, description) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = description;
  }
}
