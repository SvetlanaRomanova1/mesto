import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this.popupImage = this.popupElement.querySelector('.popup__image');
        this.popupText = this.popupElement.querySelector('.popup__text');
    }

    open(cardData) {
        super.open();
        const {link, name} = cardData;
        this.popupImage.src = link;
        this.popupImage.alt = name;
        this.popupText.textContent = name;
    }
}