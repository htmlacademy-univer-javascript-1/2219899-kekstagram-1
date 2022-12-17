import {openPhoto} from './full-screen.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');

const createUserPicture = (user) => {
  const userPicture = template.cloneNode(true);
  userPicture.querySelector('.picture__img').src = user.url;
  userPicture.querySelector('.picture__comments').textContent = user.comments.length;
  userPicture.querySelector('.picture__likes').textContent = user.likes;
  return userPicture;
};

const setPhotoSettings = (user) => {
  const photo = createUserPicture(user);
  photo.addEventListener('click', () => {
    openPhoto(user);
  });
  return photo;
};

const appendThumbnails = (array) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.append(setPhotoSettings(array[i]));
  }
  pictureContainer.append(fragment);
};


export {appendThumbnails};
