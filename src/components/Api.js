export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;

    this._handleResponse = this._handleResponse.bind(this);
  }

  _request(endpoint, options = {}) {
    const finalOptions = {
      headers: this.headers,
      ...options,
    };
    const url = `${this.baseUrl}${endpoint}`;
    return fetch(url, finalOptions).then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.status}`);
  }

  getApiInitialCards() {
    return this._request("/cards", {
      method: "GET",
    });
  }

  getApiUserInfo() {
    return this._request("/users/me", {
      method: "GET",
    });
  }

  addApiNewCard(cardData) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify(cardData),
    });
  }

  addApiUserInfo(data) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  updateApiUserAvatar(avatarUrl) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  toggleLike(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return this._request(`/cards/${cardId}/likes`, {
      method,
    });
  }
}
