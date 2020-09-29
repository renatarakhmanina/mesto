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

// функция создания новой карточки и добавления слушателей//
function renderItem(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__photo');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardAlt = cardElement.querySelector('.card__photo');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelectorAll('.card__delete-button');
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardAlt.alt = card.name;

  cardLikeButton.addEventListener('click', () => {
    handleLikeButton(cardLikeButton)
  });

  cardImage.addEventListener('click', () => { 
    openImageViewPopup(cardImage, cardTitle) 
  });

  cardDeleteButton.forEach((btn) => {
    btn.addEventListener('click', function () {
      const cardItem = btn.closest('.card');
      cardItem.remove();
    })
  });
  
  popupImageViewCloseButton.addEventListener('click', closeImageViewPopup);
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

// функция откртия попапа просмотра фотографии //
const openImageViewPopup = (cardImage, cardTitle) => {
  popupImageView.classList.add('popup_opened');
  popupImageViewSource.src = cardImage.src;
  popupImageViewName.textContent = cardTitle.textContent;
}

// функция закрытия попапа просмотра фотографии //
const closeImageViewPopup = () => {
  popupImageView.classList.remove('popup_opened');
};

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
  closeAddItemPopup();
}

// функция открытия формы редактирования//
const openEditPopup = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
  popupEdit.classList.add('popup_opened');
}

// функция закрытия формы редактирования//
const closeEditPopup = () => {
  popupEdit.classList.remove('popup_opened');
}

// функция открытия формы добавления новой карточки//
const openAddItemPopup = () => {
  popupAddItem.classList.add('popup_opened');
}

// функция закрытия формы добавления новой карточки//
const closeAddItemPopup = () => {
  popupAddItem.classList.remove('popup_opened');
}

// функция редактирования данных пользователя //
function handleEditFormSubmit (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInput.value;
    profileSubline.textContent = jobInput.value;

    closeEditPopup();
}

render();

popupEditButton.addEventListener('click', openEditPopup);
popupEditCloseButton.addEventListener('click', closeEditPopup);
popupAddItemButton.addEventListener('click', openAddItemPopup);
popupAddItemCloseButton.addEventListener('click', closeAddItemPopup);
formElementEdit.addEventListener('submit', handleEditFormSubmit);
formElementAdd.addEventListener('submit', handleAddFormSubmit);
