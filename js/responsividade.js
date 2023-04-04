const menuHamburguer = document.getElementById("header-fixed-top__btn-menu");
const headFixedbar = document.querySelector("header");
var menuOpen = false;
menuHamburguer.addEventListener('click', evento =>{
    menuOpen = !menuOpen;
    headFixedbar.classList.toggle("on", menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : 'initial';
});