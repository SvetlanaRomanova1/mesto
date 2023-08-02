import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback, setErrorState) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this.setErrorState = setErrorState;
        this._formElement = this.popupElement.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__input');
        this._submitButtonSave = this._formElement.querySelector('.popup__sending-button')
        this._submitButtonTextSave = this._submitButtonSave.textContent;
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    renderLoading(isLoading, text) {
        if (isLoading) {
            console.log({isLoading, submitButton: this._submitButtonSave})
            this._submitButtonSave.textContent = text;
        } else {
            this._submitButtonSave.textContent = this._submitButtonTextSave;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}
