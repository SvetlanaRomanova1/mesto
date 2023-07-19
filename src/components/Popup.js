export default class Popup {
    constructor(selector) {
        this.popupElement = document.querySelector(selector);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this._handleOverlayClick = this._handleOverlayClick.bind(this);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose (event) {
        if (event.key === 'Escape') {
            const popup = document.querySelector('.popup_opened');
            if (popup) {
                this.close(popup);
            }
        }
    }

    _handleOverlayClick (event) {
        if (event.target === event.currentTarget) {
            const popup = event.target.closest('.popup');
            if (popup) {
                this.close();
            }
        }
    }

    open() {
        this.popupElement.classList.add('popup_opened');
        this.popupElement.addEventListener('mousedown', this._handleOverlayClick);
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        console.log(this.popupElement)
        this.popupElement.classList.remove('popup_opened');
        this.popupElement.removeEventListener('mousedown', this._handleOverlayClick);
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this.popupElement.querySelector('.popup__cross-button')
            .addEventListener('click', this.close);
    }
}