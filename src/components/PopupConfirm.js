import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(selector, handleDeleteCard) {
        super(selector);
        this._handleDeleteCard = handleDeleteCard;
    }

    open(card) {
        super.open();
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popupElement.querySelector('.popup__form-confirm')
            .addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._handleDeleteCard(this._card)
                this.close();
            })
    }
}
