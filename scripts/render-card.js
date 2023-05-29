import {elements} from "./elements.js";
import {addListenerLikeButton} from "./like-button.js";
import {addListenerOpenImage} from "./open-picture.js";
import {addListenerRemoveCard} from "./remove-card.js";

// Создание карточки
function createNewCard(name, link) {
    const cardElement = elements.cardTemplate.querySelector('.card').cloneNode(true);
    const image = cardElement.querySelector('.card__image');
    image.src = link;
    image.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    addListenerLikeButton(cardElement);
    addListenerOpenImage(cardElement);
    addListenerRemoveCard(cardElement);
    return cardElement;
}

// Отображение карточки
export function renderCard(name, link) {
    const newCard = createNewCard(name, link);
    elements.cards.prepend(newCard);
}

