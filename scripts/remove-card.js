// Удаление карточки
export function addListenerRemoveCard(card) {
    card.querySelector('.card__delete-button').addEventListener('click', handleDeleteButton);
}

// Обработчик удаление карточки
function handleDeleteButton(event) {
    event.target.closest('.card').remove();
}