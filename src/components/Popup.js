export default class Popup {
    constructor(selector) {
        this.popupElement = document.querySelector(selector);
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
            const popup = document.querySelector('.popup_opened');
            if (popup) {
                this.close(popup);
            }
        }
    }

    _handleOverlayClick = (event) =>{
        if (event.target === event.currentTarget) {
            const popup = event.target.closest('.popup');
            if (popup) {
                this.close(popup);
            }
        }
    }

    open  ()  {
        this.popupElement.classList.add('popup_opened');
        this.popupElement.addEventListener('mousedown', this._handleOverlayClick);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close = () => {
        this.popupElement.classList.remove('popup_opened');
        this.popupElement.removeEventListener('mousedown', this._handleOverlayClick);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this.popupElement.querySelector('.popup__cross-button')
            .addEventListener('click', this.close)
    }
}