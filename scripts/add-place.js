import { elements } from "./elements.js";
import { renderCard } from "./render-card.js";
import { closePopup, openPopup } from "./helper.js";

// Обработчик кнопки "Добавить новое место"
function handleOpenPopup() {
    openPopup(elements.popupAddPlace);
}

elements.profileAddButton.addEventListener('click', handleOpenPopup);

// Обработчик кнопки "Закрыть"
function handleCloseButton(){
    closePopup(elements.popupAddPlace);
}

elements.closeButtonPlace.addEventListener('click', handleCloseButton);

// Обработчик "отправки" формы
function handleFormSubmit(evt) {
    evt.preventDefault();

    // Создание новой карточки с помощью введенных данных из формы
    renderCard(elements.place.value, elements.linkPlace.value);

    // Закрытие попапа и сброс значений формы
    handleCloseButton();
    elements.popupAddPlace.querySelector('form').reset();
}

elements.popupAddPlace.querySelector('form').addEventListener('submit', handleFormSubmit);
