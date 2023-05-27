// Обработчик нажатия кнопки like-button
function handleLikeButton(event) {
    const button = event.target;
    button.classList.toggle('card__like-button_active');
}

export function addListenerLikeButton(div) {
    div.querySelector('.card__like-button').addEventListener('click', handleLikeButton);
}
