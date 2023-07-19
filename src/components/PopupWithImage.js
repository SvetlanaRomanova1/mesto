import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open = (e) =>  {
        super.open();
        const link = e.target.getAttribute('src');
        const name = e.target.getAttribute('alt');
        this.popupImage = this.popupElement.querySelector('.popup__image')
        this.popupImage.src = link;
        this.popupImage.alt = name;
        this.popupText = this.popupElement.querySelector('.popup__text');
        this.popupText.textContent = name;
    }
}