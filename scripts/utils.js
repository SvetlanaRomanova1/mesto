// Функция обработки клика по overlay
export function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        const popup = event.target.closest('.popup');
        if (popup) {
            closePopup(popup);
        }
    }
}

// Функция обработки клавиши Escape
export function handleKeyDown(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        if (popup) {
            closePopup(popup);
        }
    }
}

// Функция открытия popup
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', handleOverlayClick);
    document.addEventListener('keydown', handleKeyDown);
}

// Функция закрытия popup
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('mousedown', handleOverlayClick);
    document.removeEventListener('keydown', handleKeyDown);
}
