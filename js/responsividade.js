const menuHamburguer = document.getElementById("header-fixed-top__btn-menu");
const headFixedbar = document.getElementById("header-fixed-top");
var menuOpen = false;
menuHamburguer.addEventListener('click', evento =>{
    menuOpen = !menuOpen;
    headFixedbar.classList.toggle("on", menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : 'initial';
});
var vitrineVerticalTagbar = document.querySelector('#receita__vertical-tagbar');
if(vitrineVerticalTagbar != null){
    vitrineVerticalTagbar.addEventListener('click', evento =>{
        if(evento.target.parentElement.classList.contains('receita')){
            vitrineVerticalTagbar.classList.toggle("on");
        }
    });
    
}

