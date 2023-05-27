export const elements = {
    // Поле input
    nameInput:  document.querySelector('#name'),
    // Поле input
    jobInput: document.querySelector('#job'),
    // Профиль - имя
    profileName: document.querySelector('.profile__name'),
    // Профиль - о себе
    profileTitle: document.querySelector('.profile__title'),
    // Кнопка редактировать
    profileButton: document.querySelector('.profile__button'),
    // Кнопка - добавить место
    profileAddButton: document.querySelector('.profile__add-button'),
    // Контейнер галерея
    cards: document.querySelector('.cards'),
    // Модальное окно формы
    popupForm: document.querySelector('#popup-form'),
    // Кнопка закрытия формы профиль
    closeButton: document.querySelector('#close-button-profile'),
    // Кнопка удаления картинки-delete-button
    deleteButtons: document.querySelectorAll('.card__delete-button'),
    //Кнопка закрытия картинки-cross-button
    crossButton: document.querySelector('.popup__cross-button'),
    //Элемент картинка-popup__image
    popupImage: document.querySelector('.popup__image'),
    //Элемент названия после открытия картинки-popup__text
    textElement: document.querySelector('.popup__text'),
    //Элемент затемнения-popup__overlay
    popupOverlay: document.querySelector('.popup_overlay'),
    //Шаблон card-template
    cardTemplate: document.querySelector('#card-template').content,
    // Текстовое поле формы - место
    place: document.querySelector('#place'),
    // Ссылка на картинку фомы - место
    linkPlace: document.querySelector('#link'),
    // Форма добавить место
    popupAddPlace: document.querySelector('#popup-add'),
    // Кнопка закрытия формы место
    closeButtonPlace: document.querySelector('#close-button')
}