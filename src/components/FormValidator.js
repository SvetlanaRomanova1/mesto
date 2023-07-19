export default class FormValidator {
    constructor(config, formElement) {
        this._formElement = formElement;
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    };

    // Приватный метод устанавливает состояние ошибки для указанного input.
    setErrorState(input) {
        const isInputValid = input.validity.valid;
        const errorSpan = input.parentNode.querySelector(`.${this._errorClass}`);
        errorSpan.textContent = input.validationMessage;
        input.classList.toggle(this._inputErrorClass, !isInputValid);
    };

    // Приватный метод устанавливает состояние кнопки отправки формы в зависимости от валидности формы.
    setSubmitButtonState(isFormValid) {
        const submitButton = this._formElement.querySelector(
            this._submitButtonSelector
        );
        submitButton.disabled = !isFormValid;
        submitButton.classList.toggle(
            this._inactiveButtonClass,
            !isFormValid
        );
    };

    // Приватный метод обрабатывает событие input для элементов input формы.
    _handleInputChange(event) {
        const input = event.target;

        // Устанавливаем состояние кнопки отправки и ошибку для текущего input
        this.setSubmitButtonState(this._formElement.checkValidity());
        this.setErrorState(input);
    };

    // Приватный метод устанавливает обработчики событий для элементов формы.
    _setEventListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener('input', this._handleInputChange.bind(this));
        });
    };

    // Публичный метод включает валидацию формы.
    enableValidation() {
        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        // Устанавливаем обработчики событий для элементов формы и начальное состояние кнопки отправки
        this._setEventListeners();
        this.setSubmitButtonState(false);
    }

    resetValidation() {
        this._inputList.forEach(input => {
            this.setErrorState(input);
        })
    }
};
