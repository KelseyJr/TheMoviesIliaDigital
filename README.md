<div align="center" style="padding: 15px;">
  <img alt="Ilia Digital" title="íliaDigital" src="https://ilia.digital/wp-content/uploads/2020/10/logo.png" width="200px" />
</div>

<p align="center"><i>Imagem feita pela <a href="https://ilia.digital/">Ília Digital</a></i></p>

<h3 align="center">Código desenvolvido para a vaga de backend na Ília Digital 💻</h3>

# RESUMO

API desenvolvida em Node.JS como parte do teste para pleitear a vaga de desenvolvedor *backend* na <a href="https://ilia.digital/">Ília Digital</a>

Para visualizar os requisitos, acesso o arquivo TESTE.md, clicando <a href="https://github.com/KelseyJr/TheMoviesIliaDigital/blob/master/TESTE.md">aqui</a>

# ÍNDICE

- [Instalação](#instalação)
  - [Clonando o repositório](#clonando-o-repositório)
  - [*Download* de dependências](#download-de-dependências)
  - [Configuração das variáveis ambientes](#configuração-das-variáveis-ambientes)
- [Testes](#testes)
- [Projeto](#projeto)
  - [Executar o servidor](#executar-o-servidor)
  - [Parte 1 - Filmes](#parte-1---filmes)
    - [Cadastro de filme](#cadastro-de-filme)
    - [Atualização de filme](#atualização-de-filme)
    - [Buscar apenas um filme](#buscar-apenas-um-filme)
    - [Buscar todos os filmes](#buscar-todos-os-filmes)
    - [Excluir um filme](#excluir-um-filme)
  - [Parte 2 - Traduções dos filmes](#parte-2---traduções-dos-filmes)
    - [Inserir a tradução de um filme](#inserir-a-tradução-de-um-filme)
- [Contribuição](#contribuição)
- [Dúvidas](#dúvidas)

# Instalação

## Clonando o repositório

Existem duas maneiras de realizar o clone de um repositório, sendo elas: **SSH** e **HTTPS**.

Para clonar utilizando **SSH**, utilize o seguinte comando:
```bash
git clone git@github.com:KelseyJr/TheMoviesIliaDigital.git
```

Para clonar utilizando **HTTPS**, utilize o seguinte comando:
```bash
git clone https://github.com/KelseyJr/TheMoviesIliaDigital.git
```

## *Download* de dependências

Após o clone do repositório, é necessário realizar o *download* das dependências que foram utilizadas nesse projeto.

Para efetuar o *download*, usando yarn, utilize do seguinte comando:
```bash
yarn
```

Para efetuar o *download*, usando npm, utilize do seguinte comando:
```bash
npm install
```

## Configuração das variáveis ambientes
Para configurar as variáveis ambientes, deve-se criar o arquivo `.env`, copiar as informações contidas
no arquivo `.env.example` e colar no arquivo recém-criado. Após isso, os dados do arquivo gerado devem ser preenchidos.

**OBS:** Por padrão, foi utilizado o banco de dados MongoDB. Caso queira usar outro, será necessário realizar as devidas alterações na API.

![](.github/enviroment.gif)

Neste projeto, contém as seguintes variáveis de ambiente:
 - O nome do banco, MONGO_DB, que não é obrigatório, visto que já tem um valor default na configuração de conexão ao banco.
 - O host do banco, MONGO_HOST, que não é obrigatório, visto que já tem um valor default na configuração de conexão ao banco.
 - A porta do banco, MONGO_PORT, que não é obrigatório, visto que já tem um valor default na configuração de conexão ao banco.
 - A chave de acesso da API The Movie Database API (https://developers.themoviedb.org/3/gettingstarted/introduction), API_KEY, que é obrigatório, para realizar a busca nessa API.


# Testes
O seguinte projeto foi construído utilizando-se da metodologia TDD(*Test Driven Development*), em que consiste em criar o teste antes da funcionalidade.

Para rodar os testes, com yarn, execute o seguinte comando no seu *console*:
```bash
yarn test
```

Para rodar os testes, com npm, execute o seguinte comando no seu *console*:
```bash
npm run test
```

## Usuários Windows

Antes de executar os testes, deverá colocar *set* antes do NODE_ENV no package .json, confore a imagem.
![](.github/screenshot.png)

# Projeto
O projeto foi desenvolvido por partes, para garantir que todos os requisitos fosse atendidos.

## Executar o servidor
Para iniciar o servidor, usando yarn, utilize do seguinte comando:
```bash
yarn dev
```

Para iniciar o servidor, usando npm, utilize do seguinte comando:
```bash
npm run dev
```


## Parte 1 - Filmes
Na parte de filmes, é possível realizar um CRUD(create - read - update - delete).

### Cadastro de filme
Segue abaixo as informações da rota de cadastro de um filme.

|Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Body) | Retorno |
| :---: | :---: | :---: | :--- | :--- |
|Não | POST | /movies | 1 - movieId: Inteiro e obrigatório, que representa o id do filme na API The Movie Database API <br> | Um objeto contendo os dados do filme |

### Atualização de filme
Segue abaixo as informações da rota de atualização de um filme.

|Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Params)| Retorno |
| :---: | :---: | :---: | :--- | :--- |
|Não | PUT | /movies/:id | 1 - id: String e obrigatório, que representa o ID no banco<br>| Um objeto contendo os dados do filme |

### Buscar apenas um filme
Segue abaixo as informações da rota de buscar apenas um filme.

|Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Params)| Retorno |
| :---: | :---: | :---: | :--- | :--- |
|Não | GET | /movies/:id | 1 - id: String e obrigatório, que representa o ID no banco<br>| Um objeto contendo os dados do filme |

### Buscar todos os filmes
Segue abaixo as informações da rota de buscar todos os filme.

|Rota autenticada? | Método da rota | Nome da rota | Retorno |
| :---: | :---: | :---: | :--- | :--- |
|Não | GET | /movies | Um array de objetos com os dados dos filmes já cadastrado na aplicação |

### Excluir um filme
Segue abaixo as informações da rota de exclusão de um filme.

|Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Params)| Retorno |
| :---: | :---: | :---: | :--- | :--- |
|Não | DELETE | /movies/:id | 1 - id: String e obrigatório, que representa o ID no banco<br>| Um objeto contendo os dados do filme |

## Parte 2 - Traduções dos filmes
Na parte de traduções dos filmes, é possível inserir os dados das traduções dos filmes.

### Inserir a tradução de um filme
Segue abaixo as informações da rota de inserir a tradução d eum filme.

|Rota autenticada? | Método da rota | Nome da rota | Parâmetros (Request Params)| Retorno |
| :---: | :---: | :---: | :--- | :--- |
|Não | PATCH | /movies/:id/translations | 1 - id: String e obrigatório, que representa o ID no banco<br>| Um objeto contendo os dados do filme |

## Contribuição
Pull requests serão sempre bem-vindas. Para grandes mudanças, crie uma issue para discurtimos o que você gostaria de mudar.

Claro, não se esqueça de atualizar os testes. :wink:

## Dúvidas
Qualquer dúvida em relação ao projeto, crie uma issue ou mande um e-mail para kelseytfjunior@gmail.com, ou entre em contato pelo WhatsApp.
