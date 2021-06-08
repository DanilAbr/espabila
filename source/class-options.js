const items = document.querySelectorAll(".class-options__item");
const pageDownButtonElement = document.querySelector(".page-down-button");

pageDownButtonElement.addEventListener('click', () => {
  items[1].scrollIntoView({behavior: "smooth"});
})

items[1].addEventListener('scroll', () => console.log('scroll'));
console.log(items[1].scrollHeight);

