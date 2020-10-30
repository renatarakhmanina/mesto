import {initialCards} from './initialcards.js';

const popupEdit = document.querySelector('.popup__edit');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupEditCloseButton = popupEdit.querySelector('.popup__edit-close');

const popupAddItem = document.querySelector('.popup__add-item');
const popupAddItemButton = document.querySelector('.profile__add-button');
const popupAddItemCloseButton = popupAddItem.querySelector('.popup__add-item-close');

const popupImageView = document.querySelector('.popup__image-view');
const popupImageViewCloseButton = popupImageView.querySelector('.popup__image-view-close');

const popupImageViewSource = popupImageView.querySelector('.popup__image');
const popupImageViewName = popupImageView.querySelector('.popup__image-name');

const formElementEdit = document.querySelector('.popup__edit-form');
const nameInput = formElementEdit.querySelector('.popup__input-item_name');
const jobInput = formElementEdit.querySelector('.popup__input-item_about');
const profileName = document.querySelector('.profile__name');
const profileSubline = document.querySelector('.profile__subline');

const formElementAdd = document.querySelector('.popup__add-form');
const cardNameInput = formElementAdd.querySelector('.popup__input-item_card-name');
const cardLinkInput = formElementAdd.querySelector('.popup__input-item_card-link');

const cardTemplate = document.querySelector('.card-container').content;
const cards = document.querySelector('.cards');


function render () {
  cards.innerHTML = '';
  initialCards.forEach(card => addCard(card));
}

// функция создания новой карточки и добавления слушателей //
function renderItem(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__photo');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardAlt = cardElement.querySelector('.card__photo');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardAlt.alt = card.name;

  cardLikeButton.addEventListener('click', () => {
    handleLikeButton(cardLikeButton)
  });

  cardDeleteButton.addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  
  cardImage.addEventListener('click', () => { 
    openImageViewPopup(cardImage, cardTitle) 
  });

  return cardElement;
}

//  функция добавления карточек из массива на страницу //
function addCard (card) {
  cards.append(renderItem(card));
}

// функция добавления и удаления лайка //
const handleLikeButton = (cardLikeButton) => {
  cardLikeButton.classList.toggle('card__like-button_active');
}

// функция открытия попапа //
function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupOnEscape);
}

// функция закрытия попапа //
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupOnEscape);
}

// функция закрытия попапа клавишей Esc // 
function handleClosePopupOnEscape (event) {
  if (event.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// Закрытие модального окна по клику на оверлэй // 
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach((popupElement) => {
  popupElement.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      closePopup(event.target);
    }
  }); 
});

// функция открытия попапа просмотра фотографии //
function openImageViewPopup(cardImage, cardTitle) {
  openPopup(popupImageView);
  popupImageViewSource.src = cardImage.src;
  popupImageViewName.textContent = cardTitle.textContent;
}

// функция создания пользователем новой карточки //
function handleAddFormSubmit (evt) {
  evt.preventDefault(); 

  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  cardNameInput.value = '';
  cardLinkInput.value = '';

  cards.prepend(renderItem(card));
  closePopup(popupAddItem);
}

// Исключение возможности создания пустой карточки // 
export function setDisabledButton (buttonElement) {
  buttonElement.classList.add('popup__form-submit-button_inactive'); 
  buttonElement.setAttribute("disabled", true); 
}

function disableSubmitButton () {
  const submitButtonList = Array.from(document.querySelectorAll('.popup__form-submit-button')); 
  submitButtonList.forEach((buttonElement) => { 
    setDisabledButton(buttonElement);
  }); 
}

// функция открытия формы редактирования //
const openEditPopup = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
  openPopup(popupEdit);
  disableSubmitButton();
}

// функция редактирования данных пользователя //
function handleEditFormSubmit (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInput.value;
    profileSubline.textContent = jobInput.value;

    closePopup(popupEdit);
}


render();


popupEditButton.addEventListener('click', openEditPopup);
popupEditCloseButton.addEventListener('click', () => {
  closePopup(popupEdit);
});
popupAddItemButton.addEventListener('click', () => {
  openPopup(popupAddItem)
  disableSubmitButton();
});
popupAddItemCloseButton.addEventListener('click', () => {
  closePopup(popupAddItem)
});
formElementEdit.addEventListener('submit', handleEditFormSubmit);
formElementAdd.addEventListener('submit', handleAddFormSubmit);

popupImageViewCloseButton.addEventListener('click', () => {
  closePopup(popupImageView);
});





