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

Ele faz automaticamente a reinicialização do meu servidor!

Para isso, no terminal do VSCode, como dependencia de desenvolvimento, dentro da pasta do meu projeto (node-api)

- npm install --D nodemon

Verificar se a dependencia esta instalada em package.json

Para utilizar o nodemon, criamos uma nova tag scripts, dentro de package.json, então era:

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
    },

vai ficar: 

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "nodemon server.js"
    },

nesse caso, criarmos um script chamado dev, que vai acessar o server.js(script principal)

Agora, ao invés de rodar com:
- node server.js

vamos rodar com:
- npm run dev

TESTAR: localhost:3001 

posso acompanhar pelo terminal do vscode, que cada vez que eu fizer alguma alteração, o nodemon vai me dar um comando restarting.. 

### Instalando o MongoDB (banco de dados utilizado)

- Verificar se já temos o docker na maquina.. para isso comando: docker -v
- Caso não tenha: instalar o docker (por causa da containerização)
- Após instalado, no terminal do ubuntu executar o comando:  docker (ele vai exibir uma lista de comandos possíveis)

- Verificar se já temos o mongodb na máquina: mongod --version

Lembrar do comando admin sudo su

- Para instalar o mongodb usar comando: sudo docker pull mongo
- comando: docker run --name mongodb -p 27017:27017 -d mongo
- comando: docker ps

QUANDO REINICIAR O PC A IMAGEM VAI PARAR DE EXECUTAR - não se desesperar:
- não precisa exercutar o docker run novamente para executar essa imagem.
- comando: sudo docker ps -a (mostra as imagens que existem, não estão rodando - só estão pausadas)
- vai aparecer uma lista de imagens com status exited (caso eu tenha reiniciado a máquina)
- comando: sudo docker start mongodb (para subir esse banco faz esse comando com o nome da imagem que colocamos)

- utilizar o robo3t para acompahar esse servidor.

### Conectando a Database 
Após instalar o mongodb, vamos fazer a conexão do banco de dados dentro do nosso código.

No terminal do vscode, instalar a dependencia mongoose:
- comando: npm install mongoose (WARN é diferente de erro)

Na pasta server.js:

    const mongoose = require('mongoose');

Em iniciando database:

    mongoose.connect('mongodb://localhost:27017/nodeapi', {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('MongoDB Connected...'))
        .catch((err) => console.log(err))


kill $(lsof -t -i:3001)  #esse comando libera a porta 3001

### Criando model de produto 

Criar uma pasta src dentro da aplicação e dentro, uma pasta chamada models e dentro dela um arquivo chamado Product.js

Dentro desse Product.js eu preciso basicamente falar qual é o schema desse model - schema: quais são os campos que um produto pode ter e que tipo de valores esses campos vão salvar. (desafio)

exemplo do arquivo Product.js

const mongoose = require('mongoose');

    const ProductSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });

    mongoose.model('Product', ProductSchema);


Esse código, basicamente registra um model na nossa aplicação, agora toda aplicação vai saber que existe um model product e que ele possui essas colunas lá na base de dados.

    mongoose.model('Product', ProductSchema);

Depois disso, precisamos dar um require a esse model, entao, vamos até o arquivo server.js e depois que eu iniciei o bando de dados (precisa ser depois), coloco o comando:

    require('./src/models/Product');

IMPORTANTE: nos futuros projetos, existe uma tendencia a ter muitos models, então, quando isso acontecer (é interessante já fazer esse passo p/ evitar retrabalho)

terminal:
- comando: npm install require-dir (ela faz esse papel do require automaticamente, pra gente nao precisar fazer o require em cada um deles)

então em server.js eu 
- importo: const requireDir = require('require-dir');
- substituo: 

    require('./src/models/Product');

por:

    requireDir('./src/models');


VERIFICANDO SE EU JÁ CONSIGO SALVAR ALGUMA COISA NO MEU BANCO DE DADOS.

o meu server.js deve estar assim:

requireDir('./src/models');

const Product = mongoose.model('Product');

    // Primeira rota
    app.get('/', (req, res) => {
        Product.create({
            title: 'Reacte Native',
            description: 'Build native apps with react',
            url:'http://github.com',
        })
        
        return res.send("Teste legal!!!")
    });

abrir o robo 3T - abrir o meu database (se nao aparecer.. dar um refresh no documento)
nodeapi - colections - products 


### Reestruturação de arquivos
Até agora eu tenho basicamente um único arquivo (server.js) para construir toda aplicação... mas isso é meio errado / bem errado então vou:
- separar as rotas em um outro arquivo

        // Primeira rota
            app.get('/', (req, res) => {
                    return res.send("Teste legal!!!")
            });


- separar a lógica de dentro da rota em um outro arquivo

        Product.create({
                    title: 'Reacte Native',
                    description: 'Build native apps with react',
                    url:'http://github.com',
                })


Então, na pasta, criar um arquivo chamado routes.js:
Dentro dele:

    const express = require('express');
    const routes = express.Router();

Colar a rota e fazer algumas alterações

    routes.get('/', (req, res) => {
        Product.create({
            title: 'Reacte Native',
            description: 'Build native apps with react',
            url:'http://github.com',
        })
        
        return res.send("Testando apos uma tarde perdida!!!")
    });


    module.exports = routes;


E dentro de server.js - onde nós tinhamos a primeira rota colocar:

    // Primeira rota
    app.use('/api', require('./src/routes'))

e também, tirar essa linha (não vamos mais precisar)

    const Product = mongoose.model('Product');

TESTAR p ver se esta funcionando: 
- em routes.js comentar a parte do Product.crete
- verificar se não deu nenhum erro de servidor (no terminal do vscode)
- tentar abrr o localhost:3001 (tem que aparecer um erro cannot get)
- abrir com localhost:3001/api
- ele vai funcionar, pq tudo vai partir da api
- nota: se eu quiser deixar só / pode ser


Dentro de src, criar uma pasta chamada controllers e depois, criar um documento chamado ProductController.js

dentro de ProductController.js

    const mongoose = require('mongoose');

    const Product = mongoose.model('Product')

    module.exports = {
        async index(req, res) {
            const products = await Product.find();

            return res.json(products);
        }, 
    };

Após isso, dentro de routes.js, fazer a alteração da minha rota:

era:

    routes.get('/', (req, res) => {
        // Product.create({
        //     title: 'Reacte Native',
        //     description: 'Build native apps with react',
        //     url:'http://github.com',
        // })
        
        return res.send("Testando apos uma tarde perdida!!!")
    });

    module.exports = routes;


agora o conteúdo do routes.js é:

    const express = require('express');
    const routes = express.Router();

    const ProductController = require('./controllers/ProductController')

    routes.get('/products', ProductController.index);

    module.exports = routes;


### Utilizando o insomnia
O insoonia é um software que vamos baixar para testar as rotas da nossa api, por enquanto, pelo navegador eu até consigo visualizar essas rotas.. mas fica muito feio, fica impossível de ler 

- verificar se tem o insomnia na maquina, se não tiver, baixar ele com o comando: sudo snap install insomnia

- abrir o insomnia

- clicar em: + -> new request -> dar um nome e selecionar o tipo de rota (nesse caso GET) -> create -> colocar a url que vai encontrar: http://localhost:3001/api/products

posso configurar o meu insomnia para facilitar a vida.. para isso pego a parte padrão/ igual da rota para todo mundo:

- http://localhost:3001/api
- No environment 
- manage environments 
- escrever esse comando e apertar done

        {
        "base_url": "http://localhost:3001/api"
        }

- onde eu preciso escrever a url coloco
 - base_url/products 



### Fazendo uma rota de criação de novos registros: 

Dentro do arquivo Product_Controller.js, dentro de module.exports

    async store(req, res){
            // vazio 
        }

Depois disso, vou em routes.js e crio a minha nova rota, ela será post, porque estou criando algo no meu servidor 

    routes.post('/products', ProductController.store);

Agora no insomnia, eu vou duplicar a rota index, vou chamar ela de create, trocar o GET por POST e na opção body vou selecionar JSON

Dentro do "editor" eu vou colocar um JSON com as informações que eu quero criar.. que nesse exemplo será:

    {
        "title": "ReactJS",
        "description": "Biblioteca p criar aplicaçoes interativas ...",
        "url": "http://github.com"
    }

apertar send... e depois cancelar pq nao vai acontecer nada.

No arquivo server.js, logo após iniciando o app, deve ficar assim:

    // Iniciando o app
    const app = express();
    app.use(express.json());
 - eu praticamente estou permitindo o envio de dados para a minha aplicação no formato de json.

 Em ProductController.js arrumar o arquivo que eu tinha iniciado

    async store(req, res){
            const product = await Product.create(req.body);

            return res.json(product);
        }

Abrir o insomnia, apertar create e ele deve funcionar.
Para confirmar abrir o robo3t dar um refresh e ver a aplicação adicionada.


### CRUD - criando o restante das rotas para o produto

Em ProductController.js criar:

    async show(req, res){
            const product = await Product.findById(req.params.id);

            return res.json(product);
        },

Em routes.js:

    routes.get('/products/:id', ProductController.show);

No insomnia: duplicar a rota index, renomear para show, atualizar o index... pegar um dos ID, ir em show e depois de products/ colocar o id e send.

    {{ base_url  }}/products/5eee776d6b8aa61aeb100f00

Em product controller:

    async update(req, res){
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});

            return res.json(product); 

Em routes.js:

    routes.put('/products/:id', ProductController.update);


No insomnia: duplicar a rota create, chamar de updtade, colocar PUT, trocar só o título. e send

    {
        "title": "React"
    }

Em product controler

    async destroy(req, res){
            await Product.findByIdAndRemove(req.params.id);

            return res.send();
        }

Em routes.js

    routes.delete('/products/:id', ProductController.destroy);

No insomnia: duplicar a rota update, chamar de delete, colocar DEL, trocar o JSON para no body  e colocar send.. ir em index e conferir se esta deletado, assim como no robo3t

### Adicionando paginação para a listagem de produtos

- Vou até o Insomnia, em create, crio vários objetos (send várias vezes), vou até o index, aperto send e vejo que os objetos novos foram criados. 
- Para confirmar, abro o robo3t e vejo a lista com todos os objetos criados agora.
- Não se tornar viável quando se tem muitos registros
- Para isso vou instalar um método com o seguinte comando:

- npm install mongoose-paginate
- depois de instalar
- vou na pasta models, dentro do Product.js e vou importar essa biblioteca, utilizando a linha:


    const mongoosePaginate = require('mongoose-paginate');

e logo após criar o schema vou colocar a seguinte linha:

    ProductSchema.plugin(mongoosePaginate)

Depois disso, dentro de ProductController.js atualizar o index.. 

era:

    async index(req, res) {
            const products = await Product.find();

            return res.json(products);
        }, 

agora é: 

    async index(req, res) {
            const { page = 1} = req.query;
            const products = await Product.paginate({}, { page, limit: 10});

            return res.json(products);
        }

ir no insomnia e testar 
{{ base_url  }}/products?page=2


### Adicionando cors
- permitir que outros endereços acessem a nossa API
- por enquanto a gente só consegue acessar a API utilizando o insomnia

para isso, com o comando 
 npm install cors

depois de instalado, eu vou no meu server.js, importo o cors com a linha de código.

    const cors = require('cors');

atualizar o iniciando o app//

ficará 

        // Iniciando o app
    const app = express();
    app.use(express.json());
    app.use(cors());






