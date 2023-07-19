export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
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
        button.classList.toggle('card__like-button_active');
    };

    // Приватный метод для обработки события клика на кнопку удаления карточки.
    _handleDeleteButton = () => {
        this._element.remove();
    }

    // Приватный метод для установки обработчиков событий для элементов карточки.
    _setEventListeners() {
        //Находим элемент cardImage
        const cardImage = this._element.querySelector('.card__image');
        //Обработчик событий нажатие на карточки
        cardImage.addEventListener('click', this.handleCardClick);
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
        this._setEventListeners();

        return this._element;
    };
};

