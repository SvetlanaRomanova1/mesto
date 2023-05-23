import {initialCards} from './data.js';

console.log({initialCards})

// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');

// Сохранения профиля
function saveProfileInfo() {
    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profileTitle = document.querySelector('.profile__title');

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileTitle.textContent = jobValue;
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    const attributeForm = formElement.getAttribute('name');
    if (attributeForm === 'edit-profile') {
        saveProfileInfo();
    } else {
        console.log('создать');
    }
    handleCloseButton();
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', handleFormSubmit);

//Находим кнопку редактировать
let profileButton = document.querySelector('.profile__button');

// Находим кнопку добавить место
const profileAddButton = document.querySelector('.profile__add-button');

// Находим элемент popup
let popup = document.querySelector('#popup');

// Находим элемент close-button
let closeButton = document.querySelector('#closeButton');

// Находим все элемент like-button
let likeButtons = document.querySelectorAll('.element__like-button');

// Находим элемент element
let element = document.querySelectorAll('.element');

// Находим кнопку delete-button
let deleteButtons = document.querySelectorAll('.element__delete-button');


// Обработчик нажатия кнопки редактировать
function handleEditButton() {
    changePopupTitle('Редактировать профиль');
    changePlaceholders(['Имя', 'О себе']);
    changeNameSaveButton('Сохранить');
    changeAttributeForm('edit-profile')
    let profileName = document.querySelector('.profile__name');
    let profileTitle = document.querySelector('.profile__title');
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;
    popup.classList.add('popup_opened');
}

// Изменения заголовка
function changePopupTitle(title) {
    const popupTitle = document.querySelector('.popup__title');
    popupTitle.textContent = title;
}

// Изменение атрибута формы
function changeAttributeForm(name) {
    formElement.setAttribute('name', name);
}

// Изменение названия плейсхолдера popup__field
function changePlaceholders(array) {
    const popupField = document.querySelectorAll('.popup__field input');
    Array.from(popupField).forEach((input, i) => {
        input.placeholder = array[i] || ''
    })
}

// Изменения названия кнопки сохранить
function changeNameSaveButton(title) {
    const saveButton = document.querySelector('.popup__button');
    saveButton.textContent = title;
}

profileButton.addEventListener('click', handleEditButton);

// Обработчик нажатия кнопки добавить новое место
function handleAddButton() {
    changePopupTitle('Новое место');
    changePlaceholders(['Название', 'Ссылка на картинку']);
    changeNameSaveButton('Создать');
    changeAttributeForm('create');
    nameInput.value = '';
    jobInput.value = '';
    popup.classList.add('popup_opened');
}

profileAddButton.addEventListener('click', handleAddButton)

// Обработчик нажатия кнопки закрыть
function handleCloseButton() {
    popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', handleCloseButton);

// Обработчик нажатия кнопки like-button
function handleLikeButton(event) {
    const button = event.target;
    if (button.className.includes('element__like-button_active')) {
        return button.className = 'element__like-button'
    }
    return button.className = 'element__like-button element__like-button_active'
}

Array.from(likeButtons).forEach((el) => {
    el.addEventListener('click', handleLikeButton)
});


// Обработчик нажатия кнопки delete-button
function handleDeleteButton(event) {
    const card = event.target.closest('.element');
    card.remove();
}

deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', handleDeleteButton);
});







