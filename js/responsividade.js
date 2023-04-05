const menuHamburguer = document.getElementById("header-fixed-top__btn-menu");
const headFixedbar = document.querySelector("header");
var menuOpen = false;
detectar_mobile();
menuHamburguer.addEventListener('click', evento => {
    menuOpen = !menuOpen;
    headFixedbar.classList.toggle("on", menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : 'initial';
});
function detectar_mobile() {

    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        var tituloLogo = document.querySelector(".header-fixed-top-logo__titulo").firstElementChild;
        tituloLogo.classList.add("correcao-pivot");
        return true;
    }
    else {
        return false;
    }
}