import {initialCards} from "./data.js";
import {elements} from "./elements.js";
import {setSubmitButtonState} from "./validate.js";



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
    elements.nameInput.value = elements.profileName.textContent;
    elements.jobInput.value = elements.profileTitle.textContent;

    // Скрытие ошибок во всех полях формы
    Array.from(elements.popupForm.querySelectorAll('input')).forEach(input => {
        hideError(input, 'popup__input_type_error');
    });

    // Сброс состояния кнопки
    resetButton(elements.saveProfileButton, true);

    // Открытие попапа с формой
    openPopup(elements.popupForm);
}

// Добавление обработчика события на кнопку "Редактировать"
elements.profileButton.addEventListener('click', handleEditButton);

// Обработчик нажатия кнопки "Закрыть"
function handleCloseButton() {
    // Закрытие попапа с формой
    closePopup(elements.popupForm);
}

// Добавление обработчика события на кнопку "Закрыть"
elements.closeButton.addEventListener('click', handleCloseButton);

// Сохранение информации профиля
function saveProfileInfo() {
    // Получение значений полей jobInput и nameInput из свойства value
    const nameValue = elements.nameInput.value;
    const jobValue = elements.jobInput.value;

    // Выбор элементов, куда должны быть вставлены значения полей
    const profileName = elements.profileName;
    const profileTitle = elements.profileTitle;

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
elements.popupForm.querySelector('form').addEventListener('submit', handleFormProfileSubmit);

// Логика попапа добавить новое место
// Обработчик кнопки "Добавить новое место"
function handleOpenAddPlacePopup() {
    openPopup(elements.popupAddPlace);
}

elements.profileAddButton.addEventListener('click', handleOpenAddPlacePopup);

// Обработчик кнопки "Закрыть"
function handleCloseButtonAddPlace(){
    closePopup(elements.popupAddPlace);
}

elements.closeButtonPlace.addEventListener('click', handleCloseButtonAddPlace);

// Обработчик "отправки" формы
function handleAddPlaceFormSubmit(evt) {
    evt.preventDefault();

    // Создание новой карточки с помощью введенных данных из формы
    renderCard(elements.place.value, elements.linkPlace.value);

    // Закрытие попапа и сброс значений формы
    handleCloseButtonAddPlace();
    // Состояние кнопки отправки формы на основе валидности формы
    setSubmitButtonState(elements.addNewLocation, false, 'popup__button_disabled')
    elements.popupAddPlace.querySelector('form').reset()
}

elements.popupAddPlace.querySelector('form').addEventListener('submit', handleAddPlaceFormSubmit);

// Обработчик нажатия кнопки like-button
function handleLikeButton(event) {
    const button = event.target;
    button.classList.toggle('card__like-button_active');
}

function addListenerLikeButton(div) {
    div.querySelector('.card__like-button').addEventListener('click', handleLikeButton);
}


// Создание новой карточки
function createNewCard(name, link) {
    // Клонирование элемента карточки из шаблона
    const cardElement = elements.cardTemplate.querySelector('.card').cloneNode(true);
    // Заполнение данных карточки
    const image = cardElement.querySelector('.card__image');
    image.src = link;
    image.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    // Добавление обработчиков событий на кнопки карточки
    addListenerLikeButton(cardElement);
    addListenerOpenImage(cardElement);
    addListenerRemoveCard(cardElement);
    return cardElement;
}

// Отображение карточки
function renderCard(name, link) {
    // Создание новой карточки
    const newCard = createNewCard(name, link);
    // Добавление карточки в контейнер
    elements.cards.prepend(newCard);
}

// Удаление карточки
function addListenerRemoveCard(card) {
    card.querySelector('.card__delete-button').addEventListener('click', handleDeleteButton);
}

// Обработчик удаление карточки
function handleDeleteButton(event) {
    event.target.closest('.card').remove();
}

// Обработчик открытия картинки
function handleClickImage(event) {
    const imageSrc = event.target.getAttribute('src');
    const altText = event.target.getAttribute('alt');
    elements.popupImage.src = imageSrc;
    elements.popupImage.alt = altText;
    elements.textElement.textContent = altText;
    openPopup(elements.popupOverlay);
}

// Обработчик закрытия картинки
function closeImagePopup() {
    closePopup(elements.popupOverlay);
}

elements.crossButton.addEventListener('click', closeImagePopup);

// Добавление обработчика клика на изображение в переданном div элементе
function addListenerOpenImage(div) {
    div.querySelector('img').addEventListener('click', handleClickImage);
}



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

// Отображение карточек при загрузке страницы
initialCards.forEach(function (item){
    renderCard(item.name, item.link)
});
