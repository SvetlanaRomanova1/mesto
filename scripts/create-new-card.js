import {
    changeAttributeForm,
    changeNameSaveButton,
    changePlaceholders,
    changePopupTitle, insertHTML
} from "./helper.js";
import {appNodeElements} from "./app-node-elements.js";
import {addListenerLikeButton} from "./like-button.js";
import {addListenerOpenImage} from "./open-clolse-pictures.js";


// Обработчик нажатия кнопки добавить новое место
function handleAddButton() {
    changePopupTitle('Новое место');
    changePlaceholders(['Название', 'Ссылка на картинку']);
    changeNameSaveButton('Создать');
    changeAttributeForm('create');
    appNodeElements.nameInput.value = '';
    appNodeElements.jobInput.value = '';
    appNodeElements.popup.classList.add('popup_opened');
}

appNodeElements
    .profileAddButton
    .addEventListener('click', handleAddButton)

export function createNewCard(name, link) {
    const div = document.createElement('div');
    div.classList.add('element');
    const card = `
                <img class="element__image" src=${link} alt=${name}>
                <button class="element__delete-button" type="button" aria-label="Корзина"></button>
                <div class="element__container">
                    <h4 class="element__title">${name}</h4>
                    <button id="like" class="element__like-button" type="button" aria-label="Лайк"></button>
                </div>
`;
    insertHTML(div, card);
    appNodeElements.elements.insertAdjacentElement('afterbegin',div);
    addListenerLikeButton(div);
    addListenerOpenImage(div);
    addListenerRemoveCard(div);
}

// Удаление нового элемента
function addListenerRemoveCard(card) {
    card.querySelector('.element__delete-button').addEventListener('click', handleDeleteButton);
}

document.querySelectorAll('.element__delete-button').forEach(addListenerRemoveCard);

function handleDeleteButton(event) {
    event.target.closest('.element').remove();
}
