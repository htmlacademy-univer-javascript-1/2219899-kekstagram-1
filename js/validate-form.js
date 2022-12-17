import {isRightString, isEscapeKey} from './util.js';

const hashtagRule = /^#[А-Яа-яA-Za-zёЁ]{1,19}$/;

const isCorrectHashtags = (value) => {
  const hashtags = value.split(' ').map((hashtag) => hashtag.toLowerCase());
  return value === '' || hashtags.every((hashtag) => hashtagRule.test(hashtag));
};

const checkCorrectCommentLength = (comment) => isRightString(comment, 140);
const checkCorrectHashtagLength = (hashtags) => {
  hashtags = hashtags.split(' ');
  return hashtags.length <= 5;
};
const checkUniqueHashtag = (value) => {
  const hashtags = value.split(' ').map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtags = [...new Set(hashtags)];
  return hashtags.length === uniqueHashtags.length;
};

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
  pristine.addValidator(hashtags, isCorrectHashtags, 'Хештег должен начинаться с решётки и быть не более 20 символов');
  pristine.addValidator(hashtags, checkCorrectHashtagLength, 'Может быть указано не более 5 хештегов');
  pristine.addValidator(hashtags, checkUniqueHashtag, 'Хештеги не могут повторяться');
  pristine.addValidator(comment, checkCorrectCommentLength, 'Комментарий не более 140 символов');

  return pristine.validate();
};


export {validateForm, onFocusPreventClose};
