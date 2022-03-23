export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
      this._username = options.username;
    }


    // загрузка данных пользователя
    getMyRepos() {
        return fetch(`${this._baseUrl}/users/${this._username}/repos`, {
            headers: this._headers,
            })
            .then(this._checkResponse);
    }


    // загрузка карточек с сервера
    getRepoLanguage(repoName) {
        return fetch(`${this._baseUrl}/repos/${this._username}/${repoName}/languages`, {
            headers: this._headers,
            })
            .then(this._checkResponse);
    }


    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }
