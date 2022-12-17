const showMessage = (templateName) => {
  const template = document.querySelector(`#${templateName}`).content.querySelector('section');
  const message = template.cloneNode(true);
  const button = message.querySelector('button');
  message.style.zIndex = 100;
  document.body.append(message);
  button.addEventListener('click', () => message.remove());
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'){
      message.remove();
    }
  });
  window.addEventListener('click', (evt) => {
    if (evt.target.matches(`section[class="${templateName}"]`)){
      message.remove();
    }
  });
};


export {showMessage};
