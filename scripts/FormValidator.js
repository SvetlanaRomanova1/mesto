export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
    }

    // Приватный метод устанавливает состояние ошибки для указанного input.
    _setErrorState(input, isInputValid) {
        const errorSpan = input.parentNode.querySelector(`.${this._errorClass}`);
        errorSpan.textContent = input.validationMessage;
        input.classList.toggle(this._inputErrorClass, !isInputValid);
    }

    // Приватный метод устанавливает состояние кнопки отправки формы в зависимости от валидности формы.
    _setSubmitButtonState(isFormValid) {
        const submitButton = this._formElement.querySelector(
            this._submitButtonSelector
        );
        submitButton.disabled = !isFormValid;
        submitButton.classList.toggle(
            this._inactiveButtonClass,
            !isFormValid
        );
    }

    // Приватный метод обрабатывает событие input для элементов input формы.
    _handleInputChange(event) {
        const input = event.target;
        const isInputValid = input.validity.valid;

        // Устанавливаем состояние кнопки отправки и ошибку для текущего input
        this._setSubmitButtonState(this._formElement.checkValidity());
        this._setErrorState(input, isInputValid);
    }

    // Приватный метод устанавливает обработчики событий для элементов формы.
    _setEventListeners() {
        const inputs = this._formElement.querySelectorAll(this._inputSelector);
        inputs.forEach((input) => {
            input.addEventListener('input', this._handleInputChange.bind(this));
        });
    }

    // Публичный метод включает валидацию формы.
    enableValidation() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        // Устанавливаем обработчики событий для элементов формы и начальное состояние кнопки отправки
        this._setEventListeners();
        this._setSubmitButtonState(false);
    }
}
