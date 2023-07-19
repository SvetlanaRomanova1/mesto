import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);
        this._submitCallback = submitCallback;
        this._formElement = this.popupElement.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
        });
    }

    close ()  {
        super.close();
        this._formElement.reset();
    }
}
