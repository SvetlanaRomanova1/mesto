import {elements} from "./elements.js";
import {renderCard} from "./render-card.js";

// Обработчик кнопки добавить новое место
function handleOpenPopup() {
    elements.popupAddPlace.classList.add('popup_opened')
}

elements.profileAddButton.addEventListener('click', handleOpenPopup);

// Обработчик кнопки закрыть
function handleCloseButton(){
    elements.popupAddPlace.classList.remove('popup_opened')
}

elements.closeButtonPlace.addEventListener('click', handleCloseButton);

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    renderCard(elements.place.value, elements.linkPlace.value)
    handleCloseButton();
}

elements.popupAddPlace.querySelector('form').addEventListener('submit', handleFormSubmit)