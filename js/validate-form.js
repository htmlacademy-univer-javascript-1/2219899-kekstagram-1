import {isRightString, isEscapeKey} from './util.js';

const hashtagRule = /^#[А-яа-яA-za-zёЁ]{1,19}$/;

const isCorrectHashtags = (value) => {
  const hashtags = value.split().map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = [...new Set(hashtags)];
  return value === '' || hashtags.every((hashtag) => hashtagRule.test(hashtag)) && hashtags.length <= 5 && hashtags.length === uniqueHashtags.length;
};

const isCorrectComment = (comment) => isRightString(comment, 140);

const onFocusPreventClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const validateForm = (form, hashtags, comment) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper__error'
  });
  pristine.addValidator(hashtags, isCorrectHashtags, 'Поле ввода имеет уникальные хештеги, которые начинаются с решетки и имеют длину не более 20 символов');
  pristine.addValidator(comment, isCorrectComment, 'Комментарий не более 140 символов');

  return pristine.validate();
};

export {validateForm, onFocusPreventClose};

