export default class UserInfo {
  constructor(nameSelector, jobSelector, linkSelector, domElements) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._linkElement = document.querySelector(linkSelector);

    this.domElements = domElements;
  }

  getUserInfo() {
    return {
      title: this._nameElement.textContent,
      about: this._jobElement.textContent,
      avatar: this._linkElement.src,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;

    if (avatar !== undefined) {
      this._linkElement.src = avatar;
    }
  }
}
