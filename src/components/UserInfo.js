export default class UserInfo {
  constructor(nameSelector, jobSelector, domElements, handleProfImgWorkflow) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);

    this.domElements = domElements;

    this._handleProfImgWorkflow = handleProfImgWorkflow.bind(this);
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

  setEventListener() {
    this.domElements.profileImage.addEventListener("click", () => {
      domElements.profileImageEditModal.classList.add("modal_opened");
      this._handleProfImgWorkflow();
    });
  }
}
