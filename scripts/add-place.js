import {elements} from "./elements.js";
import {renderCard} from "./render-card.js";
import {closePopup, openPopup} from "./helper.js";

// Обработчик кнопки добавить новое место
function handleOpenPopup() {
    openPopup(elements.popupAddPlace);
}

elements.profileAddButton.addEventListener('click', handleOpenPopup);

// Обработчик кнопки закрыть
function handleCloseButton(){
    closePopup(elements.popupAddPlace);
}

elements.closeButtonPlace.addEventListener('click', handleCloseButton);

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault();
    renderCard(elements.place.value, elements.linkPlace.value);
    handleCloseButton();
    elements.popupAddPlace.querySelector('form').reset(); // Очищаем поля формы
}

elements.popupAddPlace.querySelector('form').addEventListener('submit', handleFormSubmit);