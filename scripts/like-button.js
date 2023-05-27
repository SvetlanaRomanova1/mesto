// Обработчик нажатия кнопки like-button
function handleLikeButton(event) {
    const button = event.target;
    if (button.className.includes('element__like-button_active')) {
        return button.className = 'element__like-button'
    }
    return button.className = 'element__like-button element__like-button_active'
}

export function addListenerLikeButton(div) {
    div.querySelector('.element__like-button').addEventListener('click', handleLikeButton);
}