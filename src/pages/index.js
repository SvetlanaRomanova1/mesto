import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import {
    profileButton,
    profileAddButton,
    closeButtonPlace,
    validationConfig,
    profileForm,
    editButtonAvatar
} from "../utils/constant.js";
import Api from "../components/Api.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import './index.css';
import PopupConfirm from "../components/PopupConfirm.js";

// Создание экземпляра api
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
    headers: {
        authorization: 'feda086f-6f7a-4a92-a7c8-dfe4532414fe',
        'Content-Type': 'application/json'
    }
});

// Создание экземпляра класса Section для управления секцией карточек
const section = new Section( renderer, '.cards');

const popupWithImage = new PopupWithImage('.popup_overlay');
popupWithImage.setEventListeners();

async function deleteCard(card) {
    try {
        await api.deleteCard(card._id);
        card.handleDeleteCard();

    } catch (error) {
        console.log(error)
    }
}

// Создание экземпляра попапа для удаления карточки
const popupConfirm = new PopupConfirm('#popupDeleteCard', deleteCard)
popupConfirm.setEventListeners()

// Обработчик отправки формы редактирования профиля
async function handleFormProfileSubmit(data) {
    try {
        const {name, job} = data;
        popupEditProfile.renderLoading(true, 'Сохранение...');
        await api.editUserInfo({name: name, about: job});
        userInfo.setUserInfo({name, job});
        popupEditProfile.close();
    } catch (error) {
        console.error(error);
    } finally {
        popupEditProfile.renderLoading(false);
    }
}

// Обработчик лайков
async function handleLike() {
    const isRemove = this._likeButton.classList.contains('card__like-button_active');
    try {
        if (isRemove) {
            const result = await api.likeCardRemove(this._id);
            this.handleLikeButton(result.likes)
            return;
        }
        const result = await api.likeCardAdd(this._id);
        this.handleLikeButton(result.likes)
    } catch (error) {
        console.log(error);
    }

}

// Создание экземпляра попапа редактирования профиля
const popupEditProfile = new PopupWithForm('#profilePopup', handleFormProfileSubmit);
popupEditProfile.setEventListeners();

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
async function handleAddPlaceFormSubmit(data) {
    popupAddPlace.renderLoading(true, 'Создание...');
    try {
        const result = await api.addNewCard({name: data['place'], link: data['link']});
        const card = getCard(
            result,
            '#card-template',
            popupWithImage.open,
            popupConfirm.open,
            handleLike
        );
        const cardElement = card.generateCard();
        section.addItem(cardElement);
        popupAddPlace.close();
    } catch (error) {
        console.log(error);
    } finally {
        popupAddPlace.renderLoading(false);
    }
    addPlaceFormValidation.setSubmitButtonState(popupAddPlace._formElement.checkValidity())
}

// Создание экземпляра попапа добавления нового места
const popupAddPlace = new PopupWithForm('#popupAddPlace', handleAddPlaceFormSubmit);
popupAddPlace.setEventListeners();

// Добавление обработчика события на кнопку "Добавить новое место"
profileAddButton.addEventListener('click', () => popupAddPlace.open());
// Добавление обработчика события на кнопку "Закрыть" в попапе добавления нового места
closeButtonPlace.addEventListener('click', popupAddPlace.close);

// Обработчик отправки формы обновить аватара
async function handlePopupUpdateAvatar(data) {
    const avatarLink = data['link-avatar'];
    popupUpdateAvatar.renderLoading(true, 'Сохранение...');
    try {
        await api.changeAvatar({link: avatarLink});
        userInfo.setAvatar({avatar: avatarLink});
        popupUpdateAvatar.close();
    } catch (error) {
        console.error('Ошибка при обновлении аватара:', error);
    } finally {
        popupUpdateAvatar.renderLoading(false);
    }
}

// // Создание экземпляра попапа обновить аватар
const popupUpdateAvatar = new PopupWithForm('#popupUpdateAvatar', handlePopupUpdateAvatar);
popupUpdateAvatar.setEventListeners();

// Обработчик клика на иконку редактирования (открывает форму)
editButtonAvatar.addEventListener('click', () => {
    popupUpdateAvatar.open();
});

// Функция создания карточки с переданными данными
function getCard(data, templateSelector, handleCardClick, handleConfirm, handleLike) {
    return new Card(data, templateSelector, handleCardClick, handleConfirm, handleLike);
}

// Функция рендеринга карточки
function renderer(item) {
    const card = getCard(
        item,
        '#card-template',
        popupWithImage.open,
        popupConfirm.open,
        handleLike
    );
    return card.generateCard();
}

// Создание экземпляра класса UserInfo для управления данными профиля
const userInfo = new UserInfo({
    name: '.profile__name',
    job: '.profile__title',
    avatar: '.profile__avatar'
});

async function init () {
    try {
        const info = await api.getUserInfo();
        userInfo.setUserInfo({name: info.name, job: info.about});
        userInfo.setAvatar({avatar: info.avatar})
        const cards = await api.getCards();
        section.renderItems(cards.reverse());
    } catch (error) {
        console.error(error);
    }
}

init();

// Создание экземпляра валидатора для формы редактирования профиля
const editProfileFormValidation = new FormValidator(validationConfig, popupEditProfile._formElement);
editProfileFormValidation.enableValidation();
// Создание экземпляра валидатора для формы добавить место
const addPlaceFormValidation = new FormValidator(validationConfig, popupAddPlace._formElement);
addPlaceFormValidation.enableValidation();
// Создание экземпляра валидатора для формы Обновить аватар
const updateAvatarForm = new FormValidator(validationConfig, popupUpdateAvatar._formElement);
updateAvatarForm.enableValidation();

