// Функция для установки состояния ошибки в поле ввода
function setErrorState(input, isInputValid, errorClass, inputErrorClass) {
    const errorSpan = input.parentNode.querySelector(`.${errorClass}`);
    errorSpan.textContent = input.validationMessage;
    input.classList.toggle(inputErrorClass, !isInputValid);
}

// Функция для установки состояния кнопки отправки формы
export function setSubmitButtonState(button, isFormValid, inactiveButtonClass = 'popup__button_disabled') {
    button.disabled = !isFormValid;
    button.classList.toggle(inactiveButtonClass, !isFormValid);
}

// Функция обработки события изменения в поле ввода
function handleInputChange(event, submitButton, inputErrorClass, errorClass) {
    const input = event.target;
    const isInputValid = input.validity.valid;

    // Состояние кнопки отправки формы на основе валидности формы
    setSubmitButtonState(submitButton, input.closest('form').checkValidity());
    setErrorState(input, isInputValid, errorClass, inputErrorClass);
}

function enableValidation(config) {
    const {
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass
    } = config;

    // Получаем все элементы input
    const inputs = document.querySelectorAll(inputSelector);

    // Слушатель событий input для всех элементов input
    inputs.forEach(input => {
        const form = input.closest('form');
        const submitButton = form.querySelector(submitButtonSelector);

        input.addEventListener('input', event => {
            handleInputChange(event, submitButton, inputErrorClass, errorClass);
        });
    });

    // Деактивировать кнопки сабмита всех форм
    // Получаем все кнопки отправки форм
    const submitButtons = document.querySelectorAll(submitButtonSelector);
    submitButtons.forEach(button => {
        setSubmitButtonState(button, false, inactiveButtonClass);
    });
}

// Вызов функции enableValidation с нужной конфигурацией
enableValidation({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-visible'
});
