import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import * as constants from "../utils/constant.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import './index.css'

// Создание экземпляра попапа для закрытия оверлея
const popupOverlay = new Popup('.popup_overlay');
popupOverlay.setEventListeners();
const popupWithImage = new PopupWithImage('.popup_overlay');

// Функция сохранения информации профиля
function saveProfileInfo() {
    const name = constants.nameInput.value;
    const job = constants.jobInput.value;
    userInfo.setUserInfo({name, job })
}

// Обработчик отправки формы редактирования профиля
function handleFormProfileSubmit() {
    saveProfileInfo();
    popupEditProfile.close();
}

// Создание экземпляра попапа редактирования профиля
const popupEditProfile = new PopupWithForm('#profilePopup', handleFormProfileSubmit);
popupEditProfile.setEventListeners();

// Создание экземпляра класса UserInfo для управления данными профиля
const userInfo = new UserInfo({
    name: '.profile__name',
    job: '.profile__title'
});

// Обработчик кнопки "Редактировать профиль"
function handleEditButton() {
    const {name, job } = userInfo.getUserInfo();
    constants.nameInput.value = name;
    constants.jobInput.value = job;

    editProfileFormValidation.setErrorState(constants.nameInput)
    editProfileFormValidation.setErrorState(constants.jobInput)

    editProfileFormValidation.setSubmitButtonState(constants.profileForm)
    popupEditProfile.open()
}

// Добавление обработчика события на кнопку "Редактировать профиль"
constants.profileButton.addEventListener('click', handleEditButton);

// Обработчик отправки формы добавления нового места
function handleAddPlaceFormSubmit(data) {
    const card = getCard({name: data['place'], link: data['link']}, '#card-template', popupWithImage.open)
    const cardElement = card.generateCard();
    const cardList = document.querySelector('.cards');
    cardList.prepend(cardElement);

    popupAddPlace.close();
}

// Создание экземпляра попапа добавления нового места
const popupAddPlace = new PopupWithForm('#popupAddPlace', handleAddPlaceFormSubmit);
popupAddPlace.setEventListeners();

// Добавление обработчика события на кнопку "Добавить новое место"
constants.profileAddButton.addEventListener('click', () => popupAddPlace.open());
// Добавление обработчика события на кнопку "Закрыть" в попапе добавления нового места
constants.closeButtonPlace.addEventListener('click', popupAddPlace.close);

// Функция создания карточки с переданными данными
function getCard(data, templateSelector, handleCardClick) {
    return new Card(data, templateSelector, handleCardClick);
}

// Функция рендеринга карточки
function renderer(item) {
    const card = getCard(item, '#card-template', popupWithImage.open);
    return card.generateCard();
}

// Создание экземпляра класса Section для управления секцией карточек
const section = new Section({items: constants.initialCards, renderer }, '.cards');
section.renderItems();

// Создание экземпляра валидатора для формы редактирования профиля
const editProfileFormValidation = new FormValidator(constants.validationConfig, popupEditProfile._formElement);
editProfileFormValidation.enableValidation();
// Создание экземпляра валидатора для формы добавить место
const addPlaceFormValidation = new FormValidator(constants.validationConfig, popupAddPlace._formElement);
addPlaceFormValidation.enableValidation();

