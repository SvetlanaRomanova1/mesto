export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.deleteCard = this.deleteCard.bind(this)
    }

    // Приватный метод для проверки ответа от сервера и обработки ошибок
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

// Метод для получения информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(this._checkResponse);
    }

    // Метод для получения списка карточек с сервера
    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(this._checkResponse);
    }

    // Метод для редактирования информации о пользователе на сервере
    editUserInfo(user) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this.headers
            },
            body: JSON.stringify({
                name: user.name,
                about: user.about
            })
        })
            .then(this._checkResponse);
    }

    // Метод для добавления новой карточки на сервер
    addNewCard({name, link}) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: {
                ...this.headers
            },
            body: JSON.stringify({
                name: name,
                link: link,
            })
        })
            .then(this._checkResponse);
    }

    // Метод для удаления карточки на сервере
    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(this._checkResponse);
    }

    // Метод для установки like
    likeCardAdd(id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
            .then(this._checkResponse);
    }

    // Метод для удаления like
    likeCardRemove(id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(this._checkResponse);
    }

    //Метод для смены аватара
    changeAvatar(avatar) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                ...this.headers
            },
            body: JSON.stringify({
                avatar: avatar.link
            })
        })
            .then(this._checkResponse);
    }
}