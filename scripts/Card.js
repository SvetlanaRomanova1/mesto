export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
    }

    // Приватный метод для получения шаблона карточки из HTML.
    _getTemplate() {
        return document.querySelector(this._templateSelector)
            .content.querySelector('.card')
            .cloneNode(true);
    }

    // Приватный метод  для обработки события клика на кнопку удаления карточки.
    _handleOverlayClick(event) {
        if (event.target === event.currentTarget) {
            const popup = event.target.closest('.popup');
            if (popup) {
                popup.classList.remove('popup_opened');
            }
        }
    }

    // Приватный метод для обработки события нажатия клавиши на клавиатуре (Escape).
    _handleKeyDown(event) {
        if (event.key === 'Escape') {
            const popup = document.querySelector('.popup_opened');
            if (popup) {
                popup.classList.remove('popup_opened');
            }
        }
    }

    // Приватный метод для открытия попапа, путем добавления класса и обработчика событий.
    _openPopup(popup) {
        popup.classList.add('popup_opened');
        popup.addEventListener('mousedown', this._handleOverlayClick);
        document.addEventListener('keydown', this._handleKeyDown);
    }

    // Приватный метод для закрытия попапа, путем удалении класса popup_opened.
    _closePopup(e) {
        const popup = e.target.closest('.popup_opened');
        popup.classList.remove('popup_opened');
    }

    // Приватный метод для обработки события клика на изображении карточки.
    _handleClickImage(event) {
        const imageSrc = event.target.getAttribute('src');
        const altText = event.target.getAttribute('alt');
        const popupOverlay = document.querySelector('.popup_overlay');
        const popupImage = popupOverlay.querySelector('.popup__image');
        popupImage.src = imageSrc;
        popupImage.alt = altText;
        popupOverlay.querySelector('.popup__text').textContent = altText;
        this._openPopup(popupOverlay);
    }

    // Приватный метод для обработки события клика на кнопку "Нравится" карточки.
    _handleLikeButton(event) {
        const button = event.target;
        button.classList.toggle('card__like-button_active');
    }

    // Приватный метод для обработки события клика на кнопку удаления карточки.
    _handleDeleteButton(event) {
        event.target.closest('.card').remove();
    }

    // Приватный метод для установки обработчиков событий для элементов карточки.
    _setEventListeners() {
        //Находим элемент cardImage
        const cardImage = this._element.querySelector('.card__image');
        //Обработчик событий нажатие на карточки
        cardImage.addEventListener('click', (e) => {
            this._handleClickImage(e);
        });
        //Находим кнопку card__like-button (кнопка для установки нравиться)
        const cardLikeButton = this._element.querySelector('.card__like-button');
        //Вешаем обработчик событий на кнопку card__like-button
        cardLikeButton.addEventListener('click', this._handleLikeButton);

        //Находим кнопку popup__cross-button (кнопка для закрытия картинки)
        const popupCrossButton = document.querySelector('.popup__cross-button');
        //Вешаем обработчик событий на кнопку popup__cross-button
        popupCrossButton.addEventListener('click', this._closePopup);

        //Находим кнопку card__delete-button (для удаления картинки)
        const cardDeleteButton = this._element.querySelector('.card__delete-button');
        //Вешаем обработчик событий на кнопку card__delete-button
        cardDeleteButton.addEventListener('click', this._handleDeleteButton);
    }

    // Публичный метод для генерации карточки на основе данных,
    // заполнения её данными и установки необходимых обработчиков событий.
    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.card__image').setAttribute('src', this._link);
        this._element.querySelector('.card__image').setAttribute('alt', this._name);
        this._element.querySelector('.card__title').textContent = this._name;
        this._setEventListeners();

        return this._element;
    }
}

