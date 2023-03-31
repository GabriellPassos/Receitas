const campoSlide = document.getElementById("slides-moldura");
const campoNavigation = document.getElementById("navigation");
var Slideflag = 0;
campoNavigation.addEventListener('click', evento => {
    evento.preventDefault();
    ProximoSlide(evento.target);

});
function ProximoSlide(elementoDirecao) {

    if (elementoDirecao.classList.contains("triangulo-esquerda")) {
        if (Slideflag < 0) {
            Slideflag += 1;
        }
        else {
            Slideflag = -(campoSlide.childElementCount - 1);
        }
    }
    if (elementoDirecao.classList.contains("triangulo-direita")) {
        if (-Slideflag < campoSlide.childElementCount - 1) {
            Slideflag -= 1;
        } else {
            Slideflag = 0;
        }
    }
    var primeiroSlide = campoSlide.querySelector(".s1");
    if(primeiroSlide){
        primeiroSlide.style.marginLeft = `${Slideflag * 25}%`;
    }

}
setInterval(function () {
    if (Slideflag < 0) {
        Slideflag += 1;
    }
    else {
        Slideflag = -(campoSlide.childElementCount - 1);
    }
    var primeiroSlide = campoSlide.querySelector(".s1");
    if(primeiroSlide){
        primeiroSlide.style.marginLeft = `${Slideflag * 25}%`;
    }

}, 6000);
//Cria uma folha de slide para cada imagem dentro de 'imagens'
function ConstruirSlideImagem(imagens) {
    for (let index = 0; index < imagens.length; index++) {
        var elementoMoldura = document.createElement('div');
        elementoMoldura.classList.add('slide');
        var elementoImagem = document.createElement('img');
        const imagemUrl = imagens[index];
        if (index == 0) {
            elementoMoldura.classList.add('s1');
        }
        elementoImagem.src = atob(imagemUrl);
        campoSlide.appendChild(elementoMoldura);
        elementoMoldura.appendChild(elementoImagem);
    }
}
//Cria uma folha de slide com uma caixa de titulo e texto para cada primeria imagem dentro da lista de receitas
function ConstruirSlideHomeImagem(receitaDestaqueSlide) {
    for (let index = 0; index < receitaDestaqueSlide.length; index++) {
        const receita = receitaDestaqueSlide[index];
        if (receita['pictures'].length > 0) {
            const imagemUrl = receita['pictures'][0];
            var elementoMoldura = document.createElement('a');
            var elementoInfo = document.createElement('div');
            var titulo = document.createElement('h2');
            var texto = document.createElement('p');
            var elementoImagem = document.createElement('img');
            elementoMoldura.classList.add('slide');
            elementoInfo.classList.add('slide__info');
            elementoImagem.src = atob(imagemUrl);
            titulo.innerText = `${receita['name']}`;
            texto.innerText = `${receita['stepByStep']}`;
            elementoMoldura.setAttribute('href', `/receita/receita.html?id=${receita["id"]}`)
            elementoInfo.append(titulo, texto);
            elementoMoldura.append(elementoImagem, elementoInfo);
            if (index == 0) {
                elementoMoldura.classList.add('s1');
            }
            campoSlide.appendChild(elementoMoldura);
        }
    }
}