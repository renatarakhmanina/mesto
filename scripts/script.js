const popup = document.querySelector('.popup');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input-item_name');
const jobInput = formElement.querySelector('.popup__input-item_about');
const profileName = document.querySelector('.profile__name');
const profileSubline = document.querySelector('.profile__subline');
const formSubmitButton = formElement.querySelector('.popup__form-submit-button');


const popupOpen = () => {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
}

const popupClose = () => {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInput.value;
    profileSubline.textContent = jobInput.value;

    popupClose();
}
popupEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
