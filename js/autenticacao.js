const tagsNavigationBar = document.getElementById("header-fixed-top");
const campoNomeUsuario = document.getElementById("header-fixed-top__nome-usuario");
const btnSair = document.getElementById("header-fixed-top__sair");
var telaAtenticacao;
var telaLogin;
var telaRegistro;
var formularioRegistro;
var formularioLogin;

function IniciarVariaveis() {
    telaAtenticacao = document.getElementById("tela-autenticacao");
    fundoTelaAutenticacao = document.getElementById("tela-autenticacao__fundo");
    telaLogin = document.getElementById("login");
    telaRegistro = document.getElementById("registro");
    formularioRegistro = document.getElementById("registro-form");
    formularioLogin = document.getElementById("login-form");

    telaLogin.addEventListener("submit", evento => {
        evento.preventDefault();
        elemento = evento.target;
        EnviarFormularioLogin(elemento);
    });
    telaRegistro.addEventListener("submit", evento => {
        evento.preventDefault();
        elemento = evento.target;
        EnviarFormularioRegistro(elemento);
    });
    fundoTelaAutenticacao.addEventListener("click", evento => {
        evento.preventDefault();
        telaAtenticacao.style = "display:none;"

    })
}
tagsNavigationBar.addEventListener("change", evento => {
    evento.preventDefault();
    ConstruirElementoSlide();
});
btnSair.addEventListener('click', evento => {
    evento.preventDefault();
    Deslogar();
});

campoNomeUsuario.addEventListener("click", evento => {
    evento.preventDefault();
    if (sessionStorage.getItem("nomeusuario") != null) {
        btnSair.classList.toggle("header-fixed-top__sair-exibir")
    }
    else {
        btnSair.style = "display:none;";
        Entrar();
    }
});
async function UpdateNomeUsuario() {
    if (sessionStorage.getItem("nomeusuario") != null) {
        campoNomeUsuario.innerText = sessionStorage.getItem("nomeusuario");
    }
    else {
        sessionStorage.removeItem("nomeusuario");
        campoNomeUsuario.innerText = 'Entrar';
    }
}
async function VerificacaoLogin() {
    return await VerificarLogin();
}

async function EnviarFormularioRegistro(elemento) {
    if (ValidacaoCampos(elemento)) {
        var formData = new FormData(elemento);
        var RegistroData = {};
        formData.forEach((value, key) => (RegistroData[key] = value));
        var chave = btoa(JSON.stringify(RegistroData));
        await Registrar(chave);
    }
}
async function EnviarFormularioLogin(elemento) {
    if (ValidacaoCampos(elemento)) {
        var chave = btoa(elemento.querySelector("#form-login__email").value +
            ":" + elemento.querySelector("#form-login__senha").value);
        await Login(chave);
    }
}

async function BuscarCategoria(tagName) {
    let url = verificarUrlDominioGitHub();
    location.href = `${url}/minhas-receitas.html?tag=${tagName}`
}
function Entrar() {
    ConstruirElementoAutenticacao();
}
function ValidacaoCampos(formulario) {
    var formElementoPai = formulario.parentElement;
    if (formulario) {
        var campos = formulario.querySelectorAll("input");
        var elementoAlerta = formElementoPai.querySelector(".aviso-validacao");
        var mensgemError = "";
        if (campos && elementoAlerta) {
            campos.forEach(elemento => {
                var mensagemRetornoElemento = RegrasValidacao(elemento);
                if (mensagemRetornoElemento) {
                    mensgemError += mensagemRetornoElemento;
                    elemento.style = "border-bottom: 4px solid red;";
                    elemento.classList.add("campoPendente");
                }
                else {
                    elemento.style = "border-bottom: ";
                    elemento.classList.remove("campoPendente"); //uma classe de controle dos campos ainda preenchidos
                }
            });
            var camposIncompletos = formulario.querySelectorAll(".campoPendente")
            if (mensgemError) {
                elementoAlerta.style = "display:block";
                elementoAlerta.innerText = mensgemError;
                for (var campo of camposIncompletos) {
                    campo.addEventListener('keyup', () => {
                        ValidacaoDeCampos(elemento);
                    });
                }
            }
            else {
                elementoAlerta.style = "display:none";
                elementoAlerta.innerText = "";
            }
        }
    }
    var qntCamposIncompletos = camposIncompletos.length;
    if (qntCamposIncompletos) { // verifica se há campos ainda nao resolvidos
        return false;
    }
    return true; //validado com sucesso
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
        case 'password':
            if (valorElemento.length < 1) {
                return "Campo vazio.\n";
            }
            return "";
        case 'email':
            if (valorElemento.length < 1) {
                return "Campo vazio.\n";
            }
            return "";
    }
}

async function Deslogar() {
    sessionStorage.removeItem("nomeusuario");
    await Desconectar()
}