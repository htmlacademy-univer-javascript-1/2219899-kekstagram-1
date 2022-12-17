import {isEscapeKey} from './util.js';

const fullScreen = document.querySelector('.big-picture');
const body = document.body;
const closeButton = fullScreen.querySelector('#picture-cancel');
const loadCommentsButton = fullScreen.querySelector('.social__comments-loader');
const commentsList = fullScreen.querySelector('.social__comments');
const commentTemplate = fullScreen.querySelector('.social__comment');
const currentCommentsCount = fullScreen.querySelector('.social__comment-count');

let commentsAmount = 0;

const fillComments = (comments) => {
  comments.slice(commentsAmount, commentsAmount + 5).forEach((comment) => {
    const thisComment = commentTemplate.cloneNode(true);
    const image = thisComment.querySelector('.social__picture');
    image.src = comment.avatar;
    image.alt = comment.name;
    thisComment.querySelector('.social__text').textContent = comment.message;
    commentsList.append(thisComment);
    commentsAmount++;
  });
  currentCommentsCount.innerHTML = `${commentsAmount} из <span class="comments-count">${comments.length}</span> комментариев`;
  if (commentsAmount === comments.length) {
    loadCommentsButton.classList.add('hidden');
  }
  else {
    loadCommentsButton.classList.remove('hidden');
  }
};

const renderPhoto = (photo) => {
  fullScreen.querySelector('.big-picture__img img').src = photo.url;
  fullScreen.querySelector('.social__caption').textContent = photo.description;
  fullScreen.querySelector('.likes-count').textContent = photo.likes;
  commentsList.innerHTML = '';
  fillComments(photo.comments);
  loadCommentsButton.onclick = () => fillComments(photo.comments);
};

const closeByEscape = (evt) => {
  if (isEscapeKey(evt)){
    body.classList.remove('modal-open');
    fullScreen.classList.add('hidden');
    document.removeEventListener('keydown', closeByEscape);
    commentsAmount = 0;
  }
};

const closePhoto = () => {
  body.classList.remove('modal-open');
  fullScreen.classList.add('hidden');
  document.removeEventListener('keydown', closeByEscape);
  commentsAmount = 0;
};


const openPhoto = (photo) => {
  body.classList.add('modal-open');
  fullScreen.classList.remove('hidden');
  renderPhoto(photo);
  closeButton.addEventListener('click', closePhoto);
  document.addEventListener('keydown', closeByEscape);
};


export {openPhoto};
