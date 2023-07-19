export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-visible'
};

// Поиск элементов в Dom-элементе:
// Находим кнопку редактировать профиль
export const profileButton = document.querySelector('.profile__button');
// Находим модальное окно формы редактировать
export const profilePopup = document.querySelector('#profilePopup');
// Находим форму редактировать
export const profileForm = profilePopup.querySelector('form');
// Находим текстовое  поле формы - имя
export const nameInput =  document.querySelector('#name');
// Находим текстовое  поле формы - о себе
export const jobInput = document.querySelector('#job');
// Находим кнопку - добавить место
export const profileAddButton = document.querySelector('.profile__add-button');
// Находим кнопку закрытия - формы добавить место
export const closeButtonPlace = document.querySelector('.popup__close-button-place');
// Находим модальное окно картинки
export const popupImage = document.querySelector('.popup_overlay');


