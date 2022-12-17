import {isEscapeKey} from './util.js';
import {validateForm, onFocusPreventClose} from './validate-form.js';
import {onFilterChange, disableSlider} from './image-effects.js';
import {onResizeButtonClick} from './image-scale.js';
import {sendData} from './api.js';
import {showMessage} from './message.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const image = document.querySelector('.img-upload__preview').querySelector('img');
const effectsField = document.querySelector('.img-upload__effects');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const uploadButton = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const fileChooser = document.querySelector('.img-upload__start input[type=file]');

const onEscapeKeydown = (evt) => {
  if (isEscapeKey(evt) && document.querySelector('.error') === null) {
    closeOverlay();
  }
};

function closeOverlay() {
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeKeydown);
  cancelButton.removeEventListener('click', closeOverlay);
  disableSlider();
  form.reset();
}

const openOverlay = () => {
  image.removeAttribute('class');
  image.removeAttribute('style');
  document.body.classList.add('modal-open');
  overlay.classList.remove('hidden');
  document.addEventListener('keydown', onEscapeKeydown);
  cancelButton.addEventListener('click', closeOverlay);
  commentInput.onkeydown = (evt) => onFocusPreventClose(evt);
  hashtagsInput.onkeydown = (evt) => onFocusPreventClose(evt);
  effectsField.addEventListener('change', onFilterChange);
};

const renderUploadForm = () => {
  onResizeButtonClick();
  uploadButton.addEventListener('change', openOverlay);
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      image.src = URL.createObjectURL(file);
    }
  });
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (validateForm(form, hashtagsInput, commentInput)) {
      sendData(() => {
        showMessage('success');
        setTimeout(closeOverlay, 500);
      },
      () => {
        showMessage('error');
      }
      , new FormData(evt.target));
    }
  });
};


export {renderUploadForm, closeOverlay};

