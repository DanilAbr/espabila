const firstScreenWrapper = document.querySelector('.page-header__first-screen-wrapper');
const button = document.querySelector('.page-header__toggle-menu-button');

const changeAriaLabel = () => {
  if (button.classList.contains('page-header__toggle-menu-button--open-menu')) {
    button.ariaLabel = 'Закрыть меню';
    return;
  }

  button.ariaLabel = 'Открыть меню';
};

const onToggleMenuButtonClick = () => {
  changeAriaLabel();
  button.classList.toggle('page-header__toggle-menu-button--open-menu');
  firstScreenWrapper.classList.toggle('page-header__first-screen-wrapper--hide');
};

button.addEventListener('click', onToggleMenuButtonClick);
