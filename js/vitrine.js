const vitrine = document.getElementById("receita__exibicao");
const campoTags = document.getElementById("receita__vertical-tagbar__tags");
const btnNovaReceita = document.getElementById("receita-exibicao-adicionar__moldura");
const vitrineVerticalTagbar = document.getElementById('receita__vertical-tagbar');
const btnTagFiltro = document.querySelector(".receita-vertical-tagbar__btn-triangulo");
campoTags.addEventListener("change", FiltrarPorTag);

btnTagFiltro.addEventListener('click', evento => {
    console.log(evento.target)
    vitrineVerticalTagbar.classList.toggle("on");
});

Start();
async function Start() {
    UpdateNomeUsuario();
    urlParametros = window.location.search;
    var listaReceitas;
    btnNovaReceita.style = "display:none;";
    if (urlParametros.includes('tag')) {
        urlParametros = urlParametros.replace("?tag=", '');
        var tagName = urlParametros
        listaReceitas = await BuscarReceitasPorTag(tagName);
    }
    else{
        if (sessionStorage.getItem("nomeusuario")) {
            btnNovaReceita.style = "display:flex;";
            listaReceitas = await BuscarReceitas();
        }
        else{
            VerificacaoLogin();
        }
    }
    CarregarVitrine(listaReceitas);
}
async function CarregarVitrine(receitas) {
    var listaTags = [];
    try {
        if (receitas != null) {
            for (let index = 0; index < receitas.length; index++) {
                const receita = receitas[index];
                for (let index = 0; index < receita["tags"].length; index++) {
                    const tag = receita["tags"][index];
                    if (!listaTags.includes(tag) && !tag.includes('destaque') && !tag.includes('maisreceitas')) {
                        listaTags.push(tag);
                        ConstruirElementoTag(tag);
                    }
                }
                var elementoMoldura = ConstruirMoldura(receita);
                elementoMoldura.querySelector("a").innerText = receita["name"];
                if (receita['pictures'][0] != null) {

                    elementoMoldura.querySelector("img").src = atob(receita["pictures"][0]);
                }
                else {
                    let url = verificarUrlDominioGitHub();
                    elementoMoldura.querySelector("img").src = `${url}/images/logo.PNG`
                }
                vitrine.appendChild(elementoMoldura);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}
function FiltrarPorTag() {
    var tags = campoTags.querySelectorAll("input[type='checkbox']");
    var tagsChecked = [];
    for (let index = 0; index < tags.length; index++) {
        const tag = tags[index];
        if (tag.checked) {
            tagsChecked.push(tag.value);
        }
    }
    var totasMolduras = vitrine.querySelectorAll(".receita-exibicao__moldura");
    if (tagsChecked.length > 0) {
        for (let index = 0; index < totasMolduras.length; index++) {
            const moldura = totasMolduras[index];

            for (let index = 0; index < tagsChecked.length; index++) {
                var tagName = tagsChecked[index];
                if
                    (moldura.classList.contains(tagName)) {
                    moldura.style = "display:flex;"

                }
                else {
                    moldura.style = "display:none;"
                }
            }
        }
    }
    else {
        for (let index = 0; index < totasMolduras.length; index++) {
            const moldura = totasMolduras[index];
            moldura.style = "display=flex;"
        }
    }
}
function ConstruirElementoTag(tagName) {
    var novoId = campoTags.childElementCount + 1;
    var linha = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.classList.add("tag-vertical");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "tags");
    checkbox.setAttribute("id", `${novoId}`);
    checkbox.style = "display: none;"
    checkbox.setAttribute("value", tagName);
    var texto = document.createElement("label");
    texto.classList.add("tag-vertical__btn-label")
    texto.innerText = tagName;
    texto.style = "cursor: pointer;"
    texto.setAttribute("for", `${novoId}`);
    linha.append(checkbox, texto);
    campoTags.appendChild(linha);
    return linha;
}
function ConstruirMoldura(receita) {
    let url = verificarUrlDominioGitHub();
    var moldura = document.createElement("a");
    moldura.classList.add("receita-exibicao__moldura");
    moldura.setAttribute("href", `${url}/receita.html?id=${receita["id"]}`);
    var imagem = document.createElement("img");
    imagem.classList.add("receita-exibicao__imagem");
    var molduraFoto = document.createElement("div");
    molduraFoto.classList.add("receita-exibicao__moldura-foto");
    var barraNome = document.createElement("div");
    barraNome.classList.add("receita-exibicao__info");
    var nome = document.createElement("a");

    barraNome.appendChild(nome);
    molduraFoto.appendChild(imagem);
    moldura.append(molduraFoto, barraNome);
    for (let index = 0; index < receita["tags"].length; index++) {
        const tag = receita["tags"][index];
        moldura.classList.add(tag);
    }
    return moldura;
}
function ConstrutorBotaoNovaReceita() {
    var botao = document.createElement('a');
    botao.setAttribute("id", "receita-exibicao-adicionar__moldura");
    let url = verificarUrlDominioGitHub();
    botao.href = `${url}/nova-receita.html`;
    var texto = document.createElement('span');
    texto.innerText = "+";
    botao.appendChild(texto);
    vitrine.appendChild(botao);
}