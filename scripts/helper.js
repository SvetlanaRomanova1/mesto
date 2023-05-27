// Изменения заголовка
export function changePopupTitle(title) {
    const popupTitle = document.querySelector('.popup__title');
    popupTitle.textContent = title;
}

// Изменение атрибута формы
export function changeAttributeForm(name) {
    const formElement = document.querySelector('.popup__form');
    formElement.setAttribute('name', name);
}

// Изменение названия плейсхолдера popup__field
export function changePlaceholders(array) {
    const popupField = document.querySelectorAll('.popup__field input');
    Array.from(popupField).forEach((input, i) => {
        input.placeholder = array[i] || ''
    })
}

// Изменения названия кнопки сохранить
export function changeNameSaveButton(title) {
    const saveButton = document.querySelector('.popup__button');
    saveButton.textContent = title;
}

export const insertHTML = (el, html) => el.insertAdjacentHTML("afterbegin", html);