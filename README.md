# WebSiteReceitasAPI 
WebSite ReceitasAPI necessita para ser visualizado em sua totalidade do seu ambiente backend. Para isso desponibilizo este aquivo docker compose 
para a montagem do container composto pela API Receitas e o banco de dados MYSQL. Ele receberá as requisições feitas pelo WebSiteReceitasAPI para a exibição e cadastro de receitas, resgisto e login de usuarios.

Siga os passos para execução deste ambiente.
1. Faça o download deste repositório.
2. Certifique-se de possuir em sua máquina o programa "Docker Desktop"
3. Com seu interpretador de comandos vá até a pasta "docker compose" localizada dentro deste repositório baixado.
4. Execute em ordem os seguintes comandos em seu interpretador:

docker-compose build --no-cache
docker-compose up

5° O container irá aparecer na lista no programa Docker Desktop e estará pronto para uso.
