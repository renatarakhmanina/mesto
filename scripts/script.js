const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.js-profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input-item-name');
const jobInput = formElement.querySelector('.popup__input-item-about');
const profileName = document.querySelector('.profile__name');
const profileSubline = document.querySelector('.profile__subline');



const popupOpen = (event) => {
  console.log('Event: ', event)
  popup.classList.add('popup_opened')
}

const popupClose = (event) => {
  console.log('Event: ', event)
  popup.classList.remove('popup_opened')
}

popupEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);


const formSubmitButton = formElement.querySelector('.popup__form-submit-button');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInput.value;
    profileSubline.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
formSubmitButton.addEventListener('click', popupClose);