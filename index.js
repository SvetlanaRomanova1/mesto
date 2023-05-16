// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#job');


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    console.log({nameInput, jobInput, nameValue, jobValue});

    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profileTitle = document.querySelector('.profile__title');
    console.log({profileName, profileTitle})

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameValue;
    profileTitle.textContent = jobValue;
    handleCloseButton();

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//Находим кнопку редактировать
let profileButton = document.querySelector('.profile__button');

// Находим элемент popup
let popup = document.querySelector('#popup');

// Находим элемент close-button
let closeButton = document.querySelector('#closeButton');

// Находим все элемент like-button
let likeButtons = document.querySelectorAll('.element__like-button');



// Обработчик нажатия кнопки редактировать
function handleEditButton() {
    let profileName = document.querySelector('.profile__name');
    let profileTitle = document.querySelector('.profile__title');
    nameInput.value = profileName.textContent;
    jobInput.value = profileTitle.textContent;
    popup.className = 'popup popup_opened';
}



profileButton.addEventListener('click', handleEditButton);

// Обработчик нажатия кнопки закрыть
function handleCloseButton() {
    popup.className = 'popup';
}

closeButton.addEventListener('click', handleCloseButton);

// Обработчик нажатия кнопки like-button
function handleLikeButton (event){
    const button = event.target;
    if(button.className.includes('element__like-button_active')) {
       return  button.className = 'element__like-button'
    }

    return button.className = 'element__like-button element__like-button_active'
}


Array.from(likeButtons).forEach((el) => {
    el.addEventListener('click', handleLikeButton)
});





