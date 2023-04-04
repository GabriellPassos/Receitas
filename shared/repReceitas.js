
//EnviarReceitas();
function BuscarRep(){
    return fetch("/shared/recipeList.txt").then(result => result.json());
}
async function EnviarReceitas(){
    var listaReceitas = await BuscarRep();
    console.log(listaReceitas);
    for (let index = 0; index < listaReceitas.length; index++) {
        const element = listaReceitas[index]; 
        console.log(element['ingredients'])       
        console.log(element['stepByStep']) 
        fetch("https://localhost:44395/Recipe/New",
                {
                    mode: "cors",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify(element)
                }).then(response => {
                    if (!response.ok) {
                        return response.text().then(text => {
                            switch (response.status) {
                                case 401:
                                    console.log("aa");
                                    
                                    throw new Error(`${response.status}: nao autorizado`);
                                default:
                                    throw new Error(`${response.status}: ${text}`);
                            }
                        });
                    }
                }).catch(err => console.log(err));
    }
}

