const STEP = 25;
const RANGE = {min: 25, max: 100};


const scaleSection = document.querySelector('.img-upload__scale');
const image = document.querySelector('.img-upload__preview').querySelector('img');
const scaleValue = document.querySelector('.scale__control--value');

const checkTheScaleValue = (value) => {
  if (value <= RANGE.min || value > RANGE.max) {
    value = value <= RANGE.min ? RANGE.min : RANGE.max;
  }
  return value;
};

const changeScaleValue = (summand) => {
  const num = checkTheScaleValue(Number(scaleValue.value.replace('%', '')) + STEP * summand);
  scaleValue.value = `${num}%`;
  image.style.transform = `scale(${num / 100})`;
};

const onResizeButtonClick = () => {
  scaleSection.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('scale__control--smaller')){
      changeScaleValue(-1);
    }
    else if (evt.target.classList.contains('scale__control--bigger')) {
      changeScaleValue(1);
    }
  });
};


export {onResizeButtonClick};
