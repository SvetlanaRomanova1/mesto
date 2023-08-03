export default class Card {
    constructor(data, templateSelector, handleCardClick, handleConfirm, handleLike) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._ownerName = data.owner.name;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleConfirm = handleConfirm;
        this._handleLike = handleLike;
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector('.card__image');
        this._titleElement = this._element.querySelector('.card__title');
        this._likeNumberElement = this._element.querySelector('.card__like-number');
        this._deleteButton = this._element.querySelector('.card__delete-button');
        this._likeButton = this._element.querySelector('.card__like-button');
    }

    // Приватный метод для получения шаблона карточки из HTML.
    _getTemplate() {
        return document.querySelector(this._templateSelector)
            .content.querySelector('.card')
            .cloneNode(true);
    }

    // Метод для обработки события клика на кнопку "Нравится" карточки.
    handleLikeButton(likes) {
        this._likeNumberElement.textContent = likes.length || '';
        this._likeButton.classList.toggle('card__like-button_active');
    }

    // Приватный метод для обработки события клика на кнопку удаления карточки.
    _handleDeleteButton() {
        this._handleConfirm(this);
    }

    handleDeleteCard(){
        this._element.remove();
    }


    // Приватный метод для установки обработчиков событий для элементов карточки.
    _setEventListeners() {
        this._imageElement.addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));
        this._deleteButton.addEventListener('click', () => this._handleDeleteButton());
        this._likeButton.addEventListener('click', () => this._handleLike());
    }

    // Публичный метод для генерации карточки на основе данных,
    // заполнения её данными и установки необходимых обработчиков событий.
    generateCard() {
        this._imageElement.setAttribute('src', this._link);
        this._imageElement.setAttribute('alt', this._name);
        this._titleElement.textContent = this._name;
        this._likeNumberElement.textContent = this._likes.length || '';
        const profileName = document.querySelector('.profile__name').textContent;
        if (this._ownerName !== profileName) {
            this._deleteButton.style.display = 'none';
        }
        if (this._likes.find(like => like.name === profileName)) {
            this._likeButton.classList.add('card__like-button_active');
        }
        this._element.dataset.cardId = this._id;
        this._setEventListeners();

        return this._element;
    }
}
