import FormValidator from './FormValidator.js';
import Card from "./Card.js";
import {INITIAL_CARDS, VALIDATION_CONFIG} from "./constant.js";

// Поиск элементов в Dom-элементе:
// Находим кнопку редактировать профиль
const profileButton = document.querySelector('.profile__button');
// Находим модальное окно формы редактировать
const profilePopup = document.querySelector('#profilePopup');
// Находим форму редактировать
const profileForm = profilePopup.querySelector('form');
// Находим элемент профиль - имя
const profileName = document.querySelector('.profile__name');
// Находим элемент профиль - о себе
const profileTitle = document.querySelector('.profile__title');
// Находим текстовое  поле формы - имя
const nameInput =  document.querySelector('#name');
// Находим текстовое  поле формы - о себе
const jobInput = document.querySelector('#job');
// Находим кнопку закрытия формы редактировать профиль
const popupCloseButtonProfile = document.querySelector('.popup__close-button-profile');
// Находим кнопку - добавить место
const profileAddButton = document.querySelector('.profile__add-button');
// Находим модальное окно формы добавить место
const popupAddPlace = document.querySelector('#popupAddPlace');
// Находим форму добавить место
const formAddPlace = popupAddPlace.querySelector('form');
// Находим текстовое поле формы - место
const popupAddPlaceInput = document.querySelector('#popupAddPlaceInput');
// Находим текстовое поле ссылка на картинку формы - место
const popupLinkAddPlaceInput = document.querySelector('#popupLinkAddPlaceInput');
// Находим кнопку закрытия - формы добавить место
const closeButtonPlace = document.querySelector('.popup__close-button-place');
// Находим элемент cards
const cardList = document.querySelector('.cards');

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

// Логика попапа редактировать профиль
// Обработчик нажатия кнопки "Редактировать"
function handleEditButton() {
    // Заполнение полей формы текущими значениями профиля
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;


    // Скрытие ошибок во всех полях формы
    editProfileFormValidation.setErrorState(nameInput)
    editProfileFormValidation.setErrorState(jobInput)

    // Сброс состояния кнопки
    editProfileFormValidation.setSubmitButtonState(profileForm)
    // Открытие попапа с формой
    openPopup(profilePopup);
}

// Добавление обработчика события на кнопку "Редактировать"
profileButton.addEventListener('click', handleEditButton);

// Обработчик нажатия кнопки "Закрыть"
function handleCloseButton() {
    // Закрытие попапа с формой
    closePopup(profilePopup);
}

// Добавление обработчика события на кнопку "Закрыть"
popupCloseButtonProfile.addEventListener('click', handleCloseButton);

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
profileForm.addEventListener('submit', handleFormProfileSubmit);

// Логика попапа добавить новое место
// Обработчик кнопки "Добавить новое место"
function handleOpenAddPlacePopup() {
    openPopup(popupAddPlace);
}

profileAddButton.addEventListener('click', handleOpenAddPlacePopup);

// Обработчик кнопки "Закрыть"
function handleCloseButtonAddPlace() {
    closePopup(popupAddPlace);
    addPlaceFormValidation.setSubmitButtonState(formAddPlace.checkValidity())
}

closeButtonPlace.addEventListener('click', handleCloseButtonAddPlace);

// Обработчик "отправки" формы
function handleAddPlaceFormSubmit(evt) {
    evt.preventDefault();
    // Создание новой карточки с помощью введенных данных из формы
    const card = getCard({name: popupAddPlaceInput.value, link: popupLinkAddPlaceInput.value}, '#card-template')
    const cardElement = card.generateCard();
    // Находим элемент cards
    const cardList = document.querySelector('.cards');
    cardList.prepend(cardElement);

    // Закрытие попапа и сброс значений формы
    formAddPlace.reset()
    handleCloseButtonAddPlace();
}

formAddPlace.addEventListener('submit', handleAddPlaceFormSubmit);

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

// Функция инстанцирование Card
function getCard(data, templateSelector) {
    return  new Card(data, templateSelector);
}

// Создание карточек на основе данных из initialCards и добавление их в список карточек
INITIAL_CARDS.forEach((item) => {
    const card = getCard(item, '#card-template')
    const cardElement = card.generateCard();
    cardList.append(cardElement);
});

//  Инициализация валидации формы "Редактировать профиль"
        // Находим форму "Редактировать профиль" на странице
const editProfile = document.querySelector('[name="edit-profile"]');
        // Создаем экземпляр класса FormValidator и передаем ему конфигурацию валидации и форму "Редактировать профиль"
const editProfileFormValidation = new FormValidator(VALIDATION_CONFIG, editProfile);
        // Активируем валидацию для формы "Редактировать профиль"
editProfileFormValidation.enableValidation();

// Инициализация валидации формы "Добавить место"
         // Находим форму "Добавить место" на странице
const addPlace = document.querySelector('[name="add-place"]');
        // Создаем экземпляр класса FormValidator и передаем ему конфигурацию валидации и форму "Добавить место"
const addPlaceFormValidation = new FormValidator(VALIDATION_CONFIG, addPlace);
        // Активируем валидацию для формы "Добавить место"
addPlaceFormValidation.enableValidation();

