const HOST_URL = "http://localhost:8000"
function EnviarFormulario() {
    //busca todos os filhos dentro do formulario, sendo esses as "linhas"
    //Após isso validamos os campos, retornando true se todos os campos foram preenchidos com sucesso
    //liberando o envio dos dados para o lado do servidor
    receitaPronta = ConstruirReceita();
    if (receitaPronta != null) {
        fetch(`${HOST_URL}/Recipe/New`,
            {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(receitaPronta)
            }).then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        switch (response.status) {
                            case 401:
                                sessionStorage.removeItem("nomeusuario");
                                ConstruirElementoAutenticacao();
                                throw new Error(`${response.status}: nao autorizado`);
                            default:
                                throw new Error(`${response.status}: ${text}`);
                        }
                    });
                }
            }).catch(err => console.log(err));
    }
}
async function BuscarReceitasPorTag(tagName) {
    return fetch(`${HOST_URL}/Recipe_FilterTag/RecipeByTagName?name=${tagName}`, {
        mode: "cors",
        method: "GET",
        credentials: "include"
    }).then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                switch (response.status) {
                    default:
                        throw new Error(`${response.status}: ${text}`);
                }
            });
        }
        return response.json();
    }).catch(err => console.log(err));
}
async function BuscarReceitas() {
    return fetch(`${HOST_URL}/Recipe/SearchUserRecipe`, {
        mode: "cors",
        method: "GET",
        credentials: "include"
    }).then(response => {
        if (!response.ok) {
            return response.text().then(text => {

                switch (response.status) {
                    case 401:
                        sessionStorage.removeItem("nomeusuario");
                        throw new Error(`${response.status}: nao autorizado`);
                    default:
                        throw new Error(`${response.status}: ${text}`);
                }
            });
        }
        return response.json();
    }).catch(err => console.log(err));
}
async function BuscarReceitaPorId(receitaId) {
    return fetch(`${HOST_URL}/Recipe/SearchByRecipe?recipeId=${receitaId}`, {
        mode: "cors",
        method: "GET",
        credentials: "include"
    }).then(x => x.json()).then(receitas => { return receitas });
}
function AdiconarTags() {
    fetch(`${HOST_URL}/api/Picture?recipeId=${recipe["id"]}`, {
        mode: "cors",
        method: "GET",
        credentials: "include"
    }).then(x => x.json()).then(images64Base => {
        if (images64Base[0] != null) {
            moldura.querySelector(".receita-exibicao__imagem").src = "data:image/jpeg;base64," + images64Base[0];
        }
    });
}
async function ConstruirElementoAutenticacao() {
    let url = window.location.hostname
    if(window.location.port){
        url = `${window.location.hostname}:${window.location.port}`
    }
    if (document.querySelector("#tela-autenticacao") == null) {
        fetch(`http://${url}/autenticacao.html`).then(response => {
            console.log(response)
            if (!response) {
                switch (response.status) {
                    default:
                        throw new Error(`${response.status}: ${text}`);
                }
            }
            return response.text();
        }).catch(err => console.log(err)).then(data => {
            document.querySelector("body").insertAdjacentHTML("afterEnd", data);
        }).then(IniciarVariaveis);
    }
    else {
        document.querySelector("#tela-autenticacao").style = "display:flex;";
    }
}

async function Registrar(chave) {
    fetch(`${HOST_URL}/Authentication/Register`,
        {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": "Basic " + chave
            },
            credentials: "include"
        }).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    switch (response.status) {
                        default:
                            throw new Error(`${response.status}: ${text}`);
                    }
                });
            }
            window.location.reload(false);
        }).catch(err => console.log(err));
}
async function Login(chave) {
    fetch(`${HOST_URL}/Authentication/Login`,
        {
            mode: "cors",
            method: "GET",
            headers: {
                "Authorization": "Basic " + chave,
            },
            credentials: "include"
        }).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    switch (response.status) {
                        default:
                            throw new Error(`${response.status}: ${text}`);
                    }
                });
            }

        }).catch(err => console.log(err))
        .then(VerificacaoLogin);
}
async function Desconectar() {
    fetch(`${HOST_URL}/Authentication/Logout`,
        {
            mode: "cors",
            method: "GET",
            credentials: "include"
        }).then(response => {

            if (!response.ok) {
                return response.text().then(text => {
                    switch (response.status) {
                        case 401:
                            throw new Error(`${response.status}: acesso negado`)
                        default:
                            throw new Error(`${response.status}: ${text}`);
                    }
                });
            }
        }).then(window.location.href = "../index.html")
        .catch(err => console.log(err));
}
async function VerificarLogin() {
    fetch(`${HOST_URL}/Authentication/UserCheck`,
        {
            method: "GET",
            mode: "cors",
            credentials: "include"
        }).then(response => {
            if (!response.ok) {

                return response.text().then(text => {
                    switch (response.status) {
                        case 401:
                            ConstruirElementoAutenticacao();
                            throw new Error(`${response.status}: acesso negado`);
                        default:
                            throw new Error(`${response.status}: ${text}`);
                    }
                });
            }
            return response.text();

        }).then(userName => {
            if (userName.includes('User:')) {
                userName = userName.replace("User:", '');
                sessionStorage.setItem("nomeusuario", userName);
                window.location.reload(false)
                return userName;
            }
        }).then().catch(err => console.log(err));
}
