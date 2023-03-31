const destaqueVitrinePrincipal = document.getElementById("vitrine-receita__principal");
const destaqueVitrineDestaque = document.getElementById("vitrine-receita__destaque");
const destaqueVitrineMaisDestaque = document.getElementById("vitrine-receita__mais-destaque");
const outrasReceitasVitrine = document.getElementById("vitrine-mais-receitas");
UpdateNomeUsuario();
ConstruirElementoSlide();
ConstruirElementoVitrine();
async function ConstruirElementoSlide() {
    var receitaDestaqueSlide = await BuscarReceitasPorTag('destaqueslide');
    if (receitaDestaqueSlide != null) {
        ConstruirSlideHomeImagem(receitaDestaqueSlide);
    }
}
async function ConstruirElementoVitrine() {
    var receitaDestaquePrincipal = await BuscarReceitasPorTag('destaqueprincipal');
    if (receitaDestaquePrincipal != null) {
        destaqueVitrinePrincipal.querySelector('a').setAttribute('href', `/receita/receita.html?id=${receitaDestaquePrincipal[0]["id"]}`);
        destaqueVitrinePrincipal.querySelector(".exibicao-info_titulo").innerText = receitaDestaquePrincipal[0]["name"];
        destaqueVitrinePrincipal.querySelector(".porcoes").innerText = `${receitaDestaquePrincipal[0]["portions"]} porções`;
        destaqueVitrinePrincipal.querySelector(".tempo").innerText = receitaDestaquePrincipal[0]["time"];
        destaqueVitrinePrincipal.querySelector(".usuario").innerText = `${receitaDestaquePrincipal[0]["userName"]}`;
        if (receitaDestaquePrincipal[0]["pictures"][0] != null) {
            destaqueVitrinePrincipal.querySelector(".exbicao-principal__moldura-imagem").src = atob(receitaDestaquePrincipal[0]["pictures"][0]);

        }
    }
    var receitaDestaque = await BuscarReceitasPorTag("destaques");
    if (receitaDestaque != null) {
        for (let index = 0; index < destaqueVitrineDestaque.childElementCount; index++) {
            const element = destaqueVitrineDestaque.children[index];
            if (receitaDestaque[index] != null) {
                element.setAttribute('href', `/receita/receita.html?id=${receitaDestaque[index]["id"]}`);

                element.querySelector(".exibicao-destaque-info_titulo").innerText = receitaDestaque[index]["name"];
                element.querySelector(".vitrine-receita-exbicao-destaque__usuario").innerText = `Chefe: ${receitaDestaque[index]["userName"]}`;
                if (receitaDestaque[0]["pictures"][0] != null) {
                    element.querySelector('img').src = atob(receitaDestaque[index]['pictures'][0]);
                }
            }
        }
    }
    var receitaMaisDestaques = await BuscarReceitasPorTag("maisdestaques");
    if (receitaMaisDestaques != null) {
        for (let index = 0; index < destaqueVitrineMaisDestaque.childElementCount; index++) {
            const element = destaqueVitrineMaisDestaque.children[index];
            if (receitaMaisDestaques[index] != null) {
                element.setAttribute('href', `/receita/receita.html?id=${receitaMaisDestaques[index]["id"]}`);
                if (receitaMaisDestaques[index]["pictures"][0] != null) {
                    element.querySelector('img').src = atob(receitaMaisDestaques[index]["pictures"][0]);
                }
                element.querySelector(".exibicao-mais-destaque-info__titulo").innerText = receitaMaisDestaques[index]["name"];
                element.querySelector(".vitrine-receita-exbicao-destaque__usuario").innerText = `Chefe: ${receitaMaisDestaques[index]["userName"]}`;
            }
        }
    }
    var MaisReceitas = await BuscarReceitasPorTag("maisreceitas");

    if (MaisReceitas != null) {

        for (let index = 0; index < MaisReceitas.length; index++) {
            const receita = MaisReceitas[index];
            var corpo = document.createElement('a');
            var molduraImagem = document.createElement('div');
            var info = document.createElement('div');
            var imagem = document.createElement('img');
            var titulo = document.createElement('h3');
            var texto = document.createElement('span');
            corpo.classList.add('vitrine-receita__exibicao-mais-destaque');
            corpo.setAttribute('href', `/receita/receita.html?id=${receita["id"]}`);
            molduraImagem.classList.add('exibicao-mais-destaque__moldura');
            info.classList.add('exibicao-mais-destaque__info');
            titulo.classList.add('exibicao-mais-destaque-info__titulo');
            texto.classList.add('vitrine-receita-exbicao-destaque__usuario');
            if (receita["pictures"][0] != null) {
                imagem.src = atob(receita['pictures'][0]);
            }
            titulo.innerText = receita["name"];
            texto.innerText = `Chefe: ${receita["userName"]}`;
            molduraImagem.appendChild(imagem);
            info.append(titulo, texto);
            corpo.append(molduraImagem, info);
            outrasReceitasVitrine.appendChild(corpo);
        }
    }
}
