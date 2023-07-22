const campoIngredientes = document.getElementById("receita-info__ingredientes");
const campoInstrucoes = document.getElementById("receita-info__instrucoes");
const campoBarraInfo = document.getElementById("receita__barra-info");
const campoTituloReceita = document.getElementById("receita-info__titulo");

Start();
async function Start() {
    urlParametros = window.location.search;
    var receitaId = 1;
    if (urlParametros.includes('id')) {
        urlParametros = urlParametros.replace("?id=", '');
        receitaId = parseInt(urlParametros);
    }
    var receita = await BuscarReceitaPorId(receitaId);
    UpdateNomeUsuario();
    ConstruirSlideImagem(receita[0]["pictures"]);
    CarregarReceita(receita[0]);
}
function ConstruirElementoLinha(elementoIngrediente) {
    var linha = document.createElement('li');
    var texto = document.createElement('span');
    texto.innerText = `${elementoIngrediente["name"]} x ${elementoIngrediente["quantity"]} ${elementoIngrediente["unitMesure"]}`;
    linha.appendChild(texto);
    campoIngredientes.querySelector('ul').appendChild(linha);
}
async function CarregarReceita(receita) {
    campoTituloReceita.innerText = receita["name"];
    campoInstrucoes.querySelector("p").innerText = receita["stepByStep"];
    for (let index = 0; index < receita["ingredients"].length; index++) {
        const ingrediente = receita["ingredients"][index];
        ConstruirElementoLinha(ingrediente);
    }
    var elementoPorcoes = campoBarraInfo.querySelector(".barra-info__porcao");
    elementoPorcoes.innerText = receita["portions"];
    var elementoPorcoes = campoBarraInfo.querySelector(".barra-info__tempo");
    elementoPorcoes.innerText = receita["time"];
    var elementoPorcoes = campoBarraInfo.querySelector(".barra-info__avaliacao");
    elementoPorcoes.innerText = 7;
    var elementoPorcoes = campoBarraInfo.querySelector(".barra-info__nome");
    elementoPorcoes.innerText = receita["userName"];
}