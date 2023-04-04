function EnviarFormulario() {
    //busca todos os filhos dentro do formulario, sendo esses as "linhas"
    //Após isso validamos os campos, retornando true se todos os campos foram preenchidos com sucesso
    //liberando o envio dos dados para o lado do servidor
    receitaPronta = ConstruirReceita();
    if (receitaPronta != null) {
        fetch("http://localhost:8000/Recipe/New",
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
    return fetch(`http://localhost:8000/Recipe_FilterTag/RecipeByTagName?name=${tagName}`, {
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
    return fetch("http://localhost:8000/Recipe/SearchUserRecipe", {
        mode: "cors",
        method: "GET",
        credentials: "include"
    }).then(response => {
        if (!response.ok) {
            return response.text().then(text => {

                switch (response.status) {
                    case 401:
                        sessionStorage.removeItem("nomeusuario");
                        //ConstruirElementoAutenticacao();
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
    return fetch(`http://localhost:8000/Recipe/SearchByRecipe?recipeId=${receitaId}`, {
        mode: "cors",
        method: "GET",
        credentials: "include"
    }).then(x => x.json()).then(receitas => { return receitas });
}
function AdiconarTags() {
    fetch(`http://localhost:8000/api/Picture?recipeId=${recipe["id"]}`, {
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
   if (document.querySelector("#tela-autenticacao") == null) {
        fetch("https://gabriellpassos.github.io/WebSiteReceitasAPI/autenticacao.html").then(response => {
            if (!response.ok) {
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
