class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _makeRequest(endpoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { ...this.headers },
    };

    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }

    return fetch(`${this.baseUrl}${endpoint}`, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((error) => console.error("Error:", error));
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  updateUser({ name, about }) {
    return this._makeRequest("/users/me", "PATCH", { name, about });
  }
  addCard({ name, link }) {
    return this._makeRequest("/cards", "POST", { name, link });
  }
  updateAvatar({ avatar }) {
    return this._makeRequest(`/users/me/avatar`, "PATCH", { avatar });
  }
  deleteCard(id) {
    return this._makeRequest(`/cards/${id}`, "DELETE");
  }

  changeLikeStatus({ id, isLiked }) {
    return this._makeRequest(`/cards/likes/${id}`, isLiked ? "PUT" : "DELETE");
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_10",
  headers: {
    authorization: "aef20d41-9cb3-4569-ba79-0c7f1acf4cae",
  },
});
export default api;
