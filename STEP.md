# Criando uma API - parte do Backend passos:

Antes de começar, verificar se já tenho o node e o npm instalados na minha máquina, para isso, abrir o terminal e digitar os comandos:

```bash
node -v
npm -v 
```
Após, no terminal, acessar uma pasta para criar o meu projeto (pasta documents por exemplo).

- cd/ pasta que eu vou criar o projeto 

Após:

- mkdir node-api (criando o projeto com nome tal)
- cd node-api (acesso ao projeto criado)


Dentro desse acesso:

- npm init -y 
- ls (após esse comando, vejo quais são as pastas de dentro do projeto - deve ter um package.json)


Dentro da pasta do projeto, instalar a primeira dependencia(Express):

- npm install express
- vim package.json (vamos observar a criação de dependencies: express)


O express é um microframework que nos ajuda a lidar com as rotas e views.


### Começar configurando o servidor
- code . (vai abrir um novo arquivo no vscode)

Esse arquivo aberto deve ter um node_modules, e dois package.json.

Fazer um .gitignore e já colocar o node_modules(ele é instalado junto com o express) para começar a versionar o projeto e não perder nada e também não adicionar coisas sem necessidade


No vscode criar o arquivo princial
- server.js

Nesse arquivo, vamos iniciar importando o express com o seguinte código:


    const express = require('express');

    const app = express();

    app.listen(3001);

TESTAR - importante. Para isso abrimos o terminal, e iniciamos o servidor com o comando:

- node server.js

após: 
- abrir o chrome no caminho localhost:3001

deverá aparecer a mensagem Cannot Get


### Criando a primeira rota da aplicação 

Dentro do arquivo server.json , vamos criar a rota 

    app.get('/', (req, res) => {
    res.send("Primeiro ubuntoasd22as!")
    });


após essa edição, o documento deve ficar assim:

	const express = require('express');

	const app = express();

	app.get('/', (req, res) => {
	    res.send("Primeiro ubuntoasd22as!")
	});

	app.listen(3001);


### Utilizando o nodemon
O nodemon evita que eu precise parar e inicar o servidor toda vez que fizer alguma alteração ou quiser fazer algum teste, para isso. 


