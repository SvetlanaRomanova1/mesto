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

    // Функция для установки состояния ошибки в поле ввода
    function setErrorState(input, isInputValid) {
        const errorSpan = input.parentNode.querySelector(`.${errorClass}`);
        errorSpan.textContent = input.validationMessage;
        input.classList.toggle(inputErrorClass, !isInputValid);
    }

    // Функция для установки состояния кнопки отправки формы
    function setSubmitButtonState(button, isFormValid) {
        button.disabled = !isFormValid;
        button.classList.toggle(inactiveButtonClass, !isFormValid);
    }

    // Функция обработки события изменения в поле ввода
    function handleInputChange(event) {
        const input = event.target;
        const isInputValid = input.validity.valid;
        const form = input.closest('form');
        const submitButton = form.querySelector(submitButtonSelector);

        // Состояние кнопки отправки формы на основе валидности формы
        setSubmitButtonState(submitButton, form.checkValidity());
        setErrorState(input, isInputValid);
    }
    // Слушатель событий input для всех элементов input
    Array.from(inputs).forEach((input) => {
        input.addEventListener('input', handleInputChange);
    });
}
// Вызов функции enableValidation с нужной конфигурацией
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error-visible'
});
