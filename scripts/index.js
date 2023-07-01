import FormValidator from './FormValidator.js';
import Card from "./Card.js";
import {INITIAL_CARDS, VALIDATION_CONFIG} from "./constant.js";

// Поиск элементов в Dom-элементе:
// Находим кнопку редактировать профиль
const profileButton = document.querySelector('.profile__button');
// Находим модальное окно формы редактировать
const popupForm = document.querySelector('#popup-form');
// Находим элемент профиль - имя
const profileName = document.querySelector('.profile__name');
// Находим элемент профиль - о себе
const profileTitle = document.querySelector('.profile__title');
// Находим текстовое  поле формы - имя
const nameInput =  document.querySelector('#name');
// Находим текстовое  поле формы - о себе
const jobInput = document.querySelector('#job');
// Находим кнопку сохранить формы редактировать профиль
const saveProfileButton = document.querySelector('#save-profile');
// Находим кнопку закрытия формы редактировать профиль
const closeButton = document.querySelector('#close-button-profile');
// Находим кнопку - добавить место
const profileAddButton = document.querySelector('.profile__add-button');
// Находим форму добавить место
const popupAddPlace = document.querySelector('#popup-add');
// Находим текстовое поле формы - место
const place = document.querySelector('#place');
// Находим текстовое поле ссылка на картинку формы - место
const linkPlace = document.querySelector('#link');
// Находим кнопку создать место - формы добавить место
const addNewLocation = document.querySelector('#create-place');
// Находим кнопку закрытия - формы добавить место
const closeButtonPlace = document.querySelector('#close-button');
// Находим элемент cards
const cardList = document.querySelector('.cards');

// Функция для установки состояния кнопки отправки формы
export function setSubmitButtonState(button, isFormValid, inactiveButtonClass = 'popup__button_disabled') {
    button.disabled = !isFormValid;
    button.classList.toggle(inactiveButtonClass, !isFormValid);
}

// Функция открытия popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', handleOverlayClick);
    document.addEventListener('keydown', handleKeyDown);
}

// Функция закрытия popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('mousedown', handleOverlayClick);
    document.removeEventListener('keydown', handleKeyDown);
}

// Сброс состояния ошибки для указанного поля
function resetErrorState(input, isInputValid) {
    const errorSpan = input.parentNode.querySelector(`.popup__error-visible`);
    errorSpan.textContent = input.validationMessage;
    input.classList.toggle('popup__input_type_error', !isInputValid);
}

// Скрытие ошибки для указанного поля
function hideError(input, className) {
    input.classList.remove(className);
    resetErrorState(input, true);
}

// Сброс состояния кнопки
function resetButton(button, isFormValid) {
    button.disabled = !isFormValid;
    button.classList.toggle('popup__button_disabled', !isFormValid);
}

// Логика попапа редактировать профиль
// Обработчик нажатия кнопки "Редактировать"
function handleEditButton() {
    // Заполнение полей формы текущими значениями профиля
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;


    // Скрытие ошибок во всех полях формы
    Array.from(popupForm.querySelectorAll('input')).forEach(input => {
        hideError(input, 'popup__input_type_error');
    });

    // Сброс состояния кнопки
    resetButton(saveProfileButton, true);

    // Открытие попапа с формой
    openPopup(popupForm);
}

// Добавление обработчика события на кнопку "Редактировать"
profileButton.addEventListener('click', handleEditButton);

// Обработчик нажатия кнопки "Закрыть"
function handleCloseButton() {
    // Закрытие попапа с формой
    closePopup(popupForm);
}

// Добавление обработчика события на кнопку "Закрыть"
closeButton.addEventListener('click', handleCloseButton);

// Сохранение информации профиля
function saveProfileInfo() {
    // Получение значений полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Обновление значений textContent
    profileName.textContent = nameValue;
    profileTitle.textContent = jobValue;
}

// Обработчик «отправки» формы
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    saveProfileInfo();
    handleCloseButton();
}

// Прикрепление обработчика к форме
popupForm.querySelector('form').addEventListener('submit', handleFormProfileSubmit);

// Логика попапа добавить новое место
// Обработчик кнопки "Добавить новое место"
function handleOpenAddPlacePopup() {
    openPopup(popupAddPlace);
}

profileAddButton.addEventListener('click', handleOpenAddPlacePopup);

// Обработчик кнопки "Закрыть"
function handleCloseButtonAddPlace() {
    closePopup(popupAddPlace);
}

closeButtonPlace.addEventListener('click', handleCloseButtonAddPlace);

// Обработчик "отправки" формы
function handleAddPlaceFormSubmit(evt) {
    evt.preventDefault();
    // Создание новой карточки с помощью введенных данных из формы
    const card = new Card({name: place.value, link: linkPlace.value}, '#card-template');
    const cardElement = card.generateCard();
    // Находим элемент cards
    const cardList = document.querySelector('.cards');
    cardList.prepend(cardElement);

    // Закрытие попапа и сброс значений формы
    handleCloseButtonAddPlace();
    // Состояние кнопки отправки формы на основе валидности формы
    setSubmitButtonState(addNewLocation, false, 'popup__button_disabled')
    popupAddPlace.querySelector('form').reset()
}

popupAddPlace.querySelector('form').addEventListener('submit', handleAddPlaceFormSubmit);

// Функция обработки клика по overlay
function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        const popup = event.target.closest('.popup');
        if (popup) {
            closePopup(popup);
        }
    }
}

// Функция обработки клавиши Escape
function handleKeyDown(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        if (popup) {
            closePopup(popup);
        }
    }
}

// Создание карточек на основе данных из initialCards и добавление их в список карточек
INITIAL_CARDS.forEach((item) => {
    const card = new Card(item, '#card-template');
    const cardElement = card.generateCard();
    cardList.append(cardElement);
});
// v 1: Инициализация валидации формы "Редактировать профиль"
        // Находим форму "Редактировать профиль" на странице
const editProfile = document.querySelector('[name="edit-profile"]');
        // Создаем экземпляр класса FormValidator и передаем ему конфигурацию валидации и форму "Редактировать профиль"
const editProfileFormValidation = new FormValidator(VALIDATION_CONFIG, editProfile);
        // Активируем валидацию для формы "Редактировать профиль"
editProfileFormValidation.enableValidation();

// v 2: Инициализация валидации формы "Добавить место"
         // Находим форму "Добавить место" на странице
const addPlace = document.querySelector('[name="add-place"]');
        // Создаем экземпляр класса FormValidator и передаем ему конфигурацию валидации и форму "Добавить место"
const addPlaceFormValidation = new FormValidator(VALIDATION_CONFIG, addPlace);
        // Активируем валидацию для формы "Добавить место"
addPlaceFormValidation.enableValidation();

