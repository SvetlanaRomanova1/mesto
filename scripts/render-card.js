import {elements} from "./elements.js";
import {addListenerLikeButton} from "./like-button.js";
import {addListenerOpenImage} from "./open-picture.js";
import {addListenerRemoveCard} from "./remove-card.js";

// Отображение карточки
export function renderCard(name, link) {
    const cardElement = elements.cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    addListenerLikeButton(cardElement);
    addListenerOpenImage(cardElement);
    addListenerRemoveCard(cardElement);
    elements.cards.prepend(cardElement);
}