const formularioNovaLinha = document.getElementById("formulario__btn-nova-linha");
const formularioReceita = document.getElementById("formulario-receita");
const formularioPrimario = document.getElementById("formulario-primario");
const formularioSecundario = document.getElementById("formulario-secundario");
const NomeReceita = document.getElementById("linha__nome");
const formularioFoto = document.getElementById("formulario-foto");
const botaoNovaCampoImagem = document.getElementById("formulario-foto__moldura");
const formularioTags = document.getElementById("formulario__tags");
const campoInstrucoes = document.getElementById("linha__instucoes");

formularioNovaLinha.addEventListener("click", AddNovaLinha);
botaoNovaCampoImagem.addEventListener("click", AddCampoImagem);
formularioTags.addEventListener("change", TagsCheck);
formularioReceita.addEventListener('keyup', evento => {
    evento.preventDefault();
    ValidacaoDeCampos(evento.target.parentElement);
});
formularioReceita.addEventListener("submit", evento => {
    evento.preventDefault();
    EnviarFormulario();

});
campoInstrucoes.addEventListener("keyup", evento => {
    evento.preventDefault()
    if (campoInstrucoes.value.length > 0) {
        campoInstrucoes.style.height = 'auto';
        campoInstrucoes.style.height = `${evento.target.scrollHeight}px`;
    }
    else {
        campoInstrucoes.style.height = 'auto';
    }
})
UpdateNomeUsuario();
function ConstruirReceita() {
    //Percorre todas as linhas que tenham campos coletando seus valores formando um objeto JSON
    var linhas = formularioReceita.querySelectorAll('.formulario__info');
    var linhasSecundarias = formularioSecundario.querySelectorAll('.formulario-secundario__info');
    var campoNome = formularioReceita.querySelector(".formulario__nome-receita")
    var elementosImagem = formularioFoto.querySelectorAll(".formulario-foto__imagem");
    var campoIntrucoes = formularioReceita.querySelector(".formulario__info-instrucoes");
    var ImagensCarregadas = [];
    var tagsOk = TagsCheck();
    ValidacaoDeCampos(campoNome);
    ValidacaoDeCampos(campoIntrucoes);
    for (let index = 0; index < linhas.length; index++) {
        const element = linhas[index];
        ValidacaoDeCampos(element);
    }
    for (let index = 0; index < linhasSecundarias.length; index++) {
        const element = linhasSecundarias[index];
        ValidacaoDeCampos(element);
    }
    if (formularioReceita.querySelectorAll(".campoPendente").length > 0 || tagsOk == null) {
        return;
    }
    for (let index = 0; index < elementosImagem.length; index++) {
        const elementoImagem = elementosImagem[index];
        if (elementoImagem.src.length > 0) {
            ImagensCarregadas.push(btoa(elementoImagem.src));
        }
    }
    //tagsOk.push('destaqueslide', 'destaqueprincipal', 'maisdestaques', 'destaques', 'maisreceitas')
    var linhas = document.querySelectorAll(".formulario__info");
    var temporizador = document.querySelector(".linha__temporizador");
    var porcoes = document.querySelector(".linha__porcoes");
    var instrucoes = document.querySelector("#linha__instucoes");
    var receita = {
        "name": NomeReceita.value,
        "portions": parseInt(porcoes.value),
        "time": temporizador.value + "h",
        "stepByStep": instrucoes.value,
        "ingredients": [],
        "tags": tagsOk,
        "pictures": ImagensCarregadas,
    };
    for (const linha of linhas) {
        var nome = linha.querySelector(".linha__ingrediente").value;
        var qnt = linha.querySelector(".linha__quantidade").value;
        var unidade = linha.querySelector(".linha__unidade").value;
        receita["ingredients"].push({
            "name": nome,
            "quantity": parseInt(qnt),
            "unitMesure": unidade
        });
    }
    return receita;
}
function TagsCheck() {
    var tagsPrimariasSelectionadas = [];
    var tagsSecundariasSelectionadas = [];
    for (var elemento of formularioTags.querySelector(".formulario__tag-primaria")
        .querySelectorAll("input[type='checkbox']")) {
        if (elemento.checked) {
            tagsPrimariasSelectionadas.push(elemento.name);
        }

    }
    for (var elemento of formularioTags.querySelector(".formulario__tag-secundario")
        .querySelectorAll("input[type='checkbox']")) {
        if (elemento.checked) {
            tagsSecundariasSelectionadas.push(elemento.name);
        }
    }
    var elementoAlerta = formularioTags.querySelector("span");
    if (tagsPrimariasSelectionadas.length < 1 || tagsSecundariasSelectionadas.length < 1) {
        if (!elementoAlerta) {
            elementoAlerta = document.createElement("span");
            formularioTags.appendChild(elementoAlerta);
        }
        elementoAlerta.innerText = "Ao menos uma tag de cada cor deve ser selecionada.";
        elementoAlerta.style = "color: red";
        return null;

    }
    else if (elementoAlerta) {

        formularioTags.removeChild(elementoAlerta);

    }
    return tagsPrimariasSelectionadas.concat(tagsSecundariasSelectionadas);
}
function CarregarImagem(elemento, imagem) {
    elemento.style = "display: block;"
    elemento.src = imagem;
}
function AddCampoImagem() {
    //Faz a adição de um novo campo de imagem.
    //Altera campos do objeto clonado para diferencia-lo além de adicionar dois eventos
    //disparado pela interacao com a input file("change") e após a seleção, um evento para aguardar
    //o carregamento da imagem("load").
    //Quando o limite de campos é alcançado, o botão de adição passa a aceitar carregamento de arquivos
    //e torna-se ultimo campo da lista.
    var quantidadeFotos = formularioFoto.childElementCount;
    var limiteDeCampos = 3;
    if (quantidadeFotos < limiteDeCampos) {
        var novaImagem = botaoNovaCampoImagem.cloneNode(true);
        novaImagem.id = '';
        var entrada = novaImagem.querySelector(".formulario-foto__adicionar");
        var background = novaImagem.querySelector(".formulario-foto__background");
        var texto = novaImagem.querySelector(".formulario-foto__texto");
        texto.innerText = "Foto";
        texto.style = "font-size: 20px"
        var novoId = entrada.id + quantidadeFotos;
        entrada.id = novoId;
        background.htmlFor = novoId;
        formularioFoto.addEventListener("change", evento => {
            var elemento = evento.target;
            var imagem = elemento.files[0];

            if (imagem) {
                var elementoImagem = elemento.parentElement.querySelector(".formulario-foto__imagem");
                const reader = new FileReader();
                reader.addEventListener("load", evento => {
                    CarregarImagem(elementoImagem, evento.target.result);
                });
                reader.readAsDataURL(imagem);
            }
        });
        formularioFoto.insertBefore(novaImagem, botaoNovaCampoImagem);
    }
    else {
        //Aqui eu "re-ligo" o label ao input file, assim ele pode receber uma imagem também
        background = botaoNovaCampoImagem.querySelector(".formulario-foto__background");
        entrada = botaoNovaCampoImagem.querySelector("#formulario-foto__adicionar");
        background.htmlFor = entrada.id;
        botaoNovaCampoImagem.addEventListener("change", evento => {
            var elemento = evento.target;
            var imagem = elemento.files[0];
            var elementoImagem = elemento.parentElement.querySelector(".formulario-foto__imagem");
            if (imagem) {
                const reader = new FileReader();
                reader.addEventListener("load", evento => {
                    CarregarImagem(elementoImagem, evento.target.result);

                });
            }
        });
        botaoNovaCampoImagem.id = '';
    }

}
function AddNovaLinha() {
    var linha = document.createElement("li");
    var ingrediente = document.createElement("input");
    var quantidade = document.createElement("input");
    var unidade = document.createElement("select");
    var btnRemove = document.createElement("input");
    var mensagemAlerta = document.createElement("span");
    linha.classList.add("formulario__info");
    ingrediente.type = "text";
    ingrediente.name = "ingrediente";
    ingrediente.classList.add("formulario-info__texto", "linha__ingrediente");
    quantidade.type = "number";
    quantidade.name = "qnt";
    quantidade.classList.add("formulario-info__texto", "linha__quantidade");
    unidade.name = "unidade";
    unidade.innerHTML = "<option value='ml'>ml</option><option value='unidade'>unidade</option><option value='grama(s)'>grama(s)</option><option value='colher(es)'>colher(es)</option><option value='copo(s)'>copo(s)</option>"
    unidade.classList.add("formulario-info__texto", "linha__unidade");
    mensagemAlerta.classList.add("linha__alerta-mensagem");
    btnRemove.className = "linha__btn-remove";
    btnRemove.type = "image";
    btnRemove.src = "images/negado.png";

    btnRemove.addEventListener("click", evento => {
        formularioPrimario.removeChild(evento.target.parentElement);
    });

    linha.append(ingrediente, quantidade, unidade, btnRemove, mensagemAlerta);
    formularioPrimario.insertBefore(linha, formularioNovaLinha);


}
function ValidacaoDeCampos(elemento) {
    if (elemento) {
        var campos = elemento.querySelectorAll(".formulario-info__texto");
        var elementoAlerta = elemento.querySelector(".linha__alerta-mensagem");
        var mensgemError = "";
        if (campos && elementoAlerta) {
            campos.forEach(element => {
                var mensagemRetornoElemento = RegrasValidacao(element);
                if (mensagemRetornoElemento) {
                    mensgemError += mensagemRetornoElemento;
                    element.style = "border-bottom: 4px solid red;";
                }
                else {
                    element.style = "border-bottom: 4px solid black;";
                }
            });
            if (mensgemError) {
                elementoAlerta.style = "display:block";
                elementoAlerta.innerText = mensgemError;
                elemento.classList.add("campoPendente");
            }
            else {
                elementoAlerta.style = "display:none";
                elementoAlerta.innerText = "";
                elemento.classList.remove("campoPendente"); //uma classe de controle dos campos ainda preenchidos
            }
        }

    }

}
function RegrasValidacao(elemento) {
    var valorElemento = elemento.value;
    switch (elemento.type) {
        case 'text':
            if (valorElemento.length < 1) {
                return "Campo vazio.\n";
            }
            return "";
        case 'number':
            if (valorElemento < 1) {
                return "Digite um valor acima de zero."
            }
            return "";
        case 'time':
            if (!valorElemento || (parseInt(valorElemento) < 0)) {
                return "Insira no Temporizador um valor acima de ZERO"
            }
            return "";
        case 'textarea':
            if (valorElemento.length < 1) {
                return "Campo vazio.\n";
            }
            return "";
    }
}

