import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
    nameInput,
    jobInput,
    profileButton,
    profileAddButton,
    closeButtonPlace,
    initialCards,
    validationConfig,
    profileForm
} from "../utils/constant.js";
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
    const name = nameInput.value;
    const job = jobInput.value;
    userInfo.setUserInfo({name, job})
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
    const data = userInfo.getUserInfo();
    popupEditProfile.setInputValues(data);

    editProfileFormValidation.resetValidation();
    editProfileFormValidation.setSubmitButtonState(profileForm.checkValidity())
    popupEditProfile.open()
}

// Добавление обработчика события на кнопку "Редактировать профиль"
profileButton.addEventListener('click', handleEditButton);

// Обработчик отправки формы добавления нового места
function handleAddPlaceFormSubmit(data) {
    const card = getCard({name: data['place'], link: data['link']}, '#card-template', popupWithImage.open)
    const cardElement = card.generateCard();
    section.addItem(cardElement);
    popupAddPlace.close();
    addPlaceFormValidation.setSubmitButtonState(popupAddPlace._formElement.checkValidity())
}

// Создание экземпляра попапа добавления нового места
const popupAddPlace = new PopupWithForm('#popupAddPlace', handleAddPlaceFormSubmit);
popupAddPlace.setEventListeners();

// Добавление обработчика события на кнопку "Добавить новое место"
profileAddButton.addEventListener('click', () => popupAddPlace.open());
// Добавление обработчика события на кнопку "Закрыть" в попапе добавления нового места
closeButtonPlace.addEventListener('click', popupAddPlace.close);

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
const section = new Section({items: initialCards, renderer}, '.cards');
section.renderItems();
// Создание экземпляра валидатора для формы редактирования профиля
const editProfileFormValidation = new FormValidator(validationConfig, popupEditProfile._formElement);
editProfileFormValidation.enableValidation();
// Создание экземпляра валидатора для формы добавить место
const addPlaceFormValidation = new FormValidator(validationConfig, popupAddPlace._formElement);
addPlaceFormValidation.enableValidation();

