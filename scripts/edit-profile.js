import {elements} from "./elements.js";

// Обработчик нажатия кнопки редактировать
function handleEditButton() {
    elements.nameInput.value = elements.profileName.textContent;
    elements.jobInput.value = elements.profileTitle.textContent;
    elements.popupForm.classList.add('popup_opened');
}

elements.profileButton.addEventListener('click', handleEditButton);

// Обработчик нажатия кнопки закрыть
function handleCloseButton() {
    elements.popupForm.classList.remove('popup_opened');
}

elements.closeButton.addEventListener('click', handleCloseButton);

// Сохранения профиля
function saveProfileInfo() {
    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = elements.nameInput.value;
    const jobValue = elements.jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = elements.profileName;
    const profileTitle = elements.profileTitle;

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileTitle.textContent = jobValue;
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    saveProfileInfo();
    handleCloseButton();
}

// Прикрепляем обработчик к форме:
elements.popupForm.querySelector('form').addEventListener('submit', handleFormSubmit);
