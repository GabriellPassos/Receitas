# [WebSiteReceitasAPI](https://gabriellpassos.github.io/WebSiteReceitasAPI/)
WebSite ReceitasAPI necessita para ser visualizado em sua totalidade seu ambiente backend. Para isso disponibilizo este aquivo docker-compose.yml 
para a montagem do container composto pela API Receitas e o banco de dados MYSQL. Ele receberá as requisições feitas pelo WebSiteReceitasAPI para a exibição e cadastro de receitas, resgisto e login de usuarios.

Siga os passos para execução deste ambiente.
1. Faça o download deste repositório.
2. Certifique-se de possuir em sua máquina o programa "Docker Desktop"
3. Com seu interpretador de comandos vá até a pasta "docker compose" localizada dentro deste repositório baixado.
4. Execute em ordem os seguintes comandos em seu interpretador:

- docker-compose build --no-cache
- docker-compose up

O container irá aparecer na lista no programa Docker Desktop e estará pronto para uso.

Com o container em ação é necessário alimenta-lo com dados iniciais.
1. Certifique-se de possuir o programa "MYSQL MANAGER" em sua máquina.
2. Abra-o e conecte-se ao servidor usando os seguintes dados:
- server: localhost,1433
- login: sa
- senha: S#arada123
3. Dentro da pasta docker compose esta localizado o script "scriptReceitasDB", Abra-o no MYSQL MANAGER e execute.
Isso criará um volume contendo algumas receitas pré-cadastradas e outras informações para o funcionamento do site.

É possível a criação de novos usuarios porém se preferir aqui está uma conta para testes: email: email@gmail.com senha: 123
