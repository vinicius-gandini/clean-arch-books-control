# Controle de Livros
Aplicação desenvolvida utilizando NodeJS e MongoDB para controlar um CRUD de livros e sistema de login. O projeto foi construído utilizando conceitos de Clean Architecture e DDD.

[API Reference](#api) <br>
- [Criação de Usuário](#cria_user) <br>
- [Login](#login) <br>
- [Listagem de Usuários](#list_users) <br>
- [Criação de Livro](#create_book) <br>
- [Informação de um Livro](#book_info) <br>
- [Editar um Livro](#update_book) <br>
- [Remover um Livro](#delete_book) <br>
- [Alugar um Livro](#rent_book) <br>
- [Devolver um Livro](#return_book) <br>

## Preparando o ambiente
Para o projeto executar sem problemas, devem haver as seguintes instalações na máquina que irá executá-lo

- NodeJS (foi utilizada a versão 18.13.0);
- Yarn ou NPM (Yarn utilizado);
- Docker;
- Insomnia
- Editor de sua preferência (utilizado VSCode)

## Como rodar o projeto
Clone o repositório utilizando Git

```
git clone https://github.com/vinicius-gandini/softdesign-test
```

Instale as dependências com o gerenciador de pacotes. Exemplo:

```
yarn
```

Para iniciar o projeto, basta executar o script do docker-compose. Dessa forma, um ambiente será configurado dentro do Docker e executará as instâncias do projeto e do MongoDB:

```
sudo docker-compose up --build -d
```

***Após a build, as próximas execuções não precisarão da flag --build***

Pronto! Com isso, a aplicação irá rodar na porta 3000 e o mongoDB será executado na porta padrão 27017.

Para executar os Testes com Jest, basta executar o comando abaixo:

```
yarn test
```

<br>

> **Para inciar a utilização dos endpoints, é necessário realizar a [Criação de um Usuário](#create_user) e o [Login](#login)**

<br>

<a id="api"></a>
# API Reference
Abaixo, segue o arquivo de importação do Insomnia, com todos os caminhos criados para o projeto:

https://drive.google.com/file/d/1WBBUxdHf35AsieOISBHUUWyr7UyzFeDD/view?usp=share_link

Alguns endpoints requerem a adição do Header **authorization**. Por padrão, o arquivo disponibilizado do Insomnia lidará com a atualização desse Header automaticamente após ser feita a chamada de **Login**

<br>

<a id="create_user"></a>
## Criação de Usuário

Endpoint: ***/users*** <br>
Método: **POST** <br>
Body:

```js
name: string;
username: string;
password: string;
```

<a id="login"></a>
## Login

Endpoint: ***/auth*** <br>
Método: **POST** <br>
Body:
```js
username: string;
password: string;
```


<a id="list_users"></a>
## Listagem de Usuários

Endpoint: ***/users*** <br>
Método: **GET** <br>
Parâmetros: **nenhum** <br>
Body: **nenhum**


<a id="create_book"></a>
## Criação de Livro

Endpoint: ***/api/books*** <br>
Método: **POST** <br>
Body:

```js
  name: string;
  author: string;
  publisher: string;
  pages: number;
  synopsis: string;
  status: "available" | "not_available" | "rented";
```

<a id="list_books"></a>
## Listagem de Livros

Endpoint: ***/api/books*** <br>
Método: **GET** <br>
Query Params:

```js
  name: string;
  author: string;
  publisher: string;
  status: "available" | "not_available" | "rented";
```

<a id="book_info"></a>
## Informações de Um Livro

Endpoint: ***/api/books/:id*** <br>
Método: **GET** <br>
Parâmetros: ***id do livro***

Exemplo: http://localhost:3000/api/books/94eb690f-85e2-4b3d-9e1d-0a34414b679e


<a id="update_book"></a>
## Editar um Livro

Endpoint: ***/api/books/:id*** <br>
Método: **PUT** <br>
Parâmetros: ***id do livro*** <br>
Body:

```js
  name: string;
  author: string;
  publisher: string;
  pages: number;
  synopsis: string;
  status: "available" | "not_available" | "rented";
```

<a id="delete_book"></a>
## Remover um Livro

Endpoint: ***/api/books/:id*** <br>
Método: **DELETE** <br>
Parâmetros: ***id do livro***

Exemplo: http://localhost:3000/api/books/94eb690f-85e2-4b3d-9e1d-0a34414b679e


<a id="rent_book"></a>
## Alugar um Livro

Endpoint: ***/api/books/rent*** <br>
Método: **POST** <br>
Body:

```js
  userId: string;
  userUsername: string;
  bookId: string;
  bookName: string;
```

<a id="return_book"></a>
## Devolver um livro

Endpoint: ***/api/books/return/:id*** <br>
Método: **PUT** <br>
Parâmetros: ***id do livro***

Exemplo: http://localhost:3000/api/books/94eb690f-85e2-4b3d-9e1d-0a34414b679e
