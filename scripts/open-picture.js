import {elements} from "./elements.js";

// Обработчик открытия картинки
 function handleClickImage(event) {
     const imageSrc = event.target.getAttribute('src');
     const altText = event.target.getAttribute('alt');
     elements.popupImage.src = imageSrc;
     elements.popupImage.alt = altText;
     elements.textElement.textContent = altText;
     elements.popupOverlay.classList.add('popup_opened');
}

// Обработчик закрытия картинки
function closePopup() {
    elements.popupOverlay.classList.remove('popup_opened');
}

elements.crossButton.addEventListener('click', closePopup);

export function addListenerOpenImage(div) {
    div.querySelector('img').addEventListener('click', handleClickImage)
}