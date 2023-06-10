import { elements } from "./elements.js";
import { closePopup, openPopup } from "./helper.js";

// Сброс состояния ошибки для указанного поля
function resetErrorState(input, isInputValid) {
    const errorSpan = input.parentNode.querySelector(`.popup__error_visible`);
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
function handleFormSubmit(evt) {
    evt.preventDefault();
    saveProfileInfo();
    handleCloseButton();
}

// Прикрепление обработчика к форме
elements.popupForm.querySelector('form').addEventListener('submit', handleFormSubmit);
