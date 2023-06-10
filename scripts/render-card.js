import {elements} from "./elements.js";
import {addListenerLikeButton} from "./like-button.js";
import {addListenerOpenImage} from "./open-picture.js";
import {addListenerRemoveCard} from "./remove-card.js";

// Создание новой карточки
function createNewCard(name, link) {
    // Клонирование элемента карточки из шаблона
    const cardElement = elements.cardTemplate.querySelector('.card').cloneNode(true);
    // Заполнение данных карточки
    const image = cardElement.querySelector('.card__image');
    image.src = link;
    image.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    // Добавление обработчиков событий на кнопки карточки
    addListenerLikeButton(cardElement);
    addListenerOpenImage(cardElement);
    addListenerRemoveCard(cardElement);
    return cardElement;
}

// Отображение карточки
export function renderCard(name, link) {
    // Создание новой карточки
    const newCard = createNewCard(name, link);
    // Добавление карточки в контейнер
    elements.cards.prepend(newCard);
}

