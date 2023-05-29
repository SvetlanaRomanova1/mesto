import {elements} from "./elements.js";
import {openPopup, closePopup} from "./helper.js";
// Обработчик открытия картинки
 function handleClickImage(event) {
     const imageSrc = event.target.getAttribute('src');
     const altText = event.target.getAttribute('alt');
     elements.popupImage.src = imageSrc;
     elements.popupImage.alt = altText;
     elements.textElement.textContent = altText;
     openPopup(elements.popupOverlay);
}

// Обработчик закрытия картинки
function handleCloseButton() {
    closePopup(elements.popupOverlay);
}

elements.crossButton.addEventListener('click', handleCloseButton);

export function addListenerOpenImage(div) {
    div.querySelector('img').addEventListener('click', handleClickImage);
}