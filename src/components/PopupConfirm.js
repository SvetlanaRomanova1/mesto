import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(selector, handleDeleteCard) {
        super(selector);
        this._handleDeleteCard = handleDeleteCard;
    }

    open(id) {
        super.open();
        this._id = id;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popupElement.querySelector('.popup__form-confirm')
            .addEventListener('submit', (evt) => {
                evt.preventDefault();
                this._handleDeleteCard(this._id)
                    .then(() => {
                        const card = document.querySelector(`[data-card-id="${this._id}"]`);
                        card.remove();
                        this.close();
                    })
            })
    }
}
