import './scripts/init.js';
import "./scripts/like-button.js";
import './scripts/data.js';
import './scripts/like-button.js';
import './scripts/open-clolse-pictures.js';
import {createNewCard} from './scripts/create-new-card.js';
import {appNodeElements} from './scripts/app-node-elements.js'
import {
    changeAttributeForm,
    changeNameSaveButton,
    changePlaceholders,
    changePopupTitle,
} from "./scripts/helper.js";

// Находим поля формы в DOM
const nameInput = appNodeElements.nameInput;
const jobInput = appNodeElements.jobInput;

// Сохранения профиля
function saveProfileInfo() {
    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = appNodeElements.profileName;
    let profileTitle = appNodeElements.profileTitle;

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileTitle.textContent = jobValue;
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    const attributeForm = appNodeElements.formElement.getAttribute('name');
    if (attributeForm === 'edit-profile') {
        saveProfileInfo();
    } else {
        createNewCard(nameInput.value, jobInput.value);
    }
    handleCloseButton();
}

// Прикрепляем обработчик к форме:
appNodeElements.formElement.addEventListener('submit', handleFormSubmit);

// Обработчик нажатия кнопки редактировать
function handleEditButton() {
    changePopupTitle('Редактировать профиль');
    changePlaceholders(['Имя', 'О себе']);
    changeNameSaveButton('Сохранить');
    changeAttributeForm('edit-profile')
    nameInput.value = appNodeElements.profileName.textContent;
    jobInput.value = appNodeElements.profileTitle.textContent;
    appNodeElements.popup.classList.add('popup_opened');
}

appNodeElements.profileButton.addEventListener('click', handleEditButton);

// Обработчик нажатия кнопки закрыть
function handleCloseButton() {
    appNodeElements.popup.classList.remove('popup_opened');
}


appNodeElements.closeButton.addEventListener('click', handleCloseButton);

// Обработчик нажатия кнопки delete-button
function handleDeleteButton(event) {
    const card = event.target.closest('.element');
    card.remove();
}

appNodeElements.deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', handleDeleteButton);
});