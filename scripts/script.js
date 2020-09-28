const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
  initialCards.forEach(card => renderItem(card));
}

function renderItem(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__photo');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardAlt = cardElement.querySelector('.card__photo');
  const cardLike = cardElement.querySelector('.card__like-button');
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardAlt.alt = card.name;

  cardLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });

  const imageView = () => {
    popupImageView.classList.add('popup_opened');
    popupImageViewSource.src = cardImage.src;
    popupImageViewName.textContent = cardTitle.textContent;
  };
  
  cardImage.addEventListener('click', () => {
    imageView(cardImage, cardTitle)
  });

  const popupImageViewClose = () => {
    popupImageView.classList.remove('popup_opened');
  };
  popupImageViewCloseButton.addEventListener('click', popupImageViewClose);
  cards.appendChild(cardElement);
  cardDeleteHandler();
}


function formAddSubmitHandler (evt) {
  evt.preventDefault(); 

  const card = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  cardNameInput.value = '';
  cardLinkInput.value = '';

  renderItem(card);
  popupAddItemClose();
}

render();

function cardDeleteHandler () {
  document.querySelectorAll('.card__delete-button').forEach((btn) => {
    btn.addEventListener('click', function () {
      const cardItem = btn.closest('.card');
      cardItem.remove();
    });
  })
}

const popupEditOpen = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileSubline.textContent;
  popupEdit.classList.add('popup_opened');
}

const popupEditClose = () => {
  popupEdit.classList.remove('popup_opened');
}

const popupAddItemOpen = () => {
  popupAddItem.classList.add('popup_opened');
}

const popupAddItemClose = () => {
  popupAddItem.classList.remove('popup_opened');
}

function formEditSubmitHandler (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInput.value;
    profileSubline.textContent = jobInput.value;

    popupEditClose();
}


popupEditButton.addEventListener('click', popupEditOpen);
popupEditCloseButton.addEventListener('click', popupEditClose);
popupAddItemButton.addEventListener('click', popupAddItemOpen);
popupAddItemCloseButton.addEventListener('click', popupAddItemClose);
formElementEdit.addEventListener('submit', formEditSubmitHandler);
formElementAdd.addEventListener('submit', formAddSubmitHandler);
