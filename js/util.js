const getRandomNum = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const isRightString = (str, maxLen) => String(str).length <= maxLen;
const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomElementsArray = (arr, count) => {
  const copyArray = arr.slice();
  const newArray = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomNum(0, copyArray.length - 1);
    newArray.push(copyArray[randomIndex]);
    copyArray.splice(randomIndex, 1);
  }
  return newArray;
};

const showGetMethodError = () => {
  const template = document.querySelector('#get_error').content.querySelector('section');
  const popup = template.cloneNode(true);
  const button = popup.querySelector('button');
  popup.style.zIndex = 100;
  document.body.append(popup);
  button.addEventListener('click', () => popup.remove());
};


function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export {isRightString, isEscapeKey, debounce, getRandomElementsArray, showGetMethodError};
