export default class Card {
    constructor(data, templateSelector, handleCardClick, handleConfirm, handleLike) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._ownerName = data.owner.name;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.handleConfirm = handleConfirm;
        this.handleLike = handleLike;
    };

    // Приватный метод для получения шаблона карточки из HTML.
    _getTemplate() {
        return document.querySelector(this._templateSelector)
            .content.querySelector('.card')
            .cloneNode(true);
    };


    // Приватный метод для обработки события клика на кнопку "Нравится" карточки.
    _handleLikeButton = () => {
        const button = this._element.querySelector('.card__like-button');
        this.handleLike(this._id, button.classList.contains('card__like-button_active'))
            .then(result => {
                this._element.querySelector('.card__like-number').textContent = result.likes.length || ''
            })
        button.classList.toggle('card__like-button_active');
    };

    // Приватный метод для обработки события клика на кнопку удаления карточки.
    _handleDeleteButton = () => {
        this.handleConfirm(this._id)
    }

    // Приватный метод для установки обработчиков событий для элементов карточки.
    _setEventListeners() {
        //Находим элемент cardImage
        const cardImage = this._element.querySelector('.card__image');
        //Обработчик событий нажатие на карточки
        cardImage.addEventListener('click', this.handleCardClick);
        //Находим элемент popupConfirm
        const deleteButton = this._element.querySelector('.card__delete-button');
        //Обработчик событий нажатие на удалить
        deleteButton.addEventListener('click', this._handleDeleteButton);
        //Находим кнопку card__like-button (кнопка для установки нравиться)
        const cardLikeButton = this._element.querySelector('.card__like-button');
        //Вешаем обработчик событий на кнопку card__like-button
        cardLikeButton.addEventListener('click', this._handleLikeButton);
        //Находим кнопку card__delete-button (для удаления картинки)
        const cardDeleteButton = this._element.querySelector('.card__delete-button');
        //Вешаем обработчик событий на кнопку card__delete-button
        cardDeleteButton.addEventListener('click', this._handleDeleteButton);
    };

    // Публичный метод для генерации карточки на основе данных,
    // заполнения её данными и установки необходимых обработчиков событий.
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__image').setAttribute('src', this._link);
        this._element.querySelector('.card__image').setAttribute('alt', this._name);
        this._element.querySelector('.card__title').textContent = this._name;
        this._element.querySelector('.card__like-number').textContent = this._likes.length || '';
        const profileName = document.querySelector('.profile__name').textContent;
        if (this._ownerName !== profileName) {
            this._element.querySelector('.card__delete-button').style.display = 'none'
        }
        if(this._likes.find(like => like.name === profileName)) {
            this._element.querySelector('.card__like-button').classList.add('card__like-button_active')
        }
        this._element.dataset.cardId = this._id;
        this._setEventListeners();

        return this._element;
    };
};

