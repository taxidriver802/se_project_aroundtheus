export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;

    this._handleResponse = this._handleResponse.bind(this);
  }

  getApiInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  getApiUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  addApiNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  addApiUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  updateApiUserAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  toggleLike(cardId, cardElement) {
    const likeButton = cardElement
      .querySelector(".card__description")
      .querySelector(".card__like-button");

    const isLiked = likeButton.classList.contains("card__like-button_active");
    const method = isLiked ? "DELETE" : "PUT";

    if (isLiked) {
      likeButton.classList.remove("card__like-button_active");
    } else {
      likeButton.classList.add("card__like-button_active");
    }

    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method,
      headers: this.headers,
    }).then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  }
}
