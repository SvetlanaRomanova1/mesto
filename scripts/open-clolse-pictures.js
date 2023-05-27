import {appNodeElements} from "./app-node-elements.js";

// Обработчик открытия картинки
 function handleClickImage(event) {
     const imageSrc = event.target.getAttribute('src');
     const altText = event.target.getAttribute('alt');
     appNodeElements.popupImage.src = imageSrc;
     appNodeElements.popupImage.alt = altText;
     appNodeElements.textElement.textContent = altText;
     appNodeElements.popupOverlay.classList.add('popup_opened');
}

// Обработчик закрытия картинки
function closePopup() {
    appNodeElements.popupOverlay.classList.remove('popup_opened');
}

appNodeElements.crossButton.addEventListener('click', closePopup);

export function addListenerOpenImage(div) {
    div.querySelector('img').addEventListener('click', handleClickImage)
}